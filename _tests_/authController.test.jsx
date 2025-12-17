import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from "./authController.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

jest.mock("../models/User.js");
jest.mock("jsonwebtoken");
jest.mock("bcryptjs");

describe("authController", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, headers: {}, user: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        jest.clearAllMocks();
        process.env.JWT_SECRET = "testsecret";
    });

    describe("registerUser", () => {
        it("should register a new user and return token", async () => {
            req.body = {
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "password123",
                phone: "1234567890",
            };
            User.findOne.mockResolvedValue(null);
            bcrypt.hash.mockResolvedValue("hashedPassword");
            User.create.mockResolvedValue({
                _id: "userId",
                email: "john@example.com",
                firstName: "John",
                lastName: "Doe",
            });
            jwt.sign.mockReturnValue("jwtToken");

            await registerUser(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
            expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
            expect(User.create).toHaveBeenCalledWith({
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "hashedPassword",
                phone: "1234567890",
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "User registered successfully",
                user: {
                    id: "userId",
                    email: "john@example.com",
                    firstName: "John",
                    lastName: "Doe",
                },
                token: "jwtToken",
            });
        });

        it("should not register if user exists", async () => {
            req.body = { email: "john@example.com" };
            User.findOne.mockResolvedValue({ _id: "existingUser" });

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
        });

        it("should handle errors", async () => {
            req.body = { email: "john@example.com" };
            User.findOne.mockRejectedValue(new Error("DB error"));

            await registerUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
        });
    });

    describe("loginUser", () => {
        it("should login with password", async () => {
            req.body = { email: "john@example.com", password: "password123" };
            const user = {
                _id: "userId",
                email: "john@example.com",
                firstName: "John",
                lastName: "Doe",
                password: "hashedPassword",
            };
            User.findOne.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue("jwtToken");

            await loginUser(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ $or: [{ email: "john@example.com" }, { phone: undefined }] });
            expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword");
            expect(res.json).toHaveBeenCalledWith({
                message: "Login successful",
                user: {
                    id: "userId",
                    email: "john@example.com",
                    firstName: "John",
                    lastName: "Doe",
                },
                token: "jwtToken",
            });
        });

        it("should fail login with wrong password", async () => {
            req.body = { email: "john@example.com", password: "wrong" };
            const user = { password: "hashedPassword" };
            User.findOne.mockResolvedValue(user);
            bcrypt.compare.mockResolvedValue(false);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
        });

        it("should login with verification code", async () => {
            req.body = { phone: "1234567890", code: "123456" };
            const user = {
                _id: "userId",
                email: "john@example.com",
                firstName: "John",
                lastName: "Doe",
                verificationCode: "123456",
                codeExpiresAt: Date.now() + 10000,
                save: jest.fn().mockResolvedValue(),
            };
            User.findOne.mockResolvedValue(user);
            jwt.sign.mockReturnValue("jwtToken");

            await loginUser(req, res);

            expect(user.verificationCode).toBeNull();
            expect(user.codeExpiresAt).toBeNull();
            expect(user.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({
                message: "Login successful",
                user: {
                    id: "userId",
                    email: "john@example.com",
                    firstName: "John",
                    lastName: "Doe",
                },
                token: "jwtToken",
            });
        });

        it("should fail login with invalid or expired code", async () => {
            req.body = { phone: "1234567890", code: "wrong" };
            const user = {
                verificationCode: "123456",
                codeExpiresAt: Date.now() - 1000,
            };
            User.findOne.mockResolvedValue(user);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid or expired code" });
        });

        it("should fail login if user not found", async () => {
            req.body = { email: "notfound@example.com", password: "password" };
            User.findOne.mockResolvedValue(null);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should fail login if missing credentials", async () => {
            req.body = { email: "john@example.com" };
            const user = {};
            User.findOne.mockResolvedValue(user);

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "Missing credentials" });
        });

        it("should handle errors", async () => {
            req.body = { email: "john@example.com", password: "password" };
            User.findOne.mockRejectedValue(new Error("DB error"));

            await loginUser(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
        });
    });

    describe("logoutUser", () => {
        it("should logout if token provided", async () => {
            req.headers.authorization = "Bearer sometoken";
            await logoutUser(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Logout successful: Remove token from client side" });
        });

        it("should return 400 if no token provided", async () => {
            req.headers = {};
            await logoutUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
        });

        it("should always send client-side logout completed", async () => {
            req.headers.authorization = "Bearer sometoken";
            await logoutUser(req, res);
            expect(res.json).toHaveBeenCalledWith({ message: "Client-side logout completed" });
        });
    });

    describe("getUserProfile", () => {
        it("should return user profile if token is valid", async () => {
            req.headers.authorization = "Bearer validtoken";
            jwt.verify.mockReturnValue({ id: "userId" });
            const user = { _id: "userId", email: "john@example.com" };
            User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(user) });

            await getUserProfile(req, res);

            expect(jwt.verify).toHaveBeenCalledWith("validtoken", "testsecret");
            expect(res.json).toHaveBeenCalledWith({ user });
        });

        it("should return 401 if no token", async () => {
            req.headers = {};
            await getUserProfile(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "No token" });
        });

        it("should return 404 if user not found", async () => {
            req.headers.authorization = "Bearer validtoken";
            jwt.verify.mockReturnValue({ id: "userId" });
            User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });

            await getUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should return 401 if token invalid", async () => {
            req.headers.authorization = "Bearer invalidtoken";
            jwt.verify.mockImplementation(() => { throw new Error("Invalid token"); });

            await getUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
        });
    });

    describe("updateUserProfile", () => {
        it("should update user profile", async () => {
            req.body = { firstName: "Jane", lastName: "Smith", phone: "9876543210" };
            req.user.id = "userId";
            const user = {
                firstName: "John",
                lastName: "Doe",
                phone: "1234567890",
                updateOne: jest.fn().mockResolvedValue(),
            };
            User.findById.mockResolvedValue(user);

            await updateUserProfile(req, res);

            expect(user.firstName).toBe("Jane");
            expect(user.lastName).toBe("Smith");
            expect(user.phone).toBe("9876543210");
            expect(user.updateOne).toHaveBeenCalledWith(user);
            expect(res.json).toHaveBeenCalledWith({ message: "Profile updated", user });
        });

        it("should return 404 if user not found", async () => {
            req.user.id = "userId";
            User.findById.mockResolvedValue(null);

            await updateUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
        });

        it("should handle errors", async () => {
            req.user.id = "userId";
            User.findById.mockRejectedValue(new Error("DB error"));

            await updateUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
        });
    });
});
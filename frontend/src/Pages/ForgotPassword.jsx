import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [code, setCode] = React.useState("");
    const [codeCorrect, setCodeCorrect] = React.useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle code submission logic here
        alert("Code submitted!");
    };
    return (
        <div>
            <h1>Forgot Password Page</h1>
            <form onSubmit={() => handleSubmit()}>
                <p>Please check your email for the password reset code.</p>
                <label>Code:</label>
                <input type="text" placeholder="Enter your code here:" />
                <button type="button">Submit</button>
            </form>
            
            
        </div>
    );
}

export default ForgotPassword;
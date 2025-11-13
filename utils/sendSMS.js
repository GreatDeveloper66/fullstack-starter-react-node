import twilio from "twilio";

const {
  TWILIO_ACCOUNT_SID: SID,
  TWILIO_AUTH_TOKEN: TOKEN,
  TWILIO_PHONE_NUMBER: PHONE_NUMBER,
} = process.env;

const client = twilio(SID, TOKEN);

export const sendSMS = async (to, message) => {
  try {
    const msg = await client.messages.create({
      body: message,
      from: PHONE_NUMBER,
      to,
    });
    console.log("✅ SMS sent:", msg.sid);
  } catch (err) {
    console.error("❌ SMS sending failed:", err.message);
    throw new Error("SMS could not be sent");
  }
};

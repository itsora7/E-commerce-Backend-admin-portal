import express from "express";
import { createAdmin } from "./modals/adminUser/AdminUserModal.js";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/bcrypt.js";
import { adminSignUpEmailVerification } from "../utils/emails.js";

const router = express.Router();

//admin registration
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    req.body.password = hashPassword(req.body.password);
    req.body.verificationCode = uuidv4();
    const result = await createAdmin(req.body);

    if (result?._id) {
      //we need to create unique url and sent email to the client

      //process for the email
      const uniqueUrl = `http://localhost:3000/verify?c=${result.verificationCode}&email=${result.email}`;

      //call email service
      adminSignUpEmailVerification(result, uniqueUrl);
      res.json({
        status: "success",
        message:
          "We have sent an email verification link to your email. Please check your email (junk as well if not found in email) and follow the instruction to activate your account!s",
      });
      return;
    }
    res.json({
      status: "error",
      message: "Error, Unable to create new admin. Try again later",
    });
  } catch (error) {
    error.errorCode = 500;
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "There is already an account eist associated with this email.";
    }
    next(error);
  }
});
export default router;
//admin login

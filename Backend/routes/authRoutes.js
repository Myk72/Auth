import express from 'express';
import { login, logout, signup, VerifyEmail, forgotPassword, resetPassword , checkAuth, ResendVerificationEmail } from '../controllers/authControl.js';
import { verifyToken } from '../middleware/verifyEmail.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)
router.post("/logout", logout); 

router.post("/verifyEmail", VerifyEmail); 
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:token", resetPassword);
router.post("/checkAuth", verifyToken ,checkAuth);
router.post("/resendVerification" ,ResendVerificationEmail);

export default router;
import express from 'express';
import { ownerSignup, ownerLogin } from '../Controllers/owner/login.js';


const router = express.Router();

router.post('/signup', ownerSignup);
router.post('/login', ownerLogin);



export default router;

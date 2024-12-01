import express from 'express';
import { test } from '../controller/user.cotroller.js';

const router = express.Router();

// @route GET api/properties
router.get('/test', test)

export default router;
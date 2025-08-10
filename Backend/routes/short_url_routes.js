import express from 'express';
import { jwtmiddleware } from '../controllers/userControllers.js';
import {createShortUrl,getShortUrls} from '../controllers/short_url_controllers.js';
const router = express.Router();

router.post('/createUrls',jwtmiddleware,createShortUrl);
router.get('/:shortUrl', getShortUrls);


export default router;
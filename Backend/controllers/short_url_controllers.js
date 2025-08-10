import { generateNanoId } from '../services/jwt.js'
import shortUrl from '../models/short_url_schema.js';
import { createShortUrlWithUser,createShortUrlWithOutUser,findAllShortUrls } from '../services/jwt.js';
import mongoose from 'mongoose';

export const createShortUrl = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ message: "Original URL is required" });
        }

        let shortUrl_response;
        console.log(req.user_id)
         if(data.slug){
            shortUrl_response = await createShortUrlWithUser(data.url,req.user_id,data.slug)
        }else{  
            shortUrl_response = await createShortUrlWithOutUser(data.url,req.user_id)
        }
        if (!shortUrl_response) {   
            return res.status(500).json({ message: "Failed to create short URL" });
        }
       // console.log("create url:", typeof req.user_id )
        const allShortUrls = await findAllShortUrls(req.user_id);
        if (!allShortUrls) {    
            return res.status(500).json({ message: "Failed to retrieve short URLs" });
        }

        return res.status(201).json({ message: "Short URL created successfully", shortUrls: allShortUrls });
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getShortUrls = async (req, res) => {
    try {
        const shortUrlParam = req.params.shortUrl;
        if (!shortUrlParam) {
            return res.status(400).json({ message: "Short URL parameter is required" });
        }

        const shortUrlData = await shortUrl.findOne({ short_url: shortUrlParam });
        if (!shortUrlData) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        // Increment the click count
        shortUrlData.clicks += 1;
        await shortUrlData.save();
        // console.log(typeof(shortUrlData.user))
        res.redirect(shortUrlData.full_url); // Redirect to the original URL

    } catch (error) {
        console.error("Error retrieving short URL:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

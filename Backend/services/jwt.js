import dotenv from 'dotenv'
dotenv.config({ path: '../.env' });
import jsonwebtoken from 'jsonwebtoken'
import shortUrl from '../models/short_url_schema.js';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';


export const signToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '6h'})
}
export const verifyToken = (token) => {
    const decoded= jsonwebtoken.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id)
    return decoded
    };
  
export const generateNanoId = (length) =>{
    return nanoid(length);
}

const saveShortUrl = async (url,userId,slug) => {
    console.log("saveShortUrl called with:", url, userId, slug);
    const new_shortUrl = new shortUrl({
        full_url: url,
        short_url: slug, 
        clicks: 0,
        user:  new mongoose.Types.ObjectId(userId)
    });
    await new_shortUrl.save();
    // console.log("new_shortUrl",new_shortUrl)
    // console.log(new_shortUrl.user instanceof mongoose.Types.ObjectId)
    // console.log("typeof:", typeof(new_shortUrl.user))
    return new_shortUrl;
}

export const createShortUrlWithUser=async(url,userId,slug)=>{
    if(!url || !slug || !userId) {
        throw new Error("URL, slug, and user ID are required");
    }
    const existingUrl = await shortUrl.findOne({ short_url: slug });
  //  console.log("exitingUrl",existingUrl)
    if (existingUrl) {
        throw new Error("Slug already exists");
    }
    return saveShortUrl(url, userId, slug);
}

export const createShortUrlWithOutUser = async (url, userId) => {
    if (!url || !userId) {
        throw new Error("URL and user ID are required");
    }
    const short= generateNanoId(7);
    const existingUrl = await shortUrl.findOne({ short_url: short });
      console.log("exitingUrl",existingUrl)
    while(existingUrl) {  
        short = generateNanoId(7);
        existingUrl = await shortUrl.findOne({ short_url: short }); 
    }
    return saveShortUrl(url, userId,short);
}

export const findAllShortUrls = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    // console.log(userId instanceof mongoose.Types.ObjectId);
    const urls = await shortUrl.find({user: userId });
    // console.log(mongoose.connection.readyState)
    console.log("feteched URLs:", urls); 
    return urls;
}
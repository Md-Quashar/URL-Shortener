import express from 'express' 
const router=express.Router()
import userSchema from '../models/userSchema.js'
import { userRegister, userLogin, updatePassword ,updatedUrls,deleteUrl} from '../controllers/userControllers.js';
router.post('/signup',userRegister)
router.post('/login',userLogin)
router.post('/reset-password', updatePassword)
router.get('/:id',updatedUrls);
router.delete('/:id',deleteUrl);
export default router
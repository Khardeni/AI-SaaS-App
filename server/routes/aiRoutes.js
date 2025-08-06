import express from 'express';
import { auth } from '../middlewares/auth.js';
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, reviewResume } from '../controllers/aiController.js'
import { upload } from '../configs/multer.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article', auth, generateArticle);
aiRouter.post('/generate-blog-title', auth, generateBlogTitle);
aiRouter.post('/generate-article', auth, generateImage);
aiRouter.post('/generate-image-background', auth,upload.single('image'), removeImageBackground);
aiRouter.post('/generate-image-object', auth,upload.single('image'), removeImageObject);
aiRouter.post('/generate-article', auth, reviewResume);




export default aiRouter;
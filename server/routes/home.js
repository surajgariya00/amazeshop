import express from 'express';
import { getDb } from '../db.js';

const router = express.Router();

router.get('/', (req,res)=>{
  const db = getDb();
  const featured = db.prepare('SELECT * FROM products ORDER BY rating DESC, rating_count DESC LIMIT 12').all();
  const deals = db.prepare('SELECT * FROM products ORDER BY RANDOM() LIMIT 8').all();
  const banners = [
    {image:'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop', title:'Mega Sale', subtitle:'Up to 70% off', cta:'Shop Deals'},
    {image:'https://images.unsplash.com/photo-1515169067865-5387ec356754?q=80&w=1600&auto=format&fit=crop', title:'New Arrivals', subtitle:'Fresh styles daily', cta:'Explore'}
  ];
  res.json({featured, deals, banners});
});

export default router;

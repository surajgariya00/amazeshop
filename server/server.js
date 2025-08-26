import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initSchema } from './db.js';
import { seedIfEmpty } from './utils/seed.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import homeRoutes from './routes/home.js';
import orderRoutes from './routes/orders.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit:'1mb'}));
app.use(morgan('dev'));

initSchema();
seedIfEmpty();

app.get('/api/health', (req,res)=>res.json({ok:true}));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
  console.log('AmazeShop API listening on http://localhost:'+PORT);
});

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import api from '../api'
import ProductCard from '../components/ProductCard'

export default function Home(){
  const [data, setData] = useState({featured:[], deals:[], banners:[]})
  useEffect(()=>{ api.get('/api/home').then(res=>setData(res.data)) },[])
  return (
    <div>
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl md:text-5xl font-extrabold leading-tight">
              Shop the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Future</span> Today
            </motion.h1>
            <p className="mt-4 text-slate-600">Discover 100+ hand‑picked items across categories. Beautiful UI, blazing fast, and a checkout in seconds.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/browse" className="btn">Explore Products</Link>
              <a href="#deals" className="px-4 py-2 rounded-2xl border">Today’s Deals</a>
            </div>
          </div>
          <motion.div initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} className="card overflow-hidden">
            <img src={data.banners[0]?.image} className="w-full h-80 object-cover" alt="banner"/>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Featured</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.featured.map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
      </section>

      <section id="deals" className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Deals of the Day</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {data.deals.map(p=><ProductCard key={p.id} p={p}/>)}
        </div>
      </section>
    </div>
  )
}

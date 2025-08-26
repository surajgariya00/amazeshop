import { create } from 'zustand'
import api from '../api'

const useStore = create((set, get)=>({
  user: JSON.parse(localStorage.getItem('user')||'null'),
  cart: JSON.parse(localStorage.getItem('cart')||'{"items":[],"totalQty":0,"totalCents":0}'),

  setUser: (user, token)=>{
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    set({user})
  },
  logout: ()=>{
    localStorage.removeItem('user'); localStorage.removeItem('token');
    set({user:null})
  },

  addToCart: (p, qty=1)=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'{"items":[],"totalQty":0,"totalCents":0}')
    const found = cart.items.find(i=>i.id===p.id)
    if (found){ found.quantity += qty }
    else { cart.items.push({id:p.id, title:p.title, price:p.price, image:p.image, quantity: qty}) }
    cart.totalQty = cart.items.reduce((a,b)=>a+b.quantity,0)
    cart.totalCents = cart.items.reduce((a,b)=>a+b.price*b.quantity,0)
    localStorage.setItem('cart', JSON.stringify(cart))
    set({cart})
  },
  updateQty: (id, qty)=>{
    const cart = get().cart
    cart.items = cart.items.map(it=>it.id===id?{...it, quantity: Math.max(1, qty)}:it)
    cart.totalQty = cart.items.reduce((a,b)=>a+b.quantity,0)
    cart.totalCents = cart.items.reduce((a,b)=>a+b.price*b.quantity,0)
    localStorage.setItem('cart', JSON.stringify(cart))
    set({cart})
  },
  removeFromCart: (id)=>{
    const cart = get().cart
    cart.items = cart.items.filter(it=>it.id!==id)
    cart.totalQty = cart.items.reduce((a,b)=>a+b.quantity,0)
    cart.totalCents = cart.items.reduce((a,b)=>a+b.price*b.quantity,0)
    localStorage.setItem('cart', JSON.stringify(cart))
    set({cart})
  },
  clearCart: ()=>{
    const cart = {items:[], totalQty:0, totalCents:0}
    localStorage.setItem('cart', JSON.stringify(cart))
    set({cart})
  },

  login: async (email,password)=>{
    const {data} = await api.post('/api/auth/login',{email,password})
    get().setUser(data.user, data.token)
  },
  register: async (name,email,password)=>{
    const {data} = await api.post('/api/auth/register',{name,email,password})
    get().setUser(data.user, data.token)
  },

  categories: [],
  fetchCategories: async ()=>{
    const {data} = await api.get('/api/products/categories')
    set({categories: data})
  }
}))

export default useStore

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import useStore from '../store/useStore'

export default function Checkout(){
  const { cart, clearCart, user } = useStore()
  const navigate = useNavigate()
  const [address, setAddress] = useState('221B Baker Street, London')
  const [status, setStatus] = useState('idle')

  const submit = async ()=>{
    if (!user) { alert('Please login first.'); navigate('/login'); return; }
    setStatus('loading')
    try{
      const {data} = await api.post('/api/orders/checkout', { items: cart.items, address })
      clearCart()
      navigate('/orders', { state: { placed: data.order_id } })
    }catch(e){
      alert('Checkout failed')
    }finally{ setStatus('idle') }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="card p-4">
        <label className="text-sm">Shipping Address</label>
        <textarea value={address} onChange={e=>setAddress(e.target.value)} className="w-full rounded-xl border px-3 py-2 mt-1"/>
        <button onClick={submit} disabled={status==='loading'} className="btn w-full mt-4">
          {status==='loading'?'Placing Order...':'Place Order'}
        </button>
      </div>
    </div>
  )
}

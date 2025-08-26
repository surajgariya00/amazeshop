import { Link } from 'react-router-dom'
import useStore from '../store/useStore'

export default function Cart(){
  const { cart, updateQty, removeFromCart } = useStore()
  const rupees = (c)=>'₹ '+(c/100).toFixed(2)
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.length===0 ? (
        <div className="p-8 card">Your cart is empty. <Link to="/browse" className="underline ml-2">Browse products</Link></div>
      ):(
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card p-4">
            {cart.items.map(it=>(
              <div key={it.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                <img src={it.image} className="w-20 h-20 object-cover rounded-xl"/>
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-slate-600">{rupees(it.price)}</div>
                </div>
                <input type="number" min="1" value={it.quantity} onChange={e=>updateQty(it.id, parseInt(e.target.value||1))} className="w-16 rounded-xl border px-2 py-1"/>
                <button onClick={()=>removeFromCart(it.id)} className="px-3 py-1 rounded-xl border">Remove</button>
              </div>
            ))}
          </div>
          <div className="card p-4 h-max">
            <div className="font-semibold mb-2">Order Summary</div>
            <div className="flex justify-between text-sm"><span>Items</span><span>{cart.totalQty}</span></div>
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{rupees(cart.totalCents)}</span></div>
            <div className="flex justify-between text-sm"><span>Shipping</span><span>₹ 0.00</span></div>
            <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>{rupees(cart.totalCents)}</span></div>
            <Link to="/checkout" className="btn w-full mt-4 text-center">Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}

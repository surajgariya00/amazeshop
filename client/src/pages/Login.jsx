import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useStore from '../store/useStore'

export default function Login(){
  const { login } = useStore()
  const [email, setEmail] = useState('admin@amazeshop.dev')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    try{ await login(email,password); navigate('/') } catch(_){ alert('Login failed') } finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border px-3 py-2"/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-xl border px-3 py-2"/>
        <button className="btn w-full" disabled={loading}>{loading?'Loading...':'Login'}</button>
        <div className="text-sm text-center">New here? <Link to="/register" className="underline">Create an account</Link></div>
      </form>
    </div>
  )
}

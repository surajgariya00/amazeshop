import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store/useStore'

export default function Register(){
  const { register } = useStore()
  const [name, setName] = useState('Jane Doe')
  const [email, setEmail] = useState('jane@example.com')
  const [password, setPassword] = useState('jane12345')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault(); setLoading(true)
    try{ await register(name,email,password); navigate('/') } catch(_){ alert('Registration failed') } finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form onSubmit={submit} className="card p-4 space-y-3">
        <input placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl border px-3 py-2"/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border px-3 py-2"/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-xl border px-3 py-2"/>
        <button className="btn w-full" disabled={loading}>{loading?'Loading...':'Register'}</button>
      </form>
    </div>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import AdminAnalytics from './pages/AdminAnalytics'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: 'browse', element: <Browse /> },
    { path: 'product/:id', element: <Product /> },
    { path: 'cart', element: <Cart /> },
    { path: 'checkout', element: <Checkout /> },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    { path: 'orders', element: <Orders /> },
    { path: 'admin', element: <AdminDashboard />, children: [
      { index: true, element: <AdminAnalytics /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'orders', element: <AdminOrders /> },
    ]}
  ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

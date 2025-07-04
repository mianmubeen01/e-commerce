import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FilterContextProvider } from './components/context/filter_context.jsx'
import { AppProvider } from './components/context/ProductContext.jsx'
import { CartProvider } from './components/context/CartContext.jsx'
import { AuthProvider } from './components/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthProvider>
  <AppProvider>
    <FilterContextProvider>
      <CartProvider>
    <App />
    </CartProvider>
    </FilterContextProvider>
  </AppProvider>
  </AuthProvider>
  
)

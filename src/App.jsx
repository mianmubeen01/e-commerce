import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import SinglePage from './Pages/SinglePage';
import Errors from './Pages/Errors';
import Header from './components/Header';
import Footer from './components/Footer';
import AddProduct from './Pages/AddProduct';
import Signup from './components/Registeration/SignUp';
import Login from './components/Registeration/Login';
import Logout from './components/Registeration/LogOut';
import Checkout from './Pages/CheckOut';
import AdminOrders from './components/orders/AdminOrder';
import Success from "./Pages/Success";
import EditOrder from './components/EditOrder';
import EditProduct from './components/EditProduct';
import ProtectAdminRoute from './components/ProtectAdminRoute';
import ForgotPassword from './components/Registeration/ForgotPassword';
import ResetPassword from './components/Registeration/ResetPassword';
import VerifyOtp from './components/Registeration/verifyOTP';



function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: "rgba(190, 236, 247, 0.41)",
      },
      primary: {
        main: "#8490ff",
      },
      secondary: {
        main: "rgb(98, 58, 243)",
      },
      text: {
        primary: "#212529",
      },
    },
    typography: {
      fontFamily: `'Roboto', sans-serif`,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    shadows: [
      "none",
      "0px 1px 3px rgba(0,0,0,0.02), 0px 0px 0px 1px rgba(27,32,35,0.15)",
      ...Array(23).fill("rgba(0, 0, 0, 0.15) 0px 1px 4px"),
    ],
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 998,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="*" element={<Errors />} />
          
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='logout' element={<Logout/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          <Route path='checkout/' element={<Checkout/>}/>
          <Route path="/success" element={<Success />} />
          <Route path='/admin-order' element={<ProtectAdminRoute>
            <AdminOrders/>
            </ProtectAdminRoute>}/>
          <Route path="/add-product" element={<ProtectAdminRoute>
            <AddProduct />
            </ProtectAdminRoute>} />
          <Route path="/admin/orders/:id/edit" element={<ProtectAdminRoute>
            <EditOrder />
            </ProtectAdminRoute>} />
          <Route path="/edit-product/:id" element={<ProtectAdminRoute>
            <EditProduct />
            </ProtectAdminRoute>} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

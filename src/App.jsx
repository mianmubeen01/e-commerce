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


function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: "#f5f5f5",
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
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

import HeroSection from "../components/HeroSection";
import { useProductContext } from "../components/context/ProductContext";

function About() {
  const { products, featuredProducts } = useProductContext(); // ✅ Destructure context

  const data = {
    name: 'About Page'
  };

  return (
    <>
      <HeroSection myData={data} />

      {/* Optional: just for debugging - shows number of products */}
      <p>Total Products: {products.length}</p>
      <p>Featured Products: {featuredProducts.length}</p>
    </>
  );
}

export default About;

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

    
    </>
  );
}

export default About;

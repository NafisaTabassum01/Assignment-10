import Banner from "@/components/Banner";
import ExtraSection3 from "@/components/ExtraSection3";
import ExtraSection2 from "@/components/ExtraSection2";
import Image from "next/image";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function Home() {
  return (
<div>
  <Banner></Banner>
  <FeaturedProducts></FeaturedProducts>    
  <ExtraSection3></ExtraSection3>      
  <ExtraSection2></ExtraSection2>  
    </div>
  );
}

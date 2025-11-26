import Hero from "@/component/Hero";
import Recent6 from "@/component/Recent6";
import Banner from "@/component/Banner";
import BlogSection from "@/component/BlogSection";
import PopularFormats from "@/component/PopularFormats";

export default function Home() {
  return (
    <div>
      <Hero />
      <Recent6 />
      <PopularFormats/>
      <BlogSection/>
      <Banner/>
    </div>
  );
}

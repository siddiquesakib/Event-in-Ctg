import Hero from "@/component/Hero";
import Recent6 from "@/component/Recent6";
import Banner from "@/component/Banner";
import ExploreByDate from "@/component/ExploreByDate";
import PopularFormats from "@/component/PopularFormats";
import FutureEvent from "@/component/FutureEvent";

export default function Home() {
  return (
    <div>
      <Hero />
      <FutureEvent />
      <Recent6 />
      <PopularFormats />
      <ExploreByDate />
      <Banner />
    </div>
  );
}

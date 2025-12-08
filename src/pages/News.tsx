import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// TO ADD A NEW NEWS ITEM:
// 1. Copy the template below and paste it at the TOP of the newsItems array
// 2. Update the id to be one higher than the last item
// 3. Add your title, date (format: DD/MM/YYYY), and excerpt/description
// 4. Add your image path (upload to /public/images/news/ folder)
// 5. Optionally add a Facebook post URL or external link

const newsItems = [
  {
    id: 7,
    title: "Wolfie at SCHLINGEL Film Festival",
    date: "26/09/2025",
    excerpt: "Hello Internationales Filmfestival SCHLINGEL! 🇩🇪 📽 Vlček / Wolfie will be featured on this fantastic film festival for children and young audience in a German premiere! Wolfie will screen in the International Animated Short Film Competition of SCHLiNGEL during the programme part \"Neighbourhood\" for kids & families (5+) on 28. 09., 15:30 at CineStar Cinema Chemnitz!",
    image: "/images/posters/wolfie/wolfie.jpg",
    link: "https://www.facebook.com/photo/?fbid=122144326394736463&set=a.122107909304736463"
  },
  
  {
    id: 1,
    title: "Soul Shift",
    date: "14/02/2025",
    excerpt: "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts!",
    image: "/images/stills/dont_blow_it_up/dont_blow_it_up_1.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Wolfie",
    date: "10/02/2025",
    excerpt: "An exciting new development in our latest production. This project brings together innovative storytelling and compelling characters.",
    image: "/images/stills/wolfie/wolfie_1.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Waves",
    date: "05/02/2025",
    excerpt: "A new wave of creative energy as our team embarks on this ambitious project, exploring themes of connection and transformation.",
    image: "/images/stills/waves/waves_1.jpg",
    link: "#"
  },
  {
    id: 4,
    title: "Home",
    date: "01/02/2025",
    excerpt: "A heartwarming story about finding one's place in the world, featuring stunning cinematography and powerful performances.",
    image: "/images/stills/home/home_1.jpg",
    link: "#"
  },
  {
    id: 5,
    title: "World I Live In",
    date: "28/01/2025",
    excerpt: "An introspective journey through different perspectives, challenging viewers to reconsider their understanding of reality.",
    image: "/images/stills/world_i_live_in/world_i_live_in_1.jpg",
    link: "#"
  },
  {
    id: 6,
    title: "Writing Home",
    date: "25/01/2025",
    excerpt: "Letters from distant places weave together a narrative of memory, longing, and the universal search for belonging.",
    image: "/images/stills/writing_home/writing_home_1.jpg",
    link: "#"
  }
];

export default function News() {
  const [visibleCount, setVisibleCount] = useState(9);
  const visibleItems = newsItems.slice(0, visibleCount);
  const hasMore = visibleCount < newsItems.length;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-[60px] sm:pt-[90px]">
        <section className="py-12 sm:py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
            <h1 className="font-garamond text-[45px] text-[#1c1c1c] mb-3 font-bold tracking-tight text-left">
              Latest News
            </h1>
            <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {visibleItems.map((item) => (
                <article 
                  key={item.id}
                  className="group bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2"
                >
                  <Link to={item.link} className="block">
                    <div className="relative w-full pt-[66.67%] overflow-hidden bg-gray-100 rounded-sm mb-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="font-nunito text-[15px] text-[#1c1c1c] font-bold mb-2 group-hover:text-[#666] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-nunito text-[10px] text-[#666] mb-3 font-medium">{item.date}</p>
                      <p className="font-nunito text-[17px] text-[#2c2c2c] leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mb-8">
                <Button 
                  variant="dark"
                  onClick={() => setVisibleCount(prev => prev + 9)}
                  className="text-base"
                >
                  Load More
                </Button>
              </div>
            )}

            <div className="text-center mt-12">
              <Link 
                to="/#news" 
                className="inline-block py-4 px-8 rounded-lg transition-all duration-300 text-base font-bold border-2 border-[#1c1c1c] bg-transparent text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white transform hover:scale-105 shadow-md hover:shadow-xl"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

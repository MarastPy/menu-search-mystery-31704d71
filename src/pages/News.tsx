import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

const newsItems = [
  {
    id: 1,
    title: "Soul Shift",
    date: "14/02/2025",
    excerpt: "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts!",
    image: "/src/images/stills/dont_blow_it_up/dont_blow_it_up_1.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Wolfie",
    date: "10/02/2025",
    excerpt: "An exciting new development in our latest production. This project brings together innovative storytelling and compelling characters.",
    image: "/src/images/stills/wolfie/wolfie_1.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Waves",
    date: "05/02/2025",
    excerpt: "A new wave of creative energy as our team embarks on this ambitious project, exploring themes of connection and transformation.",
    image: "/src/images/stills/waves/waves_1.jpg",
    link: "#"
  },
  {
    id: 4,
    title: "Home",
    date: "01/02/2025",
    excerpt: "A heartwarming story about finding one's place in the world, featuring stunning cinematography and powerful performances.",
    image: "/src/images/stills/home/home_1.jpg",
    link: "#"
  },
  {
    id: 5,
    title: "World I Live In",
    date: "28/01/2025",
    excerpt: "An introspective journey through different perspectives, challenging viewers to reconsider their understanding of reality.",
    image: "/src/images/stills/world_i_live_in/world_i_live_in_1.jpg",
    link: "#"
  },
  {
    id: 6,
    title: "Writing Home",
    date: "25/01/2025",
    excerpt: "Letters from distant places weave together a narrative of memory, longing, and the universal search for belonging.",
    image: "/src/images/stills/writing_home/writing_home_1.jpg",
    link: "#"
  }
];

export default function News() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-[60px] sm:pt-[90px]">
        <section className="py-12 sm:py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
            <h1 className="font-serif text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
              Latest News
            </h1>
            <hr className="border-gray-300 mb-12" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {newsItems.map((item) => (
                <article 
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  <Link to={item.link} className="block">
                    <div className="relative w-full pt-[66.67%] overflow-hidden bg-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-serif text-2xl text-gray-900 mb-3 group-hover:text-[#C5262A] transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm font-bold text-gray-500 mb-4">{item.date}</p>
                      <p className="text-base text-gray-700 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

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
    </>
  );
}

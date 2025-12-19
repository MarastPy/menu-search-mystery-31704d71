import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const baseUrl = import.meta.env.BASE_URL;

const newsItems = [
  {
    id: 0,
    date: "16/12/2024",
    excerpt:
      "Does your film refuse to fit into any box? Cinefila Distribution brings WTF OFF – the acclaimed curated programme of bold, experimental animation by Sébastien Sperer – to SVOD platforms and theatrical distribution.",
    image: `${baseUrl}images/wtf_off/wtf_off_logo.jpg`,
    link: "/wtf-off",
    isInternal: true,
  },
  {
    id: 1,
    date: "10/12/2024",
    excerpt:
      "We are speechless! I Died in Irpin, a short animated documentary by Anastasiia Falileieva, is shortlisted for the Animated Short Film category for the 98th Academy Awards®! Big big congratulations to the whole team behind the movie!",
    image: `${baseUrl}images/news/i_died_in_irpin_oscars.jpg`,
    link: "https://www.instagram.com/p/DSViKSCipzZ/",
    filmLink: "/film/i-died-in-irpin",
    filmName: "I Died in Irpin",
  },
  {
    id: 2,
    date: "05/12/2024",
    excerpt:
      "At this year's Animateka Festival we had an opportunity to offer the Cinefila Festival Distribution Award to one of the projects presented at the Rise & Shine workshop for young talents. 💡 The award covers a two-year festival distribution prize valued at €4,000. The winner among the 11 amazing projects was Stormsurge directed by Anna Tőkés and produced by Balint Gelley of CUB Animation! 🔸 \"On Grace's island the weather is influenced by her mood, which is always cloudy and gray. One day, she gets help from her friends to express her feelings through dance, and together they lure the sun out.\"",
    image: `${baseUrl}images/news/animateka_2025.jpg`,
    link: "https://www.instagram.com/p/DSNZ9i6Coa7/?img_index=1",
  },
  {
    id: 3,
    date: "28/11/2024",
    excerpt:
      "Soul Shift, animated science-fiction comedy series, received a Professional Group Animated Series Gold Award at Xiamen International Animation Festival!",
    image: `${baseUrl}images/news/soul_shift_xiamen.jpg`,
    link: "https://www.instagram.com/p/DR9wuRQCh8a/",
    filmLink: "/film/soul-shift",
    filmName: "Soul Shift",
  },
  {
    id: 4,
    date: "20/11/2024",
    excerpt:
      "We are so happy to announce that Wolfie has won the European Children's Film Association Short Film Award at Bucharest Kids Film Festival! 🤩 By winning this prestigious award, Wolfie will be nominated for the overall ECFA Short Film Award which will be handed out during Berlinale in 2026. Stay tuned!",
    image: `${baseUrl}images/news/wolfie_european_film.jpg`,
    link: "https://www.instagram.com/p/DQ33hn-DTpm/",
    filmLink: "/film/wolfie",
    filmName: "Wolfie",
  },
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
            <h1 className="font-garamond text-[45px] text-[#1c1c1c] mb-3 font-bold tracking-tight text-left">News</h1>
            <div className="w-full h-[2px] bg-gray-400 mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {visibleItems.map((item) => (
                <article
                  key={item.id}
                  className="group bg-white overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative w-full pt-[66.67%] overflow-hidden bg-gray-100 rounded-sm mb-4">
                      <img
                        src={item.image}
                        alt="News"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>

                    <div className="pt-2">
                      <p className="font-nunito text-[15px] text-[#1c1c1c] font-bold mb-3">{item.date}</p>
                      <p className="font-nunito text-[14px] text-[#2c2c2c] leading-relaxed">{item.excerpt}</p>
                    </div>
                  </a>
                  {item.filmLink && (
                    <Link
                      to={item.filmLink}
                      className="inline-block mt-2 font-nunito text-[13px] text-[#666] hover:text-[#1c1c1c] underline"
                    >
                      View {item.filmName} →
                    </Link>
                  )}
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mb-8">
                <Button variant="dark" onClick={() => setVisibleCount((prev) => prev + 9)} className="text-base">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

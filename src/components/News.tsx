import { Link } from "react-router-dom";

const baseUrl = import.meta.env.BASE_URL;

const newsItems = [
  {
    date: "16/12/2024",
    excerpt:
      "Cinefila Distribution brings WTF OFF — the acclaimed curated programme of bold, experimental animation by Sébastien Sperer — to SVOD platforms and theatrical distribution. Stay tuned for the 2026 premiere!",
    image: `${baseUrl}images/wtf_off/wtf_off_logo.jpg`,
    link: "/wtf-off",
    isInternal: true,
  },
  {
    date: "16/12/2024",
    excerpt:
      "We are speechless! I Died in Irpin, a short animated documentary by Anastasiia Falileieva, is shortlisted for the Animated Short Film category for the 98th Academy Awards®! Big big congratulations to the whole team behind the movie!",
    image: `${baseUrl}images/news/i_died_in_irpin_oscars.jpg`,
    link: "https://www.instagram.com/p/DSViKSCipzZ/",
    filmLink: "/film/i-died-in-irpin",
    filmName: "I Died in Irpin",
  },
  {
    date: "13/12/2024",
    excerpt:
      "At this year's Animateka Festival we had an opportunity to offer the Cinefila Festival Distribution Award to one of the projects presented at the Rise & Shine workshop for young talents. 💡 The award covers a two-year festival distribution prize valued at €4,000. The winner among the 11 amazing projects was Stormsurge directed by Anna Tőkés and produced by Balint Gelley of CUB Animation! 🔸 \"On Grace's island the weather is influenced by her mood, which is always cloudy and gray. One day, she gets help from her friends to express her feelings through dance, and together they lure the sun out.\"",
    image: `${baseUrl}images/news/animateka_2025.jpg`,
    link: "https://www.instagram.com/p/DSNZ9i6Coa7/?img_index=1",
  },
  {
    date: "7/12/2024",
    excerpt:
      "Soul Shift, animated science-fiction comedy series, received a Professional Group Animated Series Gold Award at Xiamen International Animation Festival!",
    image: `${baseUrl}images/news/soul_shift_xiamen.jpg`,
    link: "https://www.instagram.com/p/DR9wuRQCh8a/",
    filmLink: "/film/soul-shift",
    filmName: "Soul Shift",
  },
  {
    date: "1/12/2024",
    excerpt:
      "We are so happy to announce that Wolfie has won the European Children's Film Association Short Film Award at Bucharest Kids Film Festival! 🤩 By winning this prestigious award, Wolfie will be nominated for the overall ECFA Short Film Award which will be handed out during Berlinale in 2026. Stay tuned!",
    image: `${baseUrl}images/news/wolfie_european_film.jpg`,
    link: "https://www.instagram.com/p/DQ33hn-DTpm/",
    filmLink: "/film/wolfie",
    filmName: "Wolfie",
  },
];

export const News = () => {
  return (
    <section id="news" className="py-16 sm:py-24 scroll-mt-[90px]" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="mb-16">
          <h1 className="font-garamond text-[45px] text-[#1c1c1c] mb-3 font-bold tracking-tight text-left">News</h1>
          <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsItems.slice(0, 3).map((item, index) => {
            const content = (
              <>
                <div className="aspect-[3/2] relative overflow-hidden rounded-sm mb-4">
                  <img src={item.image} alt="News" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <p className="font-nunito text-[15px] text-[#1c1c1c] font-bold mb-3">{item.date}</p>
                <p className="font-nunito text-[14px] text-[#2c2c2c] leading-relaxed">
                  {item.excerpt.length > 500 ? item.excerpt.slice(0, 500) + "..." : item.excerpt}
                </p>
                {item.filmLink && (
                  <Link
                    to={item.filmLink}
                    className="inline-block mt-2 font-nunito text-[13px] text-[#666] hover:text-[#1c1c1c] underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View {item.filmName} →
                  </Link>
                )}
              </>
            );

            const className = "group text-left transition-all duration-300 hover:-translate-y-2 block";

            return item.isInternal ? (
              <Link key={index} to={item.link} className={className}>
                {content}
              </Link>
            ) : (
              <a
                key={index}
                href={item.link || "#"}
                target={item.link?.startsWith("http") ? "_blank" : "_self"}
                rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
                className={className}
              >
                {content}
              </a>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/news"
            className="inline-block py-3 px-8 rounded-sm transition-all duration-300 font-nunito text-[17px] font-medium border border-[#1c1c1c] bg-transparent text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white"
          >
            Read More News
          </Link>
        </div>
      </div>
    </section>
  );
};

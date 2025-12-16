const baseUrl = import.meta.env.BASE_URL;

const newsItems = [
  {
    title: "I died in Irpin",
    date: "10/02/2025",
    excerpt:
      " We are speechless! I Died in Irpin, a short animated documentary by Anastasiia Falileieva, is shortlisted for the Animated Short Film category for the 98th Academy Awards®! Big big congratulations to the whole team behind the movie!",
    fullContent:
      " We are speechless! I Died in Irpin, a short animated documentary by Anastasiia Falileieva, is shortlisted for the Animated Short Film category for the 98th Academy Awards®! Big big congratulations to the whole team behind the movie!",
    image: `${baseUrl}images/posters/i_died_in_irpin/i_died_in_irpin.jpg`,
    link: "https://www.instagram.com/p/DSViKSCipzZ/",
  },
  {
    title: "Wolfie at SCHLINGEL Film Festival",
    date: "26/09/2025",
    excerpt:
      "Hello Internationales Filmfestival SCHLINGEL! 🇩🇪 📽 Vlček / Wolfie will be featured on this fantastic film festival for children and young audience in a German premiere!",
    fullContent:
      'Hello Internationales Filmfestival SCHLINGEL! 🇩🇪 📽 Vlček / Wolfie will be featured on this fantastic film festival for children and young audience in a German premiere! Wolfie will screen in the International Animated Short Film Competition of SCHLiNGEL during the programme part "Neighbourhood" for kids & families (5+) on 28. 09., 15:30 at CineStar Cinema Chemnitz!',
    image: `${baseUrl}images/posters/wolfie/wolfie.jpg`,
    link: "https://www.facebook.com/photo/?fbid=122144326394736463&set=a.122107909304736463",
  },
  {
    title: "Soul Shift",
    date: "14/02/2025",
    excerpt:
      "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts!",
    fullContent:
      "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts! This is an exciting opportunity for the series to be showcased at one of the most prestigious animation festivals in Europe.",
    image: `${baseUrl}images/posters/soul_shift/soul_shift.jpg`,
  },
  {
    title: "Film Premiere Announcement",
    date: "05/02/2025",
    excerpt:
      "Details about an upcoming film premiere, including dates, venues, and what makes this film a must-see for audiences.",
    fullContent:
      "We are thrilled to announce the premiere of our latest production. This film represents a significant milestone in our catalogue and we look forward to sharing it with audiences worldwide. Stay tuned for more details about screenings and festival selections.",
    image: `${baseUrl}images/homepage/BOTY_CANNES_crop.jpg`,
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
          {newsItems.slice(0, 3).map((item, index) => (
            <a
              key={index}
              href={item.link || "#"}
              target={item.link?.startsWith("http") ? "_blank" : "_self"}
              rel={item.link?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group text-left transition-all duration-300 hover:-translate-y-2 block"
            >
              <div className="aspect-[3/2] relative overflow-hidden rounded-sm mb-4">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p className="font-nunito text-[15px] text-[#1c1c1c] font-bold mb-3">{item.date}</p>
              <p className="font-nunito text-[14px] text-[#2c2c2c] leading-relaxed">
                {item.excerpt.length > 500 ? item.excerpt.slice(0, 500) + '...' : item.excerpt}
              </p>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/news"
            className="inline-block py-3 px-8 rounded-sm transition-all duration-300 font-nunito text-[17px] font-medium border border-[#1c1c1c] bg-transparent text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white"
          >
            Read More News
          </a>
        </div>
      </div>
    </section>
  );
};

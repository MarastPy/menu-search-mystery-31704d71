const newsItems = [
  {
    title: "Soul Shift",
    date: "14/02/2025",
    excerpt: "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts!",
    image: "/src/images/posters/soul_shift/soul_shift.jpg",
    link: "#"
  },
  {
    title: "Wolfie",
    date: "10/02/2025",
    excerpt: "A brief description of another exciting news article. This will entice readers to click and learn more about the topic.",
    image: "/src/images/posters/wolfie/wolfie.jpg",
    link: "#"
  },
  {
    title: "Film Premiere Announcement",
    date: "05/02/2025",
    excerpt: "Details about an upcoming film premiere, including dates, venues, and what makes this film a must-see for audiences.",
    image: "/src/images/homepage/0713b562-3fc9-41cd-b6f6-f9bd30b54d7c.JPG",
    link: "#"
  }
];

export const News = () => {
  return (
    <section id="news" className="py-[90px] bg-white">
      <div className="max-w-[1200px] mx-auto px-[2cm]">
        <h1 className="font-serif text-black text-[3em] mb-4">News</h1>
        <hr className="border-gray-300 mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px_25px] justify-center max-w-[1100px] mx-auto mb-10">
          {newsItems.map((item, index) => (
            <a 
              key={index}
              href={item.link}
              className="block p-[25px] flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 shadow-[0_6px_14px_rgba(0,0,0,0.1)] rounded-[15px] bg-white"
            >
              <h3 className="text-black min-h-[55px] text-[1.3rem] my-[15px] mx-[15px] text-left font-serif">
                {item.title}
              </h3>
              <div className="w-full pt-[56.25%] relative overflow-hidden rounded-[5px] mb-3 group">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="text-[.9rem] text-[#444] mb-[18px] font-bold text-left">{item.date}</p>
              <p className="text-[.95rem] text-[#1c1c1c] flex-grow leading-[1.5] px-[15px] pb-[15px]">
                {item.excerpt}
              </p>
            </a>
          ))}
        </div>

        <div className="text-center mt-[30px]">
          <a 
            href="#" 
            className="inline-block py-3 px-6 rounded-md transition-all duration-300 mt-6 text-base font-bold border-2 border-[#1c1c1c] bg-transparent text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white"
          >
            Read More News
          </a>
        </div>
      </div>
    </section>
  );
};

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const newsItems = [
  {
    title: "Wolfie at SCHLINGEL Film Festival",
    date: "26/09/2025",
    excerpt: "Hello Internationales Filmfestival SCHLINGEL! 🇩🇪 📽 Vlček / Wolfie will be featured on this fantastic film festival for children and young audience in a German premiere!",
    fullContent: "Hello Internationales Filmfestival SCHLINGEL! 🇩🇪 📽 Vlček / Wolfie will be featured on this fantastic film festival for children and young audience in a German premiere! Wolfie will screen in the International Animated Short Film Competition of SCHLiNGEL during the programme part \"Neighbourhood\" for kids & families (5+) on 28. 09., 15:30 at CineStar Cinema Chemnitz!",
    image: "/images/posters/wolfie/wolfie.jpg",
    link: "https://www.facebook.com/photo/?fbid=122144326394736463&set=a.122107909304736463"
  },
  {
    title: "Soul Shift",
    date: "14/02/2025",
    excerpt: "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts!",
    fullContent: "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts! This is an exciting opportunity for the series to be showcased at one of the most prestigious animation festivals in Europe.",
    image: "/images/posters/soul_shift/soul_shift.jpg"
  },
  {
    title: "Wolfie",
    date: "10/02/2025",
    excerpt: "A brief description of another exciting news article. This will entice readers to click and learn more about the topic.",
    fullContent: "Wolfie continues its festival journey with great success. The film has been well received by audiences and critics alike, garnering attention for its unique storytelling and beautiful animation.",
    image: "/images/posters/wolfie/wolfie.jpg"
  },
  {
    title: "Film Premiere Announcement",
    date: "05/02/2025",
    excerpt: "Details about an upcoming film premiere, including dates, venues, and what makes this film a must-see for audiences.",
    fullContent: "We are thrilled to announce the premiere of our latest production. This film represents a significant milestone in our catalogue and we look forward to sharing it with audiences worldwide. Stay tuned for more details about screenings and festival selections.",
    image: "/images/homepage/BOTY_CANNES_crop.jpg"
  }
];

export const News = () => {
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  return (
    <section id="news" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-16">
          <h1 className="font-serif text-[#1c1c1c] text-5xl sm:text-6xl lg:text-7xl mb-3 font-light tracking-tight text-left">
            News
          </h1>
          <div className="w-40 h-1 bg-border mb-12"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsItems.slice(0, 3).map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedNews(item)}
              className="group text-left transition-all duration-300 hover:-translate-y-2"
            >
              <div className="aspect-[3/4] relative overflow-hidden rounded-sm mb-4 ring-1 ring-gray-200 group-hover:ring-[#1c1c1c] transition-all">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-[#1c1c1c] text-xl font-serif font-bold mb-2 group-hover:text-[#666] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#666] mb-3 font-medium">{item.date}</p>
              <p className="text-base text-[#2c2c2c] leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
            </button>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/news" 
            className="inline-block py-3 px-8 rounded-sm transition-all duration-300 text-base font-medium border border-[#1c1c1c] bg-transparent text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white"
          >
            Read More News
          </a>
        </div>
      </div>
      
      {/* News Detail Dialog */}
      <Dialog open={selectedNews !== null} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl sm:text-3xl font-serif mb-4">
                  {selectedNews.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-medium">{selectedNews.date}</p>
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img 
                    src={selectedNews.image} 
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-base leading-relaxed text-justify">
                  {selectedNews.fullContent}
                </p>
                {selectedNews.link && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <a 
                      href={selectedNews.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                      View on Facebook →
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const newsItems = [
  {
    title: "Soul Shift",
    date: "14/02/2025",
    description: "Soul Shift, animated science-fiction comedy series, will premiere in the competition at Cartoons on the Bay – International Festival of Animation, Transmedia and Meta-Arts!",
    image: "/placeholder.svg"
  },
  {
    title: "Festival Success",
    date: "10/02/2025",
    description: "Our latest documentary wins Best Film award at prestigious international festival.",
    image: "/placeholder.svg"
  },
  {
    title: "New Distribution Deal",
    date: "05/02/2025",
    description: "Exciting new partnership announced for European distribution rights.",
    image: "/placeholder.svg"
  }
];

export const News = () => {
  return (
    <section id="news" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">News</h2>
        <hr className="border-border/30 mb-12" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const films = [
  {
    title: "The Last Frame",
    director: "Jane Director",
    year: "2024",
    genre: "Drama",
    awards: "Cannes Selection",
    image: "/placeholder.svg"
  },
  {
    title: "City Lights Redux",
    director: "John Filmmaker",
    year: "2024",
    genre: "Documentary",
    awards: "Berlin Film Festival",
    image: "/placeholder.svg"
  },
  {
    title: "Midnight Stories",
    director: "Maria Director",
    year: "2023",
    genre: "Thriller",
    awards: "Sundance Winner",
    image: "/placeholder.svg"
  }
];

export const Catalogue = () => {
  return (
    <section id="catalogue" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Film Catalogue</h2>
        <hr className="border-border/30 mb-12" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film, index) => (
            <Card 
              key={index}
              className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="aspect-[2/3] overflow-hidden bg-muted">
                <img 
                  src={film.image} 
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                  {film.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {film.director} • {film.year}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  {film.genre}
                </Badge>
                <p className="text-sm text-primary">{film.awards}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

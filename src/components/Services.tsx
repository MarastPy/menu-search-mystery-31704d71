import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Award, Globe } from "lucide-react";

const services = [
  {
    icon: Award,
    title: "Festival Strategy",
    description: "Expert guidance for festival selections, premieres, and award campaigns. We help position your film for maximum impact on the festival circuit."
  },
  {
    icon: Globe,
    title: "International Sales",
    description: "Global distribution network and sales expertise. We connect your film with buyers and distributors worldwide."
  },
  {
    icon: Film,
    title: "Distribution",
    description: "Comprehensive distribution services across all platforms. From theatrical releases to streaming, we handle it all."
  }
];

export const Services = () => {
  return (
    <section id="services" className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
          What can we do for you
        </h2>
        <hr className="border-border/30 mb-12" />
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="bg-card border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

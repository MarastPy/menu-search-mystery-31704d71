import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">About us & contact</h2>
        <hr className="border-border/30 mb-12" />
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* About */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Cinefila is a boutique film sales and distribution company dedicated to bringing exceptional 
                  cinema to audiences worldwide. With years of experience in the international film market, 
                  we specialize in connecting filmmakers with the right festivals, distributors, and audiences.
                </p>
                <p>
                  Our team of passionate film professionals understands the unique journey of each project. 
                  We provide personalized strategies and unwavering support to ensure your film reaches its 
                  full potential.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:info@cinefila.com" className="text-primary hover:text-primary/80">
                      info@cinefila.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <a href="tel:+420123456789" className="text-primary hover:text-primary/80">
                      +420 123 456 789
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      Prague, Czech Republic
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Send us a message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-background to-background/80">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-foreground">
            Cinefila
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Festival strategy | Sales | Distribution
          </p>
        </div>

        <hr className="border-border/30 max-w-2xl mx-auto" />

        {/* Definition */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="text-2xl md:text-3xl font-serif italic text-muted-foreground">
            " cinefila / cinefil / cinéphile / cinéfilo / σινεфίл / シネフィル "
          </p>
          <div className="text-left space-y-2">
            <p className="text-lg text-muted-foreground">
              <strong>noun</strong>
            </p>
            <p className="text-lg text-muted-foreground">
              1. A person who lives and breathes the cinema
            </p>
            <p className="text-lg text-muted-foreground">
              2. A film lover; enthusiastically interested in and knowledgeable about cinema
            </p>
          </div>
        </div>

        <hr className="border-border/30 max-w-2xl mx-auto" />

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            What can we do for you
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            onClick={() => document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Film Catalogue
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            About us & contact
          </Button>
        </div>
      </div>
    </section>
  );
};

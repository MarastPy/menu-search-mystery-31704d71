import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section 
      className="bg-[#2b2b2b] text-white py-10 px-4 sm:px-8 lg:px-[2cm] text-center overflow-hidden mt-[60px] sm:mt-[90px]"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Logo */}
        <img 
          src="/images/logo/Cinefila_logo_white_web.svg" 
          alt="Cinefila Logo" 
          className="max-w-[250px] h-auto mx-auto mb-5 block" 
        />
        
        <h2 className="font-serif text-[1.5em] sm:text-[2em] lg:text-[2.5em] mb-10 text-white">
          Festival strategy | Sales | Distribution
        </h2>
        
        <hr className="border-white/20 mb-10" />

        {/* Definition */}
        <div className="relative max-w-[500px] mx-auto text-center space-y-3 py-8">
          {/* Opening quotation mark */}
          <div className="absolute -left-10 -top-8 text-[7em] text-white/50 font-garamond leading-none">"</div>
          
          <p className="font-serif text-[1.3em] text-white/90 tracking-wide mb-4">
            cinefila / cinefil / cinéphile / cineast / cinéfilo / σινεφίλ / シネフィル /
          </p>
          
          <p className="text-[0.95em] text-white/60 italic mb-6 tracking-wider">
            noun
          </p>
          
          <div className="space-y-3 text-white/80 leading-relaxed text-left">
            <p className="text-[1.05em] pl-6 -indent-6">
              <span className="font-semibold">1.</span> A person who lives and breathes the cinema
            </p>
            
            <p className="text-[1.05em] pl-6 -indent-6">
              <span className="font-semibold">2.</span> A film lover; a person who is enthusiastically interested in and knowledgeable about cinema
            </p>
          </div>
          
          {/* Closing quotation mark */}
          <div className="absolute -right-10 -bottom-8 text-[7em] text-white/50 font-garamond leading-none">"</div>
        </div>

        <hr className="border-white/20 mt-10" />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 lg:gap-[70px] mt-10">
          <Button 
            asChild 
            variant="dark" 
            size="lg" 
            className="w-full sm:w-[200px] lg:w-[220px] h-[60px] sm:h-[70px] text-base font-bold"
          >
            <a href="#whatcanwedo">
              What can we do for you
            </a>
          </Button>
          <Button 
            asChild 
            variant="dark" 
            size="lg" 
            className="w-full sm:w-[200px] lg:w-[220px] h-[60px] sm:h-[70px] text-base font-bold"
          >
            <a href="#catalogue">
              Line Up
            </a>
          </Button>
          <Button 
            asChild 
            variant="dark" 
            size="lg" 
            className="w-full sm:w-[200px] lg:w-[220px] h-[60px] sm:h-[70px] text-base font-bold"
          >
            <a href="#about">
              About us & contact
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

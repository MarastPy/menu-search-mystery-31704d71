import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [logoOpacity, setLogoOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out hero logo as user scrolls
      const fadeStart = 50;
      const fadeEnd = window.innerHeight * 0.4;
      const opacity = Math.max(0, 1 - (window.scrollY - fadeStart) / (fadeEnd - fadeStart));
      setLogoOpacity(Math.max(0, Math.min(1, opacity)));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-[#2b2b2b] text-[#D9D9D9] py-8 sm:py-10 px-4 sm:px-8 text-center overflow-hidden mt-[60px] sm:mt-[90px]">
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
        {/* Logo - fades out and scales down as user scrolls */}
        <img
          src={`${import.meta.env.BASE_URL}images/logo/Cinefila_logo_white_web.svg`}
          alt="Cinefila Logo"
          className="max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] h-auto mx-auto mb-4 sm:mb-5 block transition-transform duration-100"
          style={{
            opacity: logoOpacity,
            transform: `scale(${0.9 + logoOpacity * 0.1}) translateY(${(1 - logoOpacity) * -20}px)`,
          }}
        />

        <h2 className="font-nunito text-[22px] sm:text-[26px] lg:text-[30px] mb-8 sm:mb-10 text-[#D9D9D9] font-normal">
          Festival strategy | Sales | Distribution
        </h2>

        <hr className="border-white/20 border-t-2 mb-8 sm:mb-10" />

        {/* Definition */}
        <div className="relative max-w-[500px] mx-auto text-center space-y-3 py-6 sm:py-8 px-6 sm:px-0">
          {/* Opening quotation mark */}
          <div className="absolute -left-1 sm:-left-9 -top-2 sm:-top-4 text-[4em] sm:text-[5em] lg:text-[7em] text-[#D9D9D9]/50 font-garamond leading-none">
            “
          </div>

          <p className="font-garamond text-[12px] sm:text-[13px] lg:text-[15px] text-[#D9D9D9] tracking-wide mb-4">
            cinefila / cinefil / cinéphile / cineast / cinéfilo / σινεφίλ / シネフィル /
          </p>

          <p className="font-garamond text-[11px] sm:text-[12px] lg:text-[14px] text-[#D9D9D9]/60 italic mb-6 tracking-wider">
            noun
          </p>

          <div className="space-y-3 text-[#D9D9D9] leading-relaxed text-left font-garamond text-[12px] sm:text-[13px] lg:text-[15px]">
            <p className="pl-6 -indent-6">
              <span className="font-semibold">1.</span> A person who lives and breathes the cinema
            </p>

            <p className="pl-6 -indent-6">
              <span className="font-semibold">2.</span> A film lover; a person who is enthusiastically interested in and
              knowledgeable about cinema
            </p>
          </div>

          {/* Closing quotation mark */}
          <div className="absolute -right-1 sm:-right-11 -bottom-10 sm:-bottom-12 text-[4em] sm:text-[5em] lg:text-[7em] text-[#D9D9D9]/50 font-garamond leading-none">
            ”
          </div>
        </div>

        <hr className="border-white/20 border-t-2 mt-8 sm:mt-10" />

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-row justify-center gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-10">
          <Button
            asChild
            variant="dark"
            size="lg"
            className="w-full sm:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] lg:h-[70px] text-[13px] sm:text-[14px] lg:text-base font-bold px-2 sm:px-4"
          >
            <a href="#whatcanwedo">What can we do for you</a>
          </Button>
          <Button
            asChild
            variant="dark"
            size="lg"
            className="w-full sm:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] lg:h-[70px] text-[13px] sm:text-[14px] lg:text-base font-bold px-2 sm:px-4"
          >
            <a href="/catalogue">Line Up</a>
          </Button>
          <Button
            asChild
            variant="dark"
            size="lg"
            className="w-full sm:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] lg:h-[70px] text-[13px] sm:text-[14px] lg:text-base font-bold px-2 sm:px-4"
          >
            <a href="#news">News</a>
          </Button>
          <Button
            asChild
            variant="dark"
            size="lg"
            className="w-full sm:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] lg:h-[70px] text-[13px] sm:text-[14px] lg:text-base font-bold px-2 sm:px-4"
          >
            <a href="/workshops">Workshops</a>
          </Button>
          <Button
            asChild
            variant="dark"
            size="lg"
            className="col-span-2 sm:col-span-1 w-full sm:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] lg:h-[70px] text-[13px] sm:text-[14px] lg:text-base font-bold px-2 sm:px-4"
          >
            <a href="#about">About us & contact</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

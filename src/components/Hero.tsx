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
        <div className="max-w-[600px] mx-auto text-left space-y-5">
          <p className="font-serif text-[1.8em] text-[#999] mb-5 italic">
            " cinefila / cinefil / cinéphile / cinéfilo / σινεфίл / シネフィル "
          </p>
          <p className="text-[1.2em] text-[#999] mb-2.5 font-bold">
            <strong>noun</strong>
          </p>
          <p className="text-[1.1em] text-[#999] mb-1.5">
            1. A person who lives and breathes the cinema
          </p>
          <p className="text-[1.1em] text-[#999] mb-1.5">
            2. A film lover; enthusiastically interested in and knowledgeable about cinema
          </p>
        </div>

        <hr className="border-white/20 mt-10" />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 lg:gap-[70px] mt-10">
          <a
            href="#whatcanwedo"
            className="flex items-center justify-center w-full sm:w-[200px] lg:w-[220px] h-[60px] sm:h-[70px] px-4 py-2.5 border-4 border-white text-white text-[1em] sm:text-[1.2em] font-bold hover:bg-white hover:text-[#2b2b2b] transition-all duration-300"
          >
            What can we do for you
          </a>
          <a
            href="#catalogue"
            className="flex items-center justify-center w-full sm:w-[200px] lg:w-[220px] h-[60px] sm:h-[70px] px-4 py-2.5 border-4 border-white text-white text-[1em] sm:text-[1.2em] font-bold hover:bg-white hover:text-[#2b2b2b] transition-all duration-300"
          >
            Line Up
          </a>
          <a
            href="#about"
            className="flex items-center justify-center w-full sm:w-[200px] lg:w-[220px] h-[60px] sm:h-[70px] px-4 py-2.5 border-4 border-white text-white text-[1em] sm:text-[1.2em] font-bold hover:bg-white hover:text-[#2b2b2b] transition-all duration-300"
          >
            About us & contact
          </a>
        </div>
      </div>
    </section>
  );
};

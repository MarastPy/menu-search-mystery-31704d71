export const Mission = () => {
  return (
    <section id="whatcanwedo" className="py-12 sm:py-[90px] bg-[#f0f2f5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
        <h1 className="font-serif text-[#222] text-[2em] sm:text-[2.5em] lg:text-[3em] mb-4">Our Mission</h1>
        <hr className="border-gray-300 mb-12" />
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10 items-center">
          <div className="flex-1 text-justify text-[1.05em]">
            <p className="mb-4 text-[#222]">
              CINEFILA is a dynamic film distribution company based in Prague, founded by Alexandra Hroncová, an experienced festival strategist and distribution manager. Drawing from over eight years of expertise in helping filmmakers, young talents, and film institutions succeed on the global stage, CINEFILA offers a comprehensive suite of services tailored for independent filmmakers, production companies, festivals, cinemas, and film schools.
            </p>
            <p className="text-[#222]">
              CINEFILA is dedicated to fostering creativity, elevating underrepresented voices, and connecting exceptional films with audiences worldwide. Whether you're a filmmaker, festival, cinema, or an academic institution, we are here to help your stories shine on the global stage.
            </p>
          </div>
          <div className="flex-1">
            <img 
              src="/src/images/homepage/BOTY_CANNES_crop.jpg" 
              alt="Illustrative image for Cinefila mission" 
              className="w-full rounded-[10px] shadow-[0_6px_12px_rgba(0,0,0,.08)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

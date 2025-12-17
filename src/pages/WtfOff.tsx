import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const baseUrl = import.meta.env.BASE_URL;

const WtfOff = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-[150px] sm:pt-[150px] pb-12 sm:pb-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
          {/* Logo Header */}
          <div className="mb-12">
            <img 
              src={`${baseUrl}images/wtf_off/wtf_off_logo.jpg`} 
              alt="WTF OFF Logo" 
              className="w-full max-w-[600px] mx-auto h-auto mb-8"
            />
          </div>
          
          <h1 className="font-garamond text-[45px] text-[#222] mb-4 font-bold">WTF OFF</h1>
          <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify font-nunito text-[17px]">
              <h2 className="font-nunito text-[1.5em] mb-4 font-bold">About the Programme</h2>
              <p className="mb-4">
                WTF OFF is an annual showcase of animated films curated by Sébastien Sperer. It showcases films that are original, experimental, provocative, shocking, or that push the boundaries of animated storytelling.
              </p>
              <p className="mb-4">
                Its purpose is to create a space for works that don't fit into the traditional categories of the festival — official competition, children's programmes, or mainstream slots — yet still deserve to be seen.
              </p>
              <p className="mb-4">
                The screenings usually take place in the evening or at night, giving them a "midnight-show" atmosphere where the audience expects bold, unusual or subversive animation.
              </p>
              <p className="mb-4">
                WTF OFF usually presents short films, student work, experimental animation, and sometimes even feature-length projects.
              </p>
              <p className="mb-4">
                Thematically, the programme often includes irreverent humour, bizarre ideas, uncomfortable or adult content, and generally work that aims to shock, provoke, or deeply engage the viewer.
              </p>
            </div>
            
            <div className="text-justify font-nunito text-[17px]">
              <h2 className="font-nunito text-[1.5em] mb-4 font-bold">Cinefila Distribution</h2>
              <p className="mb-4">
                Cinefila Distribution wants to bring this curated programme — which already has a strong reputation among (not only) animation festivals — further to SVOD platforms and later also into theatrical distribution.
              </p>
              <p className="mb-4">
                The project timeline is intentionally set to get ahead of the WTF programme in Annecy, whose quality has been rapidly declining. The premiere of the programme should take place either before Annecy or directly during Annecy.
              </p>
              <p className="mb-4">
                The ideal festivals for a world premiere would be Anifilm (05/2026) or Animafest Zagreb (06/2026).
              </p>
              <p className="mb-4">
                Before launching the programme in 2026, it is necessary to begin media activities so that by March 2026 it is already known that the programme is in preparation, which titles it will include, and so that festivals and other interested partners can place their bookings.
              </p>
            </div>
          </div>

          {/* About Sébastien Sperer */}
          <div className="mt-16">
            <h2 className="font-garamond text-[35px] text-[#222] mb-4 font-bold">About Sébastien Sperer</h2>
            <div className="w-full h-[1px] bg-gray-300 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <img 
                  src={`${baseUrl}images/wtf_off/sebastien.jpeg`} 
                  alt="Sébastien Sperer" 
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="md:col-span-2 font-nunito text-[17px] text-[#222] text-justify">
                <p className="mb-4">
                  Sébastien Sperer has been a long-time programmer and curator at the Annecy Festival. Since 1999, he has worked in many roles — as a selector, moderator, juror, planner, and programme curator.
                </p>
                <p className="mb-4">
                  In 2017, he created the WTF section and is now doing the programme together with Gala Frécon. The idea was to carve out a special evening slot for films that "don't fit anywhere else," but that are striking, daring and highly original.
                </p>
                <p className="mb-4">
                  His motivation is to showcase animation in all its diversity and to highlight the fact that animation as a medium can do anything — without filters or limitations.
                </p>
                <p>
                  Under his curatorship, WTF has become a space for the boldest voices in contemporary animation.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="font-nunito text-[17px] text-[#222] mb-6">Interested in learning more or partnering with us?</p>
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition-colors duration-300"
            >
              <a href="/#about">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WtfOff;

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Workshops = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-12 sm:py-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
          <h1 className="font-serif text-[#222] text-[1.5em] sm:text-[2em] lg:text-[3em] mb-4">Workshops</h1>
          <hr className="border-gray-300 mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify text-[1.05rem]">
              <h2 className="font-serif text-[1.5em] mb-4">Festival Distribution & Strategy</h2>
              <p className="mb-4">Our workshops are designed for filmmakers, students, and cultural professionals who want to master the art of festival distribution. We cover everything from selecting the right festivals to preparing compelling promotional materials and navigating the entire festival lifecycle.</p>
              <p className="mb-4">Through interactive sessions and practical exercises, participants gain insider knowledge about:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Festival research and selection strategies</li>
                <li>Preparing submission materials and promotional assets</li>
                <li>Understanding premiere policies and festival calendars</li>
                <li>Maximizing festival presence and networking opportunities</li>
              </ul>
            </div>
            
            <div className="text-justify text-[1.05rem]">
              <h2 className="font-serif text-[1.5em] mb-4">Practical Approach</h2>
              <p className="mb-4">Each workshop is tailored to the specific needs of the institution or group, combining theoretical knowledge with hands-on practice. Participants work with real case studies and receive actionable feedback on their projects.</p>
              <p className="mb-4">We offer workshops in various formats:</p>
              <ul className="list-disc ml-6 space-y-2 mb-4">
                <li>Half-day intensive sessions</li>
                <li>Full-day comprehensive workshops</li>
                <li>Multi-session programs for deeper learning</li>
                <li>Online and in-person formats available</li>
              </ul>
              <p>Drawing from Alexandra's extensive experience in film distribution and her work with FAMUfilms.cz, these workshops provide valuable insights that can immediately be applied to your film projects.</p>
            </div>
          </div>
          
          {/* Workshop Images Gallery */}
          <div className="mt-12">
            <h2 className="font-serif text-[1.5em] mb-6 text-center">Workshop Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <img 
                src="/images/worksphops/IMG_6555.HEIC" 
                alt="Workshop session 1" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
              <img 
                src="/images/worksphops/IMG_6556.HEIC" 
                alt="Workshop session 2" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
              <img 
                src="/images/worksphops/IMG_6558.HEIC" 
                alt="Workshop session 3" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
              <img 
                src="/images/worksphops/IMG_6578.HEIC" 
                alt="Workshop session 4" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
              <img 
                src="/images/worksphops/IMG_6579.HEIC" 
                alt="Workshop session 5" 
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[1.05rem] text-[#222] mb-6">Interested in organizing a workshop for your institution or group?</p>
            <Button asChild variant="dark" size="lg" className="text-base font-bold">
              <a href="/#about">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Workshops;

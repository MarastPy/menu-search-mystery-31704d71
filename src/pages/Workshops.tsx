import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

const baseUrl = import.meta.env.BASE_URL;

const workshopImages = [
  `${baseUrl}images/worksphops/IMG_6555.jpg`,
  `${baseUrl}images/worksphops/IMG_6556.jpg`,
  `${baseUrl}images/worksphops/IMG_6558.jpg`,
  `${baseUrl}images/worksphops/IMG_6578.jpg`,
  `${baseUrl}images/worksphops/IMG_6579.jpg`,
];

const Workshops = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev === 0 ? workshopImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === null ? null : prev === workshopImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-12 sm:py-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
          <h1 className="font-garamond text-[45px] text-[#222] mb-4 font-bold">Workshops</h1>
          <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify font-nunito text-[17px]">
              <h2 className="font-nunito text-[1.5em] mb-4 font-bold">Festival Distribution & Strategy</h2>
              <p className="mb-4">Our workshops are designed for filmmakers, students, and cultural professionals who want to master the art of festival distribution. We cover everything from selecting the right festivals to preparing compelling promotional materials and navigating the entire festival lifecycle.</p>
              <p className="mb-4">Through interactive sessions and practical exercises, participants gain insider knowledge about:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Festival research and selection strategies</li>
                <li>Preparing submission materials and promotional assets</li>
                <li>Understanding premiere policies and festival calendars</li>
                <li>Maximizing festival presence and networking opportunities</li>
              </ul>
            </div>
            
            <div className="text-justify font-nunito text-[17px]">
              <h2 className="font-nunito text-[1.5em] mb-4 font-bold">Practical Approach</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshopImages.map((src, index) => (
                <div
                  key={index}
                  className="cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={src} 
                    alt={`Workshop session ${index + 1}`} 
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="font-nunito text-[17px] text-[#222] mb-6">Interested in organizing a workshop for your institution or group?</p>
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
      
      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {selectedImageIndex !== null && workshopImages[selectedImageIndex] && (
              <>
                <img
                  src={workshopImages[selectedImageIndex]}
                  alt={`Workshop - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain"
                />

                {/* Navigation buttons */}
                {workshopImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                      {selectedImageIndex + 1} / {workshopImages.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Workshops;

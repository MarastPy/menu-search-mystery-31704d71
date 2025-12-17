export const Services = () => {
  return (
    <>
      <section className="py-12 sm:py-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h1 className="font-garamond text-[45px] text-[#222] mb-4 text-left font-bold">For Independent Filmmakers:<br />Take Your Film to the World</h1>
          <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify font-nunito text-[17px]">
              <p className="mb-4">Are you an independent filmmaker looking to bring your film to the attention of global audiences? At CINEFILA, we specialize in creating personalized festival and distribution strategies to ensure your work receives the recognition it deserves.</p>
              <p className="mb-4">Drawing on years of experience and a proven track record, we offer:</p>
              <ul className="list-disc space-y-2 ml-5">
                <li className="mb-2"><strong>Tailored Festival Strategies:</strong> From identifying the most suitable festivals to planning your film's journey through the global circuit, we help you maximize exposure.</li>
                <li className="mb-2"><strong>Marketing and Communication Support:</strong> We craft compelling marketing materials to highlight your film's unique strengths, ensuring it resonates with audiences and industry professionals alike.</li>
                <li className="mb-2"><strong>Distribution and Business Strategies:</strong> Beyond festivals, we guide your film toward broader markets and platforms, building a sustainable path for its success.</li>
              </ul>
            </div>
            <div className="text-justify font-nunito text-[17px]">
              <p className="mb-4">We work with films starting in the development or post-production phase, acting as your project's first promoter. Our mission is to unleash your film's full potential and ensure it reaches the widest possible audience.</p>
              <p className="mb-4">As part of our services, we handle logistics such as material shipping and represent your film at prestigious festivals and markets worldwide.</p>
              <p>CINEFILA is here to help your film shine, giving independent filmmakers a powerful platform to tell their stories and connect with audiences across the globe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-[90px] bg-[#f0f2f5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h1 className="font-garamond text-[45px] text-[#222] mb-4 text-left font-bold">For Festivals &amp; Cinemas</h1>
          <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify font-nunito text-[17px]">
              <p className="mb-4">CINEFILA offers a carefully curated catalog of films, featuring exceptional works by emerging talents with innovative storytelling approaches and unforgettable narratives. Our selection includes films that leave a lasting impression, perfect for elevating festival programs.</p>
            </div>
            <div className="text-justify font-nunito text-[17px]">
              <p className="mb-4">We collaborate with festivals to provide tailor-made curated selections, customized to suit various age groups and thematic focuses. Whether you're seeking thought-provoking shorts, groundbreaking animations, or films that resonate with younger audiences, CINEFILA is your trusted partner in discovering cinematic gems that will captivate your audience and enrich your festival lineup.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h1 className="font-garamond text-[45px] text-[#222] mb-4 text-left font-bold">For Film Schools &amp; Institutions</h1>
          <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify font-nunito text-[17px]">
              <p className="mb-4">CINEFILA supports academic institutions by hosting workshops, and offering lectures on festival distribution and festival strategies. Learn how to craft a festival strategy for your film. Discover how to choose the right festivals, prepare for promotion, and navigate your film's festival lifecycle. Get insider tips, tricks, and practical advice to maximize your film's potential.</p>
              <p className="mb-4">Building on Alexandra's success with FAMUfilms.cz, the first European SVOD platform for film schools, we aim to inspire and educate the next generation of filmmakers and scholars.</p>
            </div>
            <div className="flex items-start justify-center">
              <img 
                src="/images/homepage/alex_berlinale.JPG" 
                alt="Alexandra at Berlinale" 
                className="w-full max-w-md rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-[90px] bg-[#f0f2f5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h1 className="font-garamond text-[45px] text-[#222] mb-4 text-left font-bold">Workshops</h1>
          <div className="w-full h-[2px] bg-gray-400 mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify font-nunito text-[17px]">
              <p className="mb-4">CINEFILA supports academic and cultural organisations through workshops and lectures focused on festival distribution and strategy. Learn how to choose the right festivals, prepare materials for promotion, and navigate your film's entire festival lifecycle. Expect insider tips, practical advice, and actionable workflows that maximise a film's potential.</p>
            </div>
            <div className="text-justify font-nunito text-[17px]">
              <p className="mb-4">We offer specialized workshops and lectures on festival distribution strategies, helping filmmakers and institutions navigate the complex world of film festivals. Our sessions combine insider knowledge with practical, actionable advice.</p>
              <p className="mb-4">Learn how to select festivals, prepare promotional materials, and maximize your film's festival journey through hands-on sessions tailored to your needs.</p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="/workshops" 
              className="inline-block py-3 px-8 rounded-sm transition-all duration-300 font-nunito text-[17px] font-medium border border-[#1c1c1c] bg-transparent text-[#1c1c1c] hover:bg-[#1c1c1c] hover:text-white"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

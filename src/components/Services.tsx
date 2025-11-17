import { Button } from "@/components/ui/button";

export const Services = () => {
  return (
    <>
      <section className="py-12 sm:py-[90px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
          <h1 className="font-serif text-[#222] text-[1.5em] sm:text-[2em] lg:text-[3em] mb-4">For Independent Filmmakers:<br />Take Your Film to the World</h1>
          <div className="w-40 h-1 bg-primary mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify text-[1.05rem]">
              <p className="mb-4">Are you an independent filmmaker looking to bring your film to the attention of global audiences? At CINEFILA, we specialize in creating personalized festival and distribution strategies to ensure your work receives the recognition it deserves.</p>
              <ul className="list-none space-y-2 ml-0">
                <li className="mb-2"><strong>Tailored Festival Strategies:</strong> From identifying the most suitable festivals to planning your film's journey through the global circuit, we help you maximize exposure.</li>
                <li className="mb-2"><strong>Marketing and Communication Support:</strong> We craft compelling marketing materials to highlight your film's unique strengths, ensuring it resonates with audiences and industry professionals alike.</li>
                <li className="mb-2"><strong>Distribution and Business Strategies:</strong> Beyond festivals, we guide your film toward broader markets and platforms, building a sustainable path for its success.</li>
              </ul>
            </div>
            <div className="text-justify text-[1.05rem]">
              <p className="mb-4">We work with films starting in the development or post-production phase, acting as your project's first promoter. Our mission is to unleash your film's full potential and ensure it reaches the widest possible audience.</p>
              <p className="mb-4">As part of our services, we handle logistics such as material shipping and represent your film at prestigious festivals and markets worldwide.</p>
              <p>CINEFILA is here to help your film shine, giving independent filmmakers a powerful platform to tell their stories and connect with audiences across the globe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-[90px] bg-[#f0f2f5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
          <h1 className="font-serif text-[#222] text-[1.5em] sm:text-[2em] lg:text-[3em] mb-4">For Festivals &amp; Cinemas</h1>
          <div className="w-40 h-1 bg-primary mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify text-[1.05rem]">
              <p className="mb-4">Curate stronger line-ups with a catalogue focused on bold voices and award-winning student and independent films. We help you build cohesive strands that engage audiences and fit your programming goals — from family shorts and animation showcases to issue-driven selections and emerging-talent spotlights.</p>
              <ul className="list-none space-y-2 ml-0">
                <li className="mb-2"><strong>Curated Selections:</strong> Ready-to-program packs (60–100 min) or bespoke strands by theme, age group, or format.</li>
                <li className="mb-2"><strong>Premiere Positioning:</strong> Advice on regional/international premieres and timeline planning.</li>
                <li className="mb-2"><strong>Logistics &amp; Delivery:</strong> DCP/ProRes delivery, KDM coordination, subtitles, metadata &amp; tech sheets.</li>
                <li className="mb-2"><strong>Guests &amp; Q&amp;A:</strong> Talent coordination, intros, post-screening discussions.</li>
                <li className="mb-2"><strong>Marketing Toolkits:</strong> Stills, trailers, synopses, press notes, social copy, and assets localized on request.</li>
              </ul>
            </div>
            <div className="text-justify text-[1.05rem]">
              <p className="mb-4">Whether you're filling a single slot or designing a multi-day focus, we'll align curation, rights, and operations so your programme runs smoothly and lands with impact.</p>
              <p className="mb-4"><strong>Outcomes you can expect:</strong> higher attendance, easier ops, and a line-up that feels fresh yet audience-friendly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-[90px] bg-[#f0f2f5]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-[2cm]">
          <h1 className="font-serif text-[#222] text-[1.5em] sm:text-[2em] lg:text-[3em] mb-4">For Film Schools &amp; Institutions</h1>
          <div className="w-40 h-1 bg-primary mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 text-[#222]">
            <div className="text-justify text-[1.05rem]">
              <p className="mb-4">CINEFILA supports academic and cultural organisations through workshops and lectures focused on festival distribution and strategy. Learn how to choose the right festivals, prepare materials for promotion, and navigate your film's entire festival lifecycle. Expect insider tips, practical advice, and actionable workflows that maximise a film's potential.</p>
              <p>Building on Alexandra's experience with FAMUfilms.cz, the first European SVOD platform dedicated to film schools, we aim to inspire and educate the next generation of filmmakers and scholars.</p>
            </div>
            <div className="text-justify text-[1.05rem]">
              <p className="mb-4">For film institutions, we provide comprehensive festival distribution services so your films reach the right audiences and receive the recognition they deserve. We tailor strategies to institutional needs, including curation, positioning, and long-term planning.</p>
              <p>Our expertise in logistics, marketing, and communications ensures your films are presented in the best possible light—connecting them with festivals, markets, and viewers worldwide.</p>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-10 mt-10">
            <h2 className="font-serif text-[#222] text-[1.5em] sm:text-[2em] mb-4">Workshops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-[#222]">
              <div className="text-justify text-[1.05rem]">
                <p className="mb-4">We offer specialized workshops and lectures on festival distribution strategies, helping filmmakers and institutions navigate the complex world of film festivals. Our sessions combine insider knowledge with practical, actionable advice.</p>
              </div>
              <div className="text-justify text-[1.05rem]">
                <p className="mb-4">Learn how to select festivals, prepare promotional materials, and maximize your film's festival journey through hands-on sessions tailored to your needs.</p>
                <Button asChild variant="dark" size="lg" className="text-base font-bold">
                  <a href="/workshops">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

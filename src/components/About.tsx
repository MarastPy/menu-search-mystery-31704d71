const teamMembers = [
  {
    name: "ALEXANDRA HRONCOVÁ",
    role: "Founder and director",
    email: "alex@cinefila.cz",
    image: "/images/contacts/Alex/Alex.jpg",
    bio: [
      "A film distribution manager and festival strategist based in Prague. Thanks to her work, hundreds of short films have reached festivals, including the most prestigious ones such as Cannes, Berlinale, Annecy, Clermont-Ferrand, Sundance, Toronto, Tribeca, Vision du Réel, and the Academy Awards.",
      "For eight years, she has been helping independent filmmakers, young talents, production companies, and students with festival distribution and the global circuit. She curates tailor-made festival strategies, target market research, handles all logistics from submissions to distribution and PR/marketing campaigns, and maximizes the visibility of films at the events."
    ]
  },
  {
    name: "AMIRA SHEHATOVÁ",
    role: "Submissions and sales coordinator",
    email: "amira@cinefila.cz",
    image: "/images/contacts/Amira/Amira_Shehatova.jpg",
    bio: [
      "Amira studied Film History and Audiovisual Culture, as well as Personnel Management at Charles University in Prague. She strives to blend those two disciplines and alternates between them in her professional endeavors.",
      "Currently, Amira is part of the CINEFILA festival distribution team, where she is responsible for film submissions and material shipping."
    ]
  },
  {
    name: "MAREK KOUTEŠ",
    role: "Film Curator and Student Film Specialist",
    email: "marek@cinefila.cz",
    image: "/images/contacts/Marek/Marek.jpg",
    bio: [
      "Marek is a graduate of the Department of Film Studies at Charles University in Prague. As a film critic and reviewer, he has contributed to cultural sections of Czech Television, Aktualne.cz, Moviescreen.cz, and the magazine Film a doba.",
      "At CINEFILA, he is involved in the curatorial selection of films for the catalogue, with a particular focus on student films."
    ]
  }
];

export const About = () => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-20">
          <h1 className="font-serif text-[#1c1c1c] text-5xl sm:text-6xl lg:text-7xl mb-3 font-light tracking-tight text-left">
            About us & contacts
          </h1>
          <div className="w-40 h-1 bg-border mb-12"></div>
        </div>
        
        <div className="space-y-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group animate-fade-in"
            >
              <div className="flex flex-col sm:flex-row gap-8 lg:gap-12 pb-16 border-b border-gray-100 last:border-b-0">
                <div className="flex-shrink-0 w-full sm:w-[180px]">
                  <div className="relative w-[180px] h-[180px] mx-auto sm:mx-0 overflow-hidden rounded-full mb-6 ring-1 ring-gray-200 transition-all duration-300 group-hover:ring-[#1c1c1c]">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        console.error(`Failed to load image: ${member.image}`);
                        e.currentTarget.src = '/images/contacts/Alex/Alex.jpg';
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex-grow space-y-5 text-center sm:text-left">
                  <div>
                    <h3 className="text-[#1c1c1c] text-xl sm:text-2xl font-bold uppercase font-serif tracking-wide mb-2 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[#666] text-base sm:text-lg italic mb-4 font-light tracking-wide">{member.role}</p>
                    <a 
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center justify-center sm:justify-start gap-2 text-[#1c1c1c] hover:text-[#666] transition-all duration-300 text-sm group/link"
                    >
                      <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#1c1c1c] after:transition-all after:duration-300 group-hover/link:after:w-full">
                        {member.email}
                      </span>
                    </a>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    {member.bio.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-[#2c2c2c] text-base leading-relaxed text-justify font-light">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
    <section id="about" className="py-20 sm:py-32 bg-white">
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-20">
          <h1 className="font-serif text-[#1c1c1c] text-[2.8em] sm:text-[3.5em] lg:text-[4em] mb-6 font-bold leading-tight">
            About us & contacts
          </h1>
          <div className="w-24 h-0.5 bg-[#1c1c1c]"></div>
        </div>
        
        <div className="space-y-20">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="group"
            >
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 pb-16 border-b border-gray-200 last:border-b-0">
                <div className="flex-shrink-0 w-full lg:w-[320px]">
                  <div className="relative overflow-hidden rounded-sm mb-8">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        console.error(`Failed to load image: ${member.image}`);
                        e.currentTarget.src = '/images/contacts/Alex/Alex.jpg';
                      }}
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-[#1c1c1c] text-[1.5rem] font-bold uppercase font-serif tracking-wider leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[#666] text-[1.05rem] italic font-light">{member.role}</p>
                    <div className="pt-2">
                      <a 
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-[#1c1c1c] hover:text-[#666] transition-colors duration-300 text-[0.95rem] border-b border-transparent hover:border-[#1c1c1c]"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow lg:pt-2">
                  <div className="space-y-5">
                    {member.bio.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-[#1c1c1c] text-[1.08rem] leading-[1.8] text-justify font-light">
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

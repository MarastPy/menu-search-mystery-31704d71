const teamMembers = [
  {
    name: "ALEXANDRA HRONCOVÁ",
    role: "Founder and director",
    email: "alex@cinefila.cz",
    image: "/images/contacts/Alex/Alex.png",
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
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-16">
          <h1 className="font-serif text-[#222] text-[2.5em] sm:text-[3em] lg:text-[3.5em] mb-4 font-bold">
            About us & contacts
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#222] to-transparent mx-auto"></div>
        </div>
        
        <div className="space-y-16">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row gap-8 p-8 lg:p-12">
                <div className="flex-shrink-0 w-full lg:w-[280px]">
                  <div className="relative group">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-auto object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300"
                      onError={(e) => {
                        console.error(`Failed to load image: ${member.image}`);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="mt-6 text-center lg:text-left">
                    <h3 className="text-[#1c1c1c] text-[1.4rem] mb-2 font-bold uppercase font-serif tracking-wide">
                      {member.name}
                    </h3>
                    <p className="text-[#666] text-[1rem] mb-4 italic">{member.role}</p>
                    <div className="flex items-center justify-center lg:justify-start gap-2 text-[#444]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a 
                        href={`mailto:${member.email}`}
                        className="hover:text-[#222] transition-colors duration-200 text-[.95rem]"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex-grow border-l-4 border-gray-200 pl-8">
                  <div className="space-y-4">
                    {member.bio.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-[#1c1c1c] text-[1.05rem] leading-relaxed text-justify">
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

const teamMembers = [
  {
    name: "ALEXANDRA HRONCOVÁ",
    role: "Founder and director",
    email: "alex@cinefila.cz",
    image: "/src/images/contacts/Alex/Alex.jpg",
    bio: [
      "A film distribution manager and festival strategist based in Prague. Thanks to her work, hundreds of short films have reached festivals, including the most prestigious ones such as Cannes, Berlinale, Annecy, Clermont-Ferrand, Sundance, Toronto, Tribeca, Vision du Réel, and the Academy Awards.",
      "For eight years, she has been helping independent filmmakers, young talents, production companies, and students with festival distribution and the global circuit. She curates tailor-made festival strategies, target market research, handles all logistics from submissions to distribution and PR/marketing campaigns, and maximizes the visibility of films at the events."
    ]
  },
  {
    name: "AMIRA SHEHATOVÁ",
    role: "Submissions and sales coordinator",
    email: "amira@cinefila.cz",
    image: "/src/images/contacts/Amira/Amira_Shehatova.jpg",
    bio: [
      "Amira studied Film History and Audiovisual Culture, as well as Personnel Management at Charles University in Prague. She strives to blend those two disciplines and alternates between them in her professional endeavors.",
      "Currently, Amira is part of the CINEFILA festival distribution team, where she is responsible for film submissions and material shipping."
    ]
  },
  {
    name: "MAREK KOUTEŠ",
    role: "Film Curator and Student Film Specialist",
    email: "marek@cinefila.cz",
    image: "/src/images/contacts/Marek/Marek.jpg",
    bio: [
      "Marek is a graduate of the Department of Film Studies at Charles University in Prague. As a film critic and reviewer, he has contributed to cultural sections of Czech Television, Aktualne.cz, Moviescreen.cz, and the magazine Film a doba.",
      "At CINEFILA, he is involved in the curatorial selection of films for the catalogue, with a particular focus on student films."
    ]
  }
];

export const About = () => {
  return (
    <section id="about" className="py-[90px] bg-white">
      <div className="max-w-[1200px] mx-auto px-[2cm]">
        <h1 className="font-serif text-[#222] text-[3em] mb-4">About us & contacts</h1>
        <hr className="border-gray-300 mb-12" />
        
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="flex gap-10 mb-12 pb-8 border-b border-gray-200 last:border-b-0 last:pb-0 last:mb-0 items-start"
            >
              <div className="flex-shrink-0 w-[220px] text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-auto rounded-md object-cover mb-5"
                />
                <h3 className="text-[#1c1c1c] text-[1.2rem] mb-2 font-bold uppercase font-serif">
                  {member.name}
                </h3>
                <p className="text-[#666] text-[.95rem]">{member.role}</p>
              </div>
              
              <div className="flex-shrink-0 w-[250px] text-center pt-5">
                <h3 className="text-[#1c1c1c] my-0 mb-1 font-serif">{member.name}</h3>
                <hr className="border-gray-300 my-4" />
                <p className="text-[#444] italic text-[.95rem] text-center">Mail: {member.email}</p>
              </div>
              
              <div className="flex-grow text-justify">
                {member.bio.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[#1c1c1c] mb-5 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

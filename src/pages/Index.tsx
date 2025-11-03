import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { News } from "@/components/News";
import { Catalogue } from "@/components/Catalogue";
import { Services } from "@/components/Services";
import { About } from "@/components/About";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <News />
      <Catalogue />
      <Services />
      <About />
    </div>
  );
};

export default Index;

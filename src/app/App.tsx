import React from 'react';
import { AtmosphericBackground } from '../components/ui/AtmosphericBackground.tsx';
import { Navbar } from '../components/Navbar.tsx';
import { Hero } from '../components/Hero.tsx';
import { BrandStory } from '../components/BrandStory.tsx';
import { ExploreConcepts } from '../components/ExploreConcepts.tsx';
import { SelectedWorks } from '../components/SelectedWorks.tsx';
import { Lookbook } from '../components/Lookbook.tsx';
import { Packages } from '../components/Packages.tsx';
import { Closing } from '../components/Closing.tsx';
import { Footer } from '../components/Footer.tsx';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2A2523] selection:bg-[#EAC8BF] selection:text-[#2A2523]">
      {/* Global Ambient Atmospheric Background */}
      <AtmosphericBackground />

      {/* Editorial Header Navigation */}
      <Navbar />

      {/* Main Single Page Editorial Experience */}
      <main>
        {/* 01. Hero — Enter the Frame */}
        <Hero />

        {/* 02. Brand Story — Every Version of You */}
        <BrandStory />

        {/* 03. Explore Concepts — Choose Your Mood */}
        <ExploreConcepts />

        {/* 04. Selected Works — Frames in Motion */}
        <SelectedWorks />

        {/* 05. Editorial Lookbook — The Feminine Archive */}
        <Lookbook />

        {/* 06. Packages — The Art of the Experience */}
        <Packages />

        {/* 07. Closing — Your Story Starts Here */}
        <Closing />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;

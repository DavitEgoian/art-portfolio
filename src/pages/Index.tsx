import { Search, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { FloatingIcon } from "@/components/FloatingIcon";
import { PortfolioCard } from "@/components/PortfolioCard";
import project1 from "@/assets/project-1.jpg?w=900&format=webp&quality=80&as=src&imagetools";
import project2 from "@/assets/project-2.jpg?w=900&format=webp&quality=80&as=src&imagetools";
import project3 from "@/assets/project-3.jpg?w=900&format=webp&quality=80&as=src&imagetools";
import project4 from "@/assets/project-4.jpg?w=900&format=webp&quality=80&as=src&imagetools";
import project5 from "@/assets/project-5.jpg?w=900&format=webp&quality=80&as=src&imagetools";
import project6 from "@/assets/project-6.jpg?w=900&format=webp&quality=80&as=src&imagetools";
import profilePhoto from "@/assets/profile-photo.jpg?w=400&format=webp&quality=80&as=src&imagetools";

import macosFolder from "@/assets/folder-icon.png?w=96&format=webp&as=src&imagetools";
import macosFolderSmall from "@/assets/folder-icon.png?w=96&format=webp&as=src&imagetools";
import trashIconSmall from "@/assets/trash-icon.png?w=96&format=webp&as=src&imagetools";
import safariBrowserSmall from "@/assets/safari-browser.png?w=96&format=webp&as=src&imagetools";
import photoboothIconSmall from "@/assets/photo-booth.png?w=96&format=webp&as=src&imagetools";
import figmaIconSmall from "@/assets/figma-icon.png?w=96&format=webp&as=src&imagetools";
import pdfIconSmall from "@/assets/pdf-icon.png?w=96&format=webp&as=src&imagetools";
import adobeInDesignSmall from "@/assets/adobe-InDesign.png?w=96&format=webp&as=src&imagetools";
import adobePremiereProSmall from "@/assets/adobe-premiere-pro.png?w=96&format=webp&as=src&imagetools";
import adobeIllustratorSmall from "@/assets/adobe-illustrator.png?w=96&format=webp&as=src&imagetools";
import adobePhotoshopSmall from "@/assets/adobe-photoshop.png?w=96&format=webp&as=src&imagetools";
import spotifyLogoSmall from "@/assets/spotify-logo.png?w=96&format=webp&as=src&imagetools";

import project1Small from "@/assets/project-1.jpg?w=96&format=webp&as=src&imagetools";
import project2Small from "@/assets/project-2.jpg?w=96&format=webp&as=src&imagetools";

const Index = () => {
  const cardSizeClass =
    "h-[520px] sm:h-[420px] md:h-[520px] lg:h-[600px] w-full max-w-full md:max-w-[440px] mx-auto";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center px-4 pt-32 pb-56 md:pb-64 overflow-hidden">
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left side icons */}
          <FloatingIcon 
            icon={macosFolderSmall}
            alt="Folder"
            className="top-[8%] left-[8%]"
            delay="normal"
            loading="eager"
          />
          <FloatingIcon 
            icon={adobeIllustratorSmall}
            alt="Adobe Illustrator"
            className="hidden min-[550px]:block top-[18%] left-[15%]"
            delay="delayed"
            loading="eager"
            strongGlow
          />
          <FloatingIcon 
            icon={adobePhotoshopSmall}
            alt="Adobe Photoshop"
            className="hidden min-[850px]:block top-[35%] left-[5%]"
            delay="slow"
            loading="eager"
            strongGlow
          />
          <FloatingIcon 
            icon={macosFolderSmall}
            alt="Projects Folder"
            label="poster_collection"
            className="hidden min-[1150px]:block top-[52%] left-[12%]"
            delay="delayed"
            loading="eager"
          />
          <FloatingIcon 
            icon={spotifyLogoSmall}
            alt="Spotify"
            className="top-[75%] md:top-[70%] left-[18%]"
            delay="normal"
            loading="eager"
          />
          <FloatingIcon 
            icon={safariBrowserSmall}
            alt="Safari"
            className="hidden top-[78%] md:top-[85%] left-[8%]"
            delay="slow"
            loading="eager"
          />
          
          {/* Icons above the text */}
          <FloatingIcon 
            icon={trashIconSmall}
            alt="Trash"
            className="hidden md:block top-[12%] left-[35%]"
            delay="normal"
            loading="eager"
          />
          <FloatingIcon 
            icon={adobePremiereProSmall}
            alt="Premiere Pro"
            className="top-[10%] right-[45%]"
            delay="slow"
            loading="eager"
            strongGlow
          />
          
          {/* Icons below the text */}
          <FloatingIcon 
            icon={macosFolderSmall}
            alt="Photo Folder"
            className="hidden md:block top-[75%] left-[38%]"
            delay="normal"
            loading="eager"
          />
          <FloatingIcon 
            icon={pdfIconSmall}
            alt="PDF Logo"
            className="hidden min-[550px]:block top-[82%] right-[40%]"
            delay="delayed"
            loading="eager"
          />
          
          {/* Right side icons */}

          <FloatingIcon 
            icon={macosFolderSmall}
            alt="Folder"
            label="projectssssss"
            className="hidden md:block top-[8%] right-[18%]"
            delay="normal"
            loading="eager"
          />
          <FloatingIcon 
            icon={photoboothIconSmall}
            alt="Photobooth"
            className="top-[5%] right-[8%]"
            delay="delayed"
            loading="eager"
            strongGlow
          />
          <FloatingIcon 
            icon={figmaIconSmall}
            alt="Graphics Folder"
            className="hidden min-[1300px]:block top-[40%] right-[15%]"
            delay="slow"
            loading="eager"
            strongGlow
          />
          <FloatingIcon 
            icon={adobeInDesignSmall}
            alt="InDesign"
            className="top-[65%] md:top-[60%] right-[8%]"
            delay="normal"
            loading="eager"
            strongGlow
          />

          <FloatingIcon 
            icon={project2Small}
            alt="project preview"
            label="qari.jpg"
            className="top-[78%] md:top-[75%] right-[25%]"
            delay="normal"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h1 className="text-[3.25rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8.4rem] leading-tight md:leading-[0.95] font-light mb-4 tracking-tight px-2">
            hi! welcome to<br />my showcase
          </h1>
          <p className="text-[1.5rem] sm:text-[1.9rem] md:text-[2.625rem] text-muted-foreground font-light">
            ( 2025 )
          </p>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-8">
          <PortfolioCard 
            image={project1}
            alt="Creative workspace flat lay"
            className={cardSizeClass}
          />
          <PortfolioCard 
            image={project2}
            alt="Mountain landscape poster"
            className={cardSizeClass}
          />
        </div>

        <div className="flex items-center justify-center text-foreground mb-32">
          <div className="relative w-14 h-14 mr-3">
            <img src={macosFolder} alt="" className="absolute inset-0 w-full h-full object-contain blur-xl opacity-60 scale-125" aria-hidden="true" />
            <img src={macosFolder} alt="Folder" className="relative z-10 w-full h-full object-contain" />
          </div>
          <span className="text-xl">_poster_collections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-8">
          <PortfolioCard 
            image={project3}
            alt="Movies poster design"
            className={cardSizeClass}
          />
          <PortfolioCard 
            image={project4}
            alt="Abstract blue dots artwork"
            className={cardSizeClass}
          />
        </div>

        <div className="flex items-center justify-center text-foreground mb-32">
          <div className="relative w-14 h-14 mr-3">
            <img src={macosFolder} alt="" className="absolute inset-0 w-full h-full object-contain blur-xl opacity-60 scale-125" aria-hidden="true" />
            <img src={macosFolder} alt="Folder" className="relative z-10 w-full h-full object-contain" />
          </div>
          <span className="text-xl">_poster_collections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-8">
          <PortfolioCard 
            image={project5}
            alt="Polina typographic poster"
            className={cardSizeClass}
          />
          <PortfolioCard 
            image={project6}
            alt="Typographic number design"
            className={cardSizeClass}
          />
        </div>

        <div className="flex items-center justify-center text-foreground mb-32">
          <div className="relative w-14 h-14 mr-3">
            <img src={macosFolder} alt="" className="absolute inset-0 w-full h-full object-contain blur-xl opacity-60 scale-125" aria-hidden="true" />
            <img src={macosFolder} alt="Folder" className="relative z-10 w-full h-full object-contain" />
          </div>
          <span className="text-xl">_poster_collections</span>
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative pt-0 pb-16 px-4 overflow-hidden">
        {/* More floating icons */}
        <div className="absolute inset-0 pointer-events-none z-0 max-[850px]:hidden">
          {/* Top left icons */}
          <FloatingIcon 
            icon={macosFolderSmall}
            alt="Folder"
            className="top-[5%] left-[6%]"
            delay="normal"
          />
          <FloatingIcon 
            icon={adobeIllustratorSmall}
            alt="Adobe Illustrator"
            className="top-[18%] left-[18%]"
            delay="delayed"
            strongGlow
          />
          
          {/* Top right icons */}
          <FloatingIcon 
            icon={pdfIconSmall}
            alt="PDF Logo"
            className="top-[5%] right-[6%]"
            delay="delayed"
          />
          <FloatingIcon 
            icon={figmaIconSmall}
            alt="Figma"
            className="top-[30%] right-[16%]"
            delay="normal"
            strongGlow
          />
          
          {/* Left side icons */}
          <FloatingIcon 
            icon={adobePhotoshopSmall}
            alt="Adobe Photoshop"
            className="top-[35%] left-[6%]"
            delay="slow"
            strongGlow
          />
          <FloatingIcon 
            icon={macosFolderSmall}
            alt="Projects Folder"
            className="top-[55%] left-[10%]"
            delay="delayed"
          />
          <FloatingIcon 
            icon={safariBrowserSmall}
            alt="Safari"
            className="bottom-[12%] left-[5%]"
            delay="normal"
          />
          
          {/* Right side icons */}
          <FloatingIcon 
            icon={adobePremiereProSmall}
            alt="Premiere Pro"
            className="top-[55%] right-[6%]"
            delay="slow"
            strongGlow
          />
          
          {/* Bottom icons */}
          <FloatingIcon 
            icon={spotifyLogoSmall}
            alt="Spotify"
            className="top-[70%] right-[20%]"
            delay="normal"
          />
        </div>

        {/* Browser Mockup */}
        <div className="max-w-2xl w-full mx-auto relative z-10 px-2 sm:px-0">
          <div className="bg-card rounded-lg overflow-hidden shadow-2xl border border-border">
            {/* Browser Chrome */}
            <div className="bg-secondary px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap items-center gap-3 border-b border-border">
              <div className="flex gap-2 order-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-0 sm:ml-2 order-2 max-[460px]:ml-auto">
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 min-w-[140px] mx-0 sm:mx-2 order-3 max-[460px]:basis-full">
                <button
                  className="bg-white rounded-lg px-3 py-1.5 text-xs sm:text-sm text-black flex items-center gap-2 w-full text-left hover:bg-gray-100 transition-colors"
                  onClick={() =>
                    window.open("https://www.behance.net/dedgrl", "_blank", "noopener,noreferrer")
                  }
                  type="button"
                >
                  <Search className="w-4 h-4 text-gray-500" />
                  <span>https://www.behance.net/dedgrl</span>
                </button>
              </div>
            </div>

            {/* Browser Content */}
            <div className="bg-white p-6 sm:p-10 lg:p-16 text-center flex flex-col items-center justify-center gap-8 sm:gap-12 min-h-[420px]">
              <h2 className="text-5xl sm:text-5xl md:text-6xl font-semibold italic text-black">
                Thank You<br />for Attention
              </h2>
              <div className="flex justify-center">
                <img 
                  src={profilePhoto} 
                  alt="Meow" 
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-none object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

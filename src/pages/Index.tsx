import { Chrome } from "lucide-react";
import { FloatingIcon } from "@/components/FloatingIcon";
import { PortfolioCard } from "@/components/PortfolioCard";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";
import macosFolder from "@/assets/macos-folder.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left side icons */}
          <FloatingIcon 
            icon={macosFolder}
            alt="Folder"
            className="top-12 left-12"
            size={64}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
            alt="Adobe Illustrator"
            className="top-24 left-20"
            size={56}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
            alt="Adobe Photoshop"
            className="top-[20%] left-8"
            size={56}
            delay="slow"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Projects Folder"
            className="top-[35%] left-16"
            size={56}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="top-[50%] left-24"
            size={52}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/5/59/Safari_browser_logo.svg"
            alt="Safari"
            className="top-[65%] left-12"
            size={52}
            delay="slow"
          />
          
          {/* Right side icons */}
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
            alt="Figma"
            className="top-16 right-16"
            size={56}
            delay="slow"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Folder"
            className="top-8 right-[25%]"
            size={60}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://cdn.iconscout.com/icon/free/png-256/free-pdf-file-icon-download-in-svg-png-gif-file-formats--document-logo-format-files-and-folders-pack-icons-1184337.png"
            alt="CV Document"
            className="top-4 right-[8%]"
            size={48}
            delay="delayed"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Graphics Folder"
            className="top-[30%] right-[18%]"
            size={58}
            delay="slow"
          />
          <FloatingIcon 
            icon="https://cdn.iconscout.com/icon/free/png-256/free-calendar-icon-download-in-svg-png-gif-file-formats--date-schedule-event-app-pack-user-interface-icons-1184335.png"
            alt="Calendar"
            className="top-[15%] right-[5%]"
            size={52}
            delay="normal"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight">
            hi! welcome to<br />my showcase
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
            ( 2025 )
          </p>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PortfolioCard 
            image={project1}
            alt="Creative workspace flat lay"
            className="h-[400px]"
          />
          <PortfolioCard 
            image={project2}
            alt="Mountain landscape poster"
            className="h-[400px]"
          />
        </div>

        <div className="flex items-center justify-center gap-3 text-muted-foreground mb-12">
          <img src={macosFolder} alt="Folder" className="w-7 h-7" />
          <span className="text-lg">poster_collections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <PortfolioCard 
            image={project3}
            alt="Movies poster design"
            className="h-[400px]"
          />
          <PortfolioCard 
            image={project4}
            alt="Abstract blue dots artwork"
            className="h-[400px]"
          />
        </div>

        <div className="flex items-center justify-center gap-3 text-muted-foreground mb-12">
          <img src={macosFolder} alt="Folder" className="w-7 h-7" />
          <span className="text-lg">poster_collections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PortfolioCard 
            image={project5}
            alt="Polina typographic poster"
            className="h-[400px]"
          />
          <PortfolioCard 
            image={project6}
            alt="Typographic number design"
            className="h-[400px]"
          />
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* More floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingIcon 
            icon={macosFolder}
            alt="Folder"
            className="bottom-24 left-12"
            size={56}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
            alt="Adobe Illustrator"
            className="bottom-[40%] left-20"
            size={52}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
            alt="Adobe Photoshop"
            className="bottom-[25%] left-[10%]"
            size={56}
            delay="slow"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
            alt="Figma"
            className="bottom-[35%] right-[8%]"
            size={56}
            delay="normal"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Projects Folder"
            className="bottom-[20%] left-[18%]"
            size={58}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://cdn.iconscout.com/icon/free/png-256/free-pdf-file-icon-download-in-svg-png-gif-file-formats--document-logo-format-files-and-folders-pack-icons-1184337.png"
            alt="CV Document"
            className="bottom-16 right-[12%]"
            size={48}
            delay="slow"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="bottom-[45%] left-[8%]"
            size={50}
            delay="normal"
          />
        </div>

        {/* Browser Mockup */}
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-card rounded-lg overflow-hidden shadow-2xl">
            {/* Browser Chrome */}
            <div className="bg-secondary px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-muted rounded px-4 py-1 text-sm text-muted-foreground flex items-center gap-2">
                  <Chrome className="w-4 h-4" />
                  <span>https://www.behance.net/polinakotryniak</span>
                </div>
              </div>
            </div>

            {/* Browser Content */}
            <div className="bg-background p-12 text-center">
              <h2 className="text-5xl md:text-6xl font-serif mb-8 italic">
                Thank You<br />for Attention
              </h2>
              <div className="flex justify-center mb-8">
                <img 
                  src={profilePhoto} 
                  alt="Polina Kotryniak" 
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
              <a 
                href="https://www.behance.net/polinakotryniak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline transition-all text-sm"
              >
                polina_01.jpg
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

import { Search, ChevronLeft, ChevronRight, Copy } from "lucide-react";
import { FloatingIcon } from "@/components/FloatingIcon";
import { PortfolioCard } from "@/components/PortfolioCard";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";
import macosFolder from "@/assets/macos-folder-transparent.png";

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
            className="top-[8%] left-[8%]"
            size={90}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
            alt="Adobe Illustrator"
            className="top-[18%] left-[15%]"
            size={85}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
            alt="Adobe Photoshop"
            className="top-[35%] left-[5%]"
            size={85}
            delay="slow"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Projects Folder"
            className="top-[52%] left-[12%]"
            size={85}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="top-[70%] left-[18%]"
            size={80}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://cdn-icons-png.flaticon.com/512/975/975645.png"
            alt="Safari"
            className="top-[85%] left-[8%]"
            size={80}
            delay="slow"
          />
          
          {/* Icons above the text */}
          <FloatingIcon 
            icon="https://img.icons8.com/fluency/512/trash.png"
            alt="Trash"
            className="top-[12%] left-[35%]"
            size={75}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://img.icons8.com/fluency/512/image.png"
            alt="Image File"
            className="top-[10%] right-[45%]"
            size={85}
            delay="slow"
          />
          
          {/* Icons below the text */}
          <FloatingIcon 
            icon={macosFolder}
            alt="Photo Folder"
            className="top-[75%] left-[38%]"
            size={80}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://img.icons8.com/fluency/512/calendar.png"
            alt="Notes"
            className="top-[82%] right-[40%]"
            size={75}
            delay="delayed"
          />
          
          {/* Right side icons */}
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
            alt="Figma"
            className="top-[18%] right-[5%]"
            size={90}
            delay="slow"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Folder"
            className="top-[8%] right-[18%]"
            size={95}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://cdn.iconscout.com/icon/free/png-256/free-pdf-file-icon-download-in-svg-png-gif-file-formats--document-logo-format-files-and-folders-pack-icons-1184337.png"
            alt="CV Document"
            className="top-[5%] right-[8%]"
            size={80}
            delay="delayed"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Graphics Folder"
            className="top-[40%] right-[15%]"
            size={90}
            delay="slow"
          />
          <FloatingIcon 
            icon="https://img.icons8.com/fluency/512/calendar.png"
            alt="Calendar"
            className="top-[60%] right-[8%]"
            size={80}
            delay="normal"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-[5.25rem] md:text-[8.4rem] leading-none font-light mb-4 tracking-tight">
            hi! welcome to<br />my showcase
          </h1>
          <p className="text-[2.1rem] md:text-[2.625rem] text-muted-foreground font-light">
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
            className="h-[700px]"
          />
          <PortfolioCard 
            image={project2}
            alt="Mountain landscape poster"
            className="h-[700px]"
          />
        </div>

        <div className="flex items-center justify-center text-foreground mb-32">
          <img src={macosFolder} alt="Folder" className="w-14 h-14" />
          <span className="text-xl">poster_collections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-8">
          <PortfolioCard 
            image={project3}
            alt="Movies poster design"
            className="h-[700px]"
          />
          <PortfolioCard 
            image={project4}
            alt="Abstract blue dots artwork"
            className="h-[700px]"
          />
        </div>

        <div className="flex items-center justify-center text-foreground mb-32">
          <img src={macosFolder} alt="Folder" className="w-14 h-14" />
          <span className="text-xl">poster_collections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-8">
          <PortfolioCard 
            image={project5}
            alt="Polina typographic poster"
            className="h-[700px]"
          />
          <PortfolioCard 
            image={project6}
            alt="Typographic number design"
            className="h-[700px]"
          />
        </div>

        <div className="flex items-center justify-center text-foreground mb-32">
          <img src={macosFolder} alt="Folder" className="w-14 h-14" />
          <span className="text-xl">poster_collections</span>
        </div>
      </section>

      {/* Footer Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* More floating icons */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top row icons - positioned much higher */}
          <FloatingIcon 
            icon={macosFolder}
            alt="Folder"
            className="top-[2%] left-[8%]"
            size={85}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
            alt="Adobe Illustrator"
            className="top-[3%] left-[22%]"
            size={80}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://img.icons8.com/fluency/512/trash.png"
            alt="Trash"
            className="top-[2%] left-[38%]"
            size={70}
            delay="slow"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
            alt="Figma"
            className="top-[3%] right-[22%]"
            size={90}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://cdn-icons-png.flaticon.com/512/337/337946.png"
            alt="CV Document"
            className="top-[2%] right-[8%]"
            size={75}
            delay="delayed"
          />
          {/* Side icons */}
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"
            alt="Adobe Photoshop"
            className="top-[55%] left-[3%]"
            size={85}
            delay="slow"
          />
          <FloatingIcon 
            icon={macosFolder}
            alt="Projects Folder"
            className="top-[40%] left-[18%]"
            size={90}
            delay="delayed"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
            alt="Spotify"
            className="top-[45%] right-[15%]"
            size={80}
            delay="normal"
          />
          {/* Bottom icons */}
          <FloatingIcon 
            icon={macosFolder}
            alt="Folder"
            className="bottom-[8%] left-[8%]"
            size={85}
            delay="normal"
          />
          <FloatingIcon 
            icon="https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"
            alt="Adobe Illustrator"
            className="bottom-[12%] left-[22%]"
            size={80}
            delay="delayed"
          />
        </div>

        {/* Browser Mockup */}
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bg-card rounded-lg overflow-hidden shadow-2xl">
            {/* Browser Chrome */}
            <div className="bg-secondary px-4 py-3 flex items-center gap-3 border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex gap-2 ml-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 mx-2">
                <div className="bg-white rounded-lg px-4 py-2 text-sm text-black flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <span>https://www.behance.net/polinakotryniak</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="w-5 h-5" />
              </button>
            </div>

            {/* Browser Content */}
            <div className="bg-white p-12 text-center">
              <h2 className="text-5xl md:text-6xl font-semibold italic text-black mb-8">
                Thank You<br />for Attention
              </h2>
              <div className="flex justify-center mb-8">
                <img 
                  src={profilePhoto} 
                  alt="Polina Kotryniak" 
                  className="w-40 h-40 rounded-none object-cover"
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

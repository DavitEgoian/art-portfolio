interface PortfolioCardProps {
  image: string;
  alt: string;
  className?: string;
}

export const PortfolioCard = ({ image, alt, className = "" }: PortfolioCardProps) => {
  return (
    <div className={`portfolio-card rounded-none overflow-hidden bg-card cursor-pointer ${className}`}>
      <img 
        src={image} 
        alt={alt} 
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

const ICON_SIZE = 80;

interface FloatingIconProps {
  icon: string;
  alt: string;
  className?: string;
  delay?: 'normal' | 'delayed' | 'slow';
}

export const FloatingIcon = ({ icon, alt, className = "", delay = 'normal' }: FloatingIconProps) => {
  const delayClass = {
    normal: 'floating-icon',
    delayed: 'floating-icon-delayed',
    slow: 'floating-icon-slow'
  }[delay];

  return (
    <div 
      className={`absolute ${delayClass} ${className}`}
      style={{ width: ICON_SIZE, height: ICON_SIZE }}
    >
      <img src={icon} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
};

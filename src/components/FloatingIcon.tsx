interface FloatingIconProps {
  icon: string;
  alt: string;
  size?: number;
  className?: string;
  delay?: 'normal' | 'delayed' | 'slow';
}

export const FloatingIcon = ({ icon, alt, size = 48, className = "", delay = 'normal' }: FloatingIconProps) => {
  const delayClass = {
    normal: 'floating-icon',
    delayed: 'floating-icon-delayed',
    slow: 'floating-icon-slow'
  }[delay];

  return (
    <div 
      className={`absolute opacity-80 ${delayClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={icon} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
};

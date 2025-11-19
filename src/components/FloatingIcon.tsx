const ICON_SIZE = 80;

interface FloatingIconProps {
  icon: string;
  alt: string;
  className?: string;
  delay?: 'normal' | 'delayed' | 'slow';
  loading?: "lazy" | "eager";
}

export const FloatingIcon = ({ icon, alt, className = "", delay = 'normal', loading = "lazy" }: FloatingIconProps) => {
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
      <img
        src={icon}
        alt={alt}
        loading={loading}
        decoding="async"
        width={ICON_SIZE}
        height={ICON_SIZE}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

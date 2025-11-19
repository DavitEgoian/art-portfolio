const ICON_SIZE = 80;

interface FloatingIconProps {
  icon: string;
  alt: string;
  className?: string;
  delay?: 'normal' | 'delayed' | 'slow';
  loading?: "lazy" | "eager";
  label?: string;
}

export const FloatingIcon = ({ icon, alt, className = "", delay = 'normal', loading = "lazy", label }: FloatingIconProps) => {
  const delayClass = {
    normal: 'floating-icon',
    delayed: 'floating-icon-delayed',
    slow: 'floating-icon-slow'
  }[delay];

  return (
    <div 
      className={`absolute ${delayClass} ${className} flex flex-col items-start gap-2`}
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
        {label && (
        <span className="text-[13px] font-sans text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-nowrap ml-0.5">

        {/* <span className="text-[13px] font-sans text-white font-light tracking-wide text-left whitespace-nowrap whitespace-nowrapwhitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] bg-black/20 px-2 rounded backdrop-blur-[2px] -ml-1.5"> */}
          {label}
        </span>
      )}
    </div>
  );
};

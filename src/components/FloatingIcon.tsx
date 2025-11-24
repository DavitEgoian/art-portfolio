const ICON_SIZE = 80;

interface FloatingIconProps {
  icon: string;
  alt: string;
  className?: string;
  delay?: 'normal' | 'delayed' | 'slow';
  loading?: "lazy" | "eager";
  label?: string;
  strongGlow?: boolean;
}

export const FloatingIcon = ({ icon, alt, className = "", delay = 'normal', loading = "lazy", label, strongGlow = false }: FloatingIconProps) => {
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
        alt=""
        className={`absolute inset-0 w-full h-full object-contain blur-lg transition-all duration-500 ${strongGlow ? 'opacity-100 scale-125 blur-xl' : 'opacity-60 scale-110'}`}
        aria-hidden="true"
        decoding="async"
        loading={loading}
      />
      {strongGlow && (
        <img
          src={icon}
          alt=""
          className="absolute inset-0 w-full h-full object-contain blur-2xl opacity-50 scale-150"
          aria-hidden="true"
          decoding="async"
          loading={loading}
        />
      )}
      <img
        src={icon}
        alt={alt}
        loading={loading}
        decoding="async"
        width={ICON_SIZE}
        height={ICON_SIZE}
        className="relative z-10 w-full h-full object-contain"
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

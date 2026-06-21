import { useEffect, useRef, useState } from "react";
import {
  BEHANCE_EMBED_NATIVE_WIDTH,
  getBehanceEmbedUrl,
} from "../utils/behanceProjects";

function BehanceEmbed({ projectId, title, onLoad, onError }) {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;

    const updateScale = () => {
      const width = wrap.clientWidth;
      if (!width) return;
      const safeWidth = Math.max(0, width - 4);
      setScale(Math.min(1, safeWidth / BEHANCE_EMBED_NATIVE_WIDTH));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(wrap);

    return () => observer.disconnect();
  }, []);

  const isScaled = scale < 1;
  const iframeStyle = isScaled
    ? {
        width: BEHANCE_EMBED_NATIVE_WIDTH,
        height: "var(--behance-embed-height)",
        transform: `scale(${scale})`,
        transformOrigin: "0 0",
      }
    : {
        width: "100%",
        height: "var(--behance-embed-height)",
      };

  const scalerStyle = isScaled
    ? { height: `calc(var(--behance-embed-height) * ${scale})` }
    : { height: "var(--behance-embed-height)" };

  return (
    <div ref={wrapRef} className="my-work-app__embed-wrap">
      <div className="my-work-app__embed-scaler" style={scalerStyle}>
        <iframe
          src={getBehanceEmbedUrl(projectId)}
          title={title}
          className="my-work-app__embed"
          style={iframeStyle}
          loading="eager"
          allowFullScreen
          frameBorder="0"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={onLoad}
          onError={onError}
        />
      </div>
    </div>
  );
}

export default BehanceEmbed;

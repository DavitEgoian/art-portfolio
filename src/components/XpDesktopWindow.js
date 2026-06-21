import { useCallback, useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import XpWindow from "./xp/XpWindow";
import ErrorBoundary from "./ErrorBoundary";
import { XP_APPS } from "../data/xpApps";
import { useWindows } from "../context/WindowContext";
import { useSound } from "../context/SoundContext";
import { XP_WINDOW_RESIZE_END } from "../utils/xpEvents";

const OPEN_EASE = [0.16, 1, 0.3, 1];

function XpDesktopWindow({ windowState }) {
  const {
    focusedId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    resizeWindow,
    clearOpenOrigin,
  } = useWindows();
  const { playSound } = useSound();

  const reduceMotion = useReducedMotion();
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);
  const resizeRafRef = useRef(null);
  const pendingResizeRef = useRef(null);
  const app = XP_APPS[windowState.appId];
  const AppComponent = app.component;
  const isFocused = focusedId === windowState.instanceId;

  const handleDragMove = useCallback(
    (event) => {
      moveWindow(
        windowState.instanceId,
        event.clientX - dragOffset.current.x,
        event.clientY - dragOffset.current.y
      );
    },
    [moveWindow, windowState.instanceId]
  );

  const handleDragEnd = useCallback(() => {
    window.removeEventListener("pointermove", handleDragMove);
    window.removeEventListener("pointerup", handleDragEnd);
    window.removeEventListener("pointercancel", handleDragEnd);
  }, [handleDragMove]);

  const handleDragStart = (event) => {
    if (windowState.maximized) return;
    if (event.target.closest(".xp-window__controls")) return;
    if (event.target.closest(".xp-window__resize-handle")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();
    focusWindow(windowState.instanceId);
    dragOffset.current = {
      x: event.clientX - windowState.x,
      y: event.clientY - windowState.y,
    };
    window.addEventListener("pointermove", handleDragMove);
    window.addEventListener("pointerup", handleDragEnd);
    window.addEventListener("pointercancel", handleDragEnd);
  };

  const handleResizeStart = (event) => {
    if (windowState.maximized) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();
    event.stopPropagation();
    focusWindow(windowState.instanceId);
    windowRef.current?.classList.add("is-resizing");

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = windowState.width;
    const startHeight = windowState.height;

    const handleResizeMove = (moveEvent) => {
      pendingResizeRef.current = {
        width: startWidth + (moveEvent.clientX - startX),
        height: startHeight + (moveEvent.clientY - startY),
      };

      if (resizeRafRef.current) return;

      resizeRafRef.current = requestAnimationFrame(() => {
        resizeRafRef.current = null;
        const pending = pendingResizeRef.current;
        if (!pending) return;
        resizeWindow(windowState.instanceId, pending.width, pending.height);
      });
    };

    const handleResizeEnd = () => {
      window.removeEventListener("pointermove", handleResizeMove);
      window.removeEventListener("pointerup", handleResizeEnd);
      window.removeEventListener("pointercancel", handleResizeEnd);

      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
        resizeRafRef.current = null;
      }

      const pending = pendingResizeRef.current;
      if (pending) {
        resizeWindow(windowState.instanceId, pending.width, pending.height);
        pendingResizeRef.current = null;
      }

      windowRef.current?.classList.remove("is-resizing");
      window.dispatchEvent(new CustomEvent(XP_WINDOW_RESIZE_END));
    };

    window.addEventListener("pointermove", handleResizeMove);
    window.addEventListener("pointerup", handleResizeEnd);
    window.addEventListener("pointercancel", handleResizeEnd);
  };

  useEffect(() => () => handleDragEnd(), [handleDragEnd]);

  const transformOrigin = useMemo(() => {
    if (!windowState.openOrigin || windowState.maximized) {
      return "center center";
    }

    return `${windowState.openOrigin.x - windowState.x}px ${
      windowState.openOrigin.y - windowState.y
    }px`;
  }, [
    windowState.maximized,
    windowState.openOrigin,
    windowState.x,
    windowState.y,
  ]);

  const openAnimation = useMemo(() => {
    if (reduceMotion) {
      return null;
    }

    if (windowState.openOrigin) {
      return {
        initial: { opacity: 0.45, scale: 0.06 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.34, ease: OPEN_EASE },
      };
    }

    return {
      initial: { opacity: 0, scale: 0.94 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.24, ease: OPEN_EASE },
    };
  }, [reduceMotion, windowState.openOrigin]);

  if (windowState.minimized) return null;

  const style = windowState.maximized
    ? { zIndex: windowState.zIndex }
    : {
        left: windowState.x,
        top: windowState.y,
        width: windowState.width,
        height: windowState.height,
        zIndex: windowState.zIndex,
        transformOrigin,
      };

  return (
    <motion.div
      ref={windowRef}
      className={`xp-desktop-window ${isFocused ? "is-focused" : ""} ${
        windowState.maximized ? "is-maximized" : ""
      }`}
      style={style}
      initial={openAnimation?.initial ?? false}
      animate={openAnimation?.animate}
      transition={openAnimation?.transition}
      onAnimationComplete={() => {
        if (windowState.openOrigin) {
          clearOpenOrigin(windowState.instanceId);
        }
      }}
      onPointerDown={() => focusWindow(windowState.instanceId)}
      role="dialog"
      aria-modal="false"
      aria-label={app.title}
    >
      <XpWindow
        title={app.title}
        iconSrc={app.icon}
        className={`xp-desktop-window__frame ${app.id}-window`}
        active={isFocused}
        menu={app.menu}
        maximized={windowState.maximized}
        onTitlePointerDown={handleDragStart}
        onMinimize={() => {
          playSound("click");
          minimizeWindow(windowState.instanceId);
        }}
        onMaximize={() => {
          playSound("click");
          toggleMaximize(windowState.instanceId);
        }}
        onClose={() => {
          playSound("close");
          closeWindow(windowState.instanceId);
        }}
      >
        <ErrorBoundary>
          <AppComponent />
        </ErrorBoundary>
      </XpWindow>
      {!windowState.maximized && (
        <button
          type="button"
          className="xp-window__resize-handle"
          aria-label="Resize window"
          onPointerDown={handleResizeStart}
        />
      )}
    </motion.div>
  );
}

export default XpDesktopWindow;

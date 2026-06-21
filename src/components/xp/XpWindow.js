import XpIcon from "../../data/xpIcons";

function XpWindowControls({ maximized, onMinimize, onMaximize, onClose }) {
  return (
    <div className="xp-window__controls">
      <button
        type="button"
        className="xp-window__btn xp-window__btn--min"
        aria-label="Minimize"
        onClick={(event) => {
          event.stopPropagation();
          onMinimize?.();
        }}
      />
      <button
        type="button"
        className={`xp-window__btn ${
          maximized ? "xp-window__btn--restore" : "xp-window__btn--max"
        }`}
        aria-label={maximized ? "Restore" : "Maximize"}
        onClick={(event) => {
          event.stopPropagation();
          onMaximize?.();
        }}
      />
      <button
        type="button"
        className="xp-window__btn xp-window__btn--close"
        aria-label="Close"
        onClick={(event) => {
          event.stopPropagation();
          onClose?.();
        }}
      />
    </div>
  );
}

function XpWindow({
  title,
  iconSrc,
  children,
  className = "",
  active = false,
  menu = false,
  maximized = false,
  onTitlePointerDown,
  onMinimize,
  onMaximize,
  onClose,
}) {
  return (
    <div className={`xp-window ${active ? "is-active" : ""} ${className}`.trim()}>
      <div
        className="xp-window__titlebar"
        onPointerDown={onTitlePointerDown}
        role="toolbar"
        aria-label={`${title} title bar`}
      >
        {iconSrc && (
          <span className="xp-window__icon">
            <XpIcon src={iconSrc} size={16} />
          </span>
        )}
        <span className="xp-window__title">{title}</span>
        <XpWindowControls
          maximized={maximized}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onClose={onClose}
        />
      </div>
      {menu && (
        <div className="xp-decorative-toolbar xp-window__menubar" aria-hidden="true">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
        </div>
      )}
      <div className="xp-window__body">{children}</div>
    </div>
  );
}

export default XpWindow;

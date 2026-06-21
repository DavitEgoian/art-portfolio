function XpContextMenu({ x, y, items, onClose }) {
  return (
    <>
      <button
        type="button"
        className="xp-contextmenu-backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />
      <ul
        className="xp-contextmenu"
        style={{ left: x, top: y }}
        role="menu"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
      >
        {items.map((item) => (
          <li key={item.label} role="none">
            <button
              type="button"
              role="menuitem"
              className="xp-contextmenu__item"
              onClick={() => {
                item.onSelect();
                onClose();
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default XpContextMenu;

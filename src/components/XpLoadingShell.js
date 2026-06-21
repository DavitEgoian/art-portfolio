function XpLoadingShell({ label = "Loading..." }) {
  return (
    <div className="xp-loading-shell" role="status" aria-live="polite" aria-busy="true">
      <div className="xp-loading-shell__track" aria-hidden="true">
        <div className="xp-loading-shell__fill" />
      </div>
      <p className="xp-loading-shell__label">{label}</p>
    </div>
  );
}

export default XpLoadingShell;

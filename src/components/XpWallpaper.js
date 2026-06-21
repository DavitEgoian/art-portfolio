function XpWallpaper() {
  return (
    <div
      className="xp-wallpaper"
      aria-hidden="true"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bliss.jpg)`,
      }}
    />
  );
}

export default XpWallpaper;

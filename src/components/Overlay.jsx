function Overlay({
  position = "absolute",
  onClick,
  hoverBackground,
  opacity,
  zIndex = "z-10",
}) {
  return (
    <div
      className={`${position} inset-0 bg-black ${opacity} hover:${hoverBackground} transition-all ${zIndex}`}
      onClick={onClick}
    ></div>
  );
}

export default Overlay;

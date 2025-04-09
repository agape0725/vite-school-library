function Section({
  children,
  backgroundColor = "bg-none",
  width,
  margin,
  padding = "px-4",
  shadow,
}) {
  return (
    <div
      className={`flex flex-col gap-5 pb-10 ${backgroundColor} ${width} ${margin} ${padding} ${shadow}`}
    >
      {children}
    </div>
  );
}

export default Section;

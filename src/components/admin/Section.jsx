function Section({
  title,
  children,
  gradient = "bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 border border-orange-200",
  textStyle = "text-orange-800",
}) {
  return (
    <div className={`p-6 rounded-2xl shadow-md ${gradient} min-h-[200px]`}>
      <h1
        className={`mb-5 text-sm md:text-lg font-bold tracking-wide ${textStyle}`}
      >
        {title}
      </h1>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

export default Section;

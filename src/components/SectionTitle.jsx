function SectionTitle({ children, fontColor }) {
  return (
    <h1 className={`${fontColor} text-center text-3xl font-semibold mt-10`}>
      {children}
    </h1>
  );
}

export default SectionTitle;

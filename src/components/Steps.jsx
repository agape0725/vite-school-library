import data from "../../data/db.json";
import Step from "./Step";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

function Steps() {
  return (
    <Section backgroundColor="bg-[rgba(255,180,51,.6)]" padding="px-4">
      <SectionTitle fontColor="text-dirtyWhite">
        Steps on how to borrow
      </SectionTitle>
      {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 m-auto gap-3 min-w-[200px] max-w-[1100px]"> */}
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 m-auto gap-3 min-w-[200px] max-w-[1100px]">
        {data.steps.map((step) => (
          <Step key={step.id} step={step} />
        ))}
      </div>
    </Section>
  );
}

export default Steps;

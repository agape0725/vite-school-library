import Section from "./Section";
import SectionTitle from "./SectionTitle";
import EventImage from "./EventImage";
import EventArticle from "./EventArticle";

function Events() {
  return (
    <Section backgroundColor="bg-blue700">
      <SectionTitle fontColor="text-dirtyWhite">Recent Events</SectionTitle>
      <div className="flex flex-col md:flex-row items-center gap-8 p-6 max-w-5xl mx-auto">
        <EventImage />
        <EventArticle />
      </div>
    </Section>
  );
}

export default Events;

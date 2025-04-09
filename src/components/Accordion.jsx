import AccordionList from "./AccordionList";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import data from "../../data/db.json";
import styles from "./Accordion.module.css";

function Accordion() {
  return (
    <Section margin="m-auto" backgroundColor="bg-none">
      <div className={styles.accordionContainer} />
      <SectionTitle fontColor="text-orange100">
        Frequently Asked Question
      </SectionTitle>
      <ul className="flex flex-col gap-1.5">
        {data.faqs.map((faq) => (
          <AccordionList key={faq.id} faq={faq} />
        ))}
      </ul>
    </Section>
  );
}

export default Accordion;

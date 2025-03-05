"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

export default function page() {
  const defaultContent = "How can i figure out my life:";
  return (
    <div className="py-5 ">
      <Accordion
        variant="splitted"
        itemClasses={{
          base: "!shadow-none text-shade",
        }}
        className="gap-3"
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="How can i figure out my life:"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="How can i figure out my life:"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 3"
          title="How can i figure out my life:"
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
}

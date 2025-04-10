"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useEffect, useState } from "react";
import { header } from "@/src/page/utils/Api";
import Api from "@/src/page/utils/Api";
 
// Define the structure of the data
interface FAQ {
  id: number;
  userId: number;
  message: string;
  messageType: string;
  createdAt: string;
  updatedAt: string;
}
 
export default function page() {
  const [faqData, setFaqData] = useState<FAQ[]>([]); // State to store the FAQ data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading state
  const [error, setError] = useState<string>(""); // State to track any errors
 
  // Fetch the data from the API when the component mounts
  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        // Correct placement of method and headers
        const response = await fetch(Api.FAQ, {
          method: "GET", // Ensure this is a GET request
          headers: header, // Assuming the `header` is correctly imported from "@/src/page/utils/Api"
        });
 
        const data = await response.json();
 
        if (data.status) {
          setFaqData(data.data); // Update the state with the fetched FAQ data
        } else {
          setError("Failed to fetch FAQ data.");
        }
      } catch (err) {
        console.error("Error fetching FAQ data:", err);
        setError("An error occurred while fetching FAQ data.");
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };
 
    fetchFAQData(); // Call the function to fetch the data
  }, []); // Empty dependency array to run the effect only once on component mount
 
  // Render the loading or error state if needed
  if (loading) {
    return <div>Loading...</div>;
  }
 
  if (error) {
    return <div>{error}</div>;
  }
 
  // const defaultContent = "How can i figure out my life:";
  return (
    <div className="py-5 ">
      <Accordion
        variant="splitted"
        itemClasses={{
          base: "!shadow-none text-shade",
        }}
        className="gap-3"
        >
           {faqData.map((faq) => (
          <AccordionItem
            key={faq.id}
            aria-label={`Accordion ${faq.id}`}
            title={faq.message}
          >
            {faq.messageType} <br />
            {/* <span className="text-gray-500">{`Created at: ${faq.createdAt}`}</span> */}
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
 
 
"use client";
import ArrowIcon from "@/src/icons/arrowIcon";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import { FormTextarea } from "@/src/ui/form/form-input";
import { useState } from "react";
import Api from "../../utils/Api";
import { header } from "../../utils/Api";
export default function page() {
  const [question, setQuestion] = useState(""); // To store the input question
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(""); // To handle any error messages
  const [successMessage, setSuccessMessage] = useState(""); // To display success message

  const userId = "1";

  // Handle the change in the textarea input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous error
    setSuccessMessage(""); // Clear any previous success message

    try {
      const res = await fetch(Api.AskQuestion, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          userId, // Add userId here
          message: question, // Message from the form input
          messageType: "General",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit the question");
      }

      const data = await res.json();
      console.log("API response data:", data);

      if (data.status === true) {
        setSuccessMessage("Your question has been submitted successfully!");
        setQuestion(""); // Clear the question input after successful submission
      } else {
        setError(data.message || "Failed to submit your question");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      setError("An error occurred while submitting the question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-1/3 max-xl:w-2/5 max-md:h-3/5 max-sm:w-[80%] max-[400px]:w-full  mx-auto bg-white rounded-xl flex flex-col gap-2 shadow-product-card p-3">
        <div className="flex items-center text-xl font-medium gap-4">
          <ArrowIcon
            className="rotate-90 w-4 h-4 cursor-pointer"
            arrowFillColor="#F26522"
          />
          Ask question
        </div>
        <p className="text-shade">
          Please write your question in the given box and send it to us, our
          team will answer you as soon as possible.
        </p>
        <form className="flex flex-col gap-3 ">
          <FormTextarea
            rows={4}
            className="bg-white shadow-product-card py-2 border border-solid border-border-shade"
            placeholder="Write your question here"
            value={question} // Bind value to the state
            onChange={handleChange} // Handle textarea change
          />
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Display error message if any */}
          {successMessage && (
            <p className="text-green-500">{successMessage}</p>
          )}{" "}
          {/* Display success message */}
          <PrimaryButton onClick={handleSubmit} disabled={loading}>
            Submit
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

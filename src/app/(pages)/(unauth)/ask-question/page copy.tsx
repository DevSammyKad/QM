"use client";
import ArrowIcon from "@/src/icons/arrowIcon";
import { PrimaryButton } from "@/src/ui/buttons/buttons";
import { FormTextarea } from "@/src/ui/form/form-input";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successPopup, setSuccessPopup] = useState(false); // To control modal visibility
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessPopup(false);

    try {
      const res = await fetch("https://quickmeds.sndktech.online/faq", {
        method: "POST",
        headers: {
          "X-Authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          message: question,
          messageType: "General",
        }),
      });

      const data = await res.json();

      if (res.ok && data.status === true) {
        // toast.success("Question submitted successfully!");
        setSuccessPopup(true); // Show success popup
        setQuestion("");

        // Automatically hide popup after 2 seconds
        setTimeout(() => {
          setSuccessPopup(false);
        }, 2000);
      } else {
        setError(data.message || "Failed to submit your question.");
        toast.error(data.message || "Failed to submit question.");
      }
    } catch (error) {
      setError("An error occurred while submitting the question.");
      toast.error("An error occurred while submitting the question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
     <div className="w-1/3 max-xl:w-2/5 max-md:h-3/5 max-sm:w-[80%] max-[400px]:w-full  mx-auto bg-white rounded-xl flex flex-col gap-2 shadow-product-card p-3">
        <div className="flex items-center text-xl font-medium gap-4">
          <ArrowIcon
            className="rotate-90 w-4 h-4 cursor-pointer"
            arrowFillColor="#F26522"
          />
          Ask Question
        </div>
        <p className="text-gray-600">
          Please write your question in the given box and send it to us. Our
          team will answer you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormTextarea
            rows={4}
            className="bg-white shadow border py-2 px-3 border-gray-300 rounded"
            placeholder="Write your question here"
            value={question}
            onChange={handleChange}
          />
          {error && <p className="text-red-500">{error}</p>}
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </PrimaryButton>
        </form>
      </div>

      {/* Success Popup Modal */}
      {successPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-center">
            {/* Success Image */}
            <img
              src="PaymentConfirm.png"
              alt="Success"
              className="w-30  mx-auto"
            />
            <h3 className="text-lg font-semibold mt-4">Success</h3>
            <p className="text-gray-600 mt-2">
              Your question has been sent. Our team will try to answer as soon
              as possible.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

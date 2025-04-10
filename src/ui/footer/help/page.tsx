import { useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HelpPopup({ open, onClose }) {
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://quickmeds.sndktech.online/help",
        JSON.stringify({ name, phoneno, email, query }),
        {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      toast.success("Your query has been submitted successfully.");

      setName("");
      setPhoneno("");
      setEmail("");
      setQuery("");
      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to submit your query. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent className="p-8 rounded-xl w-full max-w-[500px] mx-auto relative">
        <IconButton
          onClick={onClose}
          className="absolute right-4 top-4"
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <h2 className="text-center text-xl font-semibold">Help</h2>
        <p className="text-center text-sm font-medium mt-2">
          24/7 Help from Quickmeds
        </p>
        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (Required)*"
            required
            className="w-full p-3 bg-[#E8F0FE] rounded-lg outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="text"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            placeholder="Phone number (Required)*"
            required
            className="w-full p-3 bg-[#E8F0FE] rounded-lg outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-[#E8F0FE] rounded-lg outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mention your query"
            required
            className="w-full p-3 bg-[#E8F0FE] rounded-lg outline-none h-28 focus:ring-2 focus:ring-[#17A39A]"
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-[#17A39A] text-white rounded-lg mt-2 font-medium hover:bg-[#158B80] transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Done"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

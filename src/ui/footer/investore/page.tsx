import { useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InvestorPopup({ open, onClose }) {
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const investorData = {
        name,
        phoneno: Number(phoneno), // Ensure phone number is sent as a number
        email,
      };

      const response = await axios.post("https://quickmeds.sndktech.online/investor", investorData, {
        headers: {
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          "Content-Type": "application/json",
        },
      });

      if (response.data?.status) {
        toast.success(response.data.message || "Your request has been submitted successfully.");
        setName("");
        setPhoneno("");
        setEmail("");
        onClose();
      } else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to submit your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogContent
        sx={{
          p: 3,
          borderRadius: 2,
          width: "100%",
          maxWidth: 450,
          mx: "auto",
          position: "relative",
          bgcolor: "white",
          minHeight: 600,
          border: "1px solid #ccc",
          boxShadow: 3,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 16, top: 16 }} aria-label="Close">
          <CloseIcon />
        </IconButton>
        <h2 style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "600", marginBottom: "1rem" }}>Investor</h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <img src="/Investore.png" alt="Investor Banner" style={{ width: "100%", maxWidth: "350px", borderRadius: "8px" }} />
        </div>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (Required)*"
            required
            className="w-full p-3 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="number"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            placeholder="Phone number (Required)*"
            required
            className="w-full p-3 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
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

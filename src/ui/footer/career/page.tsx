import { useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CareerPopup({ open, onClose }) {
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [workCategory, setWorkCategory] = useState("");
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setCv(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(
        "https://quickmeds.sndktech.online/upload-files",
        formData,
        {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE2NzQ1Mzg1LCJleHAiOjE3NDgzMDI5ODV9.5wRlYbaliLtMW57h7YCASiJZsESXS1Ouo6i48zuIyTI",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.files[0]; // Returning the uploaded file name
    } catch (error) {
      console.error("File upload error:", error);
      alert("Failed to upload file. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let uploadedFileName = null;

    if (cv) {
      uploadedFileName = await uploadFile(cv);
      if (!uploadedFileName) {
        setLoading(false);
        return;
      }
    }

    try {
      const careerData = {
        name,
        phoneno,
        email,
        work_category: workCategory,
        cv: uploadedFileName
          ? `https://quickmeds.sndktech.online/uploads/${uploadedFileName}`
          : "",
      };

      const response = await axios.post(
        "https://quickmeds.sndktech.online/career",
        careerData,
        {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
            toast.success("Your application has been submitted successfully.");
      
      setName("");
      setPhoneno("");
      setEmail("");
      setWorkCategory("");
      setCv(null);
      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
            toast.error("Failed to submit your query. Please try again.");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogContent className="p-6 rounded-lg w-full max-w-[450px] mx-auto relative bg-white min-h-[600px] overflow-hidden">
        <IconButton
          onClick={onClose}
          className="absolute right-4 top-4"
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <h2 className="text-center text-xl font-semibold mb-4">Career</h2>
        <div className="w-full flex justify-center mb-4">
          <img
            src="/career.png"
            alt="Career Banner"
            className="w-full max-w-[350px] max rounded-lg"
          />
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (Required)*"
            required
            className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="text"
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
            placeholder="Phone number (Required)*"
            required
            className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="text"
            value={workCategory}
            onChange={(e) => setWorkCategory(e.target.value)}
            placeholder="Work Category"
            className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <label className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]">
            {"Add your CV in PDF Format"}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            type="submit"
            className="w-full p-2 bg-[#17A39A] text-white rounded-lg mt-2 font-medium hover:bg-[#158B80] transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Done"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

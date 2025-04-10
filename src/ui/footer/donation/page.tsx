import { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DonationPopup({ open, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", expiry: "" }]);
  const [loading, setLoading] = useState(false);

  const handleAddMore = () => {
    setMedicines([...medicines, { name: "", expiry: "" }]);
  };

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate Required Fields
    if (!name || !phone) {
      toast.error("Please enter Name and Phone Number");
      setLoading(false);
      return;
    }

    // Prepare API Data
    const medicineData = medicines.map((med) => ({
      "medicine name": med.name,
      "Expiry Date": med.expiry,
    }));

    const requestData = {
      name,
      phoneNo: phone,
      email,
      medicineData,
    };

    try {
      const response = await axios.post(
        "https://quickmeds.sndktech.online/donation.add",
        requestData,
        {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
        }
      );

      // Success Toast Message
      toast.success("Donation added successfully!");

      // Clear Form After Success
      setName("");
      setPhone("");
      setEmail("");
      setMedicines([{ name: "", expiry: "" }]);

      // Close Popup
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add donation. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent className="p-8 rounded-xl w-full max-w-[500px] mx-auto relative">
          <IconButton
            onClick={onClose}
            className="absolute right-4 top-4"
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <h2 className="text-center text-xl font-semibold">
            Donation Details
          </h2>
          <p className="text-center text-sm font-medium mt-2">
            Add details for donating
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            {medicines.map((med, index) => (
              <div key={index} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={med.name}
                  onChange={(e) =>
                    handleMedicineChange(index, "name", e.target.value)
                  }
                  placeholder="Medicine name"
                  className="w-full p-3 bg-[#E8F0FE] rounded-lg outline-none focus:ring-2 focus:ring-[#17A39A]"
                />
                <input
                  type="text"
                  value={med.expiry}
                  onChange={(e) =>
                    handleMedicineChange(index, "expiry", e.target.value)
                  }
                  placeholder="Expire date"
                  className="w-full p-3 bg-[#E8F0FE] rounded-lg outline-none focus:ring-2 focus:ring-[#17A39A]"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMore}
              className="w-full p-3 border border-[#FF5733] text-[#FF5733] rounded-lg mt-2 font-medium hover:bg-[#FF5733] hover:text-white transition"
            >
              + Add More
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg mt-2 font-medium transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#17A39A] text-white hover:bg-[#158B80]"
              }`}
            >
              {loading ? "Processing..." : "Donate"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

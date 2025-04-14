import { useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeliveryPopup({ open, onClose }) {
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [shopNo, setShopNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const deliveryData = {
        name,
        phoneno,
        email,
        shop_name: shopName,
        shop_address: shopAddress,
        shop_no: shopNo,
      };

      const response = await axios.post(
        "https://quickmeds.sndktech.online/delivery",
        deliveryData,
        {
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      toast.success("Your request has been submitted successfully.");

      setName("");
      setPhoneno("");
      setEmail("");
      setShopName("");
      setShopAddress("");
      setShopNo("");
      onClose();
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Failed to submit your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogContent className="p-6 rounded-lg w-full max-w-[450px] mx-auto relative bg-white min-h-[650px] overflow-hidden">
        <IconButton
          onClick={onClose}
          className="absolute right-4 top-4"
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
        <h2 className="text-center text-xl font-semibold mb-4">Delivery</h2>
        <div className="w-full flex justify-center mb-4">
          <img
            src="/delivery1.png"
            alt="Delivery Banner"
            className="w-full max-w-[300px] object-contain bg-transparent"
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
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="Shop Name (Required)*"
            required
            className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="text"
            value={shopAddress}
            onChange={(e) => setShopAddress(e.target.value)}
            placeholder="Shop Address"
            className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
          <input
            type="text"
            value={shopNo}
            onChange={(e) => setShopNo(e.target.value)}
            placeholder="Shop No."
            className="w-full p-2 bg-[#E8F0FE] rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#17A39A]"
          />
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

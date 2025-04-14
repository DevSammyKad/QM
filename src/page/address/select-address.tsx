"use client";
import { cn } from "@/cn.config";
import { useEffect, useState } from "react";
import { RadioGroup, RadioProps, useRadio } from "@nextui-org/radio";
import { VisuallyHidden } from "@nextui-org/react";
import { MouseEvent, ReactNode } from "react";
import { header } from "../utils/Api";

type Props = {
  onSelectAddress: (address: any) => void; // Prop to pass selected address
};

// CustomRadio Component Definition
export const CustomRadio = (props: CustomRadioProps) => {
  const { subChild, ...restProps } = props;
  const {
    Component,
    children,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(restProps);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "flex flex-col group gap-2 bg-white rounded-lg",
        "tap-highlight-transparent cursor-pointer border-2 border-border-shade rounded-lg p-4",
        "data-[selected=true]:border-primary"
      )}
    >
      <div className="flex items-center gap-2 ">
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <span {...getWrapperProps()}>
          <span {...getControlProps()} />
        </span>
        <div
          {...getLabelWrapperProps()}
          className="bg-[#F4F4F4] px-3 py-1 text-shade rounded-md"
        >
          {children && <span {...getLabelProps()}>{children}</span>}
        </div>
      </div>
      {subChild && subChild()}
    </Component>
  );
};

interface CustomRadioProps extends RadioProps {
  subChild: () => ReactNode;
}

// AddressDescription Component
const AddressDescription = ({
  address,
  editingAddress,
  onEdit,
  onRemove,
  isEditing,
  onInputChange,
  onSave,
}: {
  address: any;
  editingAddress: any | null;
  onEdit: (address: any) => void;
  onRemove: (addressId: string) => void;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (updatedAddress: any) => void;
}) => {
  const editAddressHandler = (event: MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
    onEdit(address);
  };
  const removeAddressHandler = (event: MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
    onRemove(address.id);
  };

  return (
    <div className="text-sm text-shade">
      {isEditing && editingAddress ? (
        <div className="space-y-4">
          <h2>Edit Address</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editingAddress.name}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={editingAddress.street}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={editingAddress.city}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={editingAddress.state}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label>Zip</label>
            <input
              type="text"
              name="zip"
              value={editingAddress.zip}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={editingAddress.phone}
              onChange={onInputChange}
            />
          </div>
          <div className="flex gap-3">
            <button onClick={() => onSave(editingAddress)}>Save</button>
            <button onClick={() => onEdit(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-shade">
          <p>Street: {address.street}</p>
          <p>City: {address.city}</p>
          <p>State/Province: {address.state}</p>
          <p>Zip-code: {address.zip}</p>
          <p>Phone: {address.phone}</p>
          <div className="flex pt-2 items-center gap-5 text-base font-semibold justify-start">
            <div
              onClick={editAddressHandler}
              className="text-primary-500 font-semibold cursor-pointer hover:opacity-70 active:opacity-50 transition-all"
            >
              Edit
            </div>
            <div
              onClick={removeAddressHandler}
              className="text-primary-500 font-semibold cursor-pointer hover:opacity-70 active:opacity-50 transition-all"
            >
              Remove
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// SelectAddress Component
export default function SelectAddress({ onSelectAddress }: Props) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      const storedToken =
        typeof window !== "undefined"
          ? localStorage.getItem("authToken")
          : null;
      if (!storedToken) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          "https://quickmeds.sndktech.online/address.get",
          {
            method: "GET",
            headers: {
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.status) {
          setAddresses(data.addresses || []);
        } else {
          setError("Failed to fetch addresses.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching addresses.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleSelectionChange = (value: string) => {
    const selected = addresses.find(
      (address) => address.id.toString() === value
    );
    if (selected) {
      console.log("Selected Address in SelectAddress:", selected); // Debug log
      onSelectAddress(selected);
    }
  };

  const handleRemove = async (addressId: string) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("No authentication token found.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://quickmeds.sndktech.online/address.delete/${addressId}`,
        {
          method: "DELETE",
          headers: {
            ...header,
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const data = await response.json();
      if (data.status) {
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== addressId)
        );
        alert("Address deleted successfully");
      } else {
        setError(
          "Failed to delete address: " + (data.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Error deleting address.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address: any) => {
    setEditingAddress({ ...address });
  };

  const handleSave = async (updatedAddress: any) => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      setError("No authentication token found.");
      return;
    }

    try {
      const response = await fetch(
        "https://quickmeds.sndktech.online/address.update",
        {
          method: "PUT",
          headers: {
            ...header,
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json", // Ensure content type is set
          },
          body: JSON.stringify(updatedAddress),
        }
      );

      const data = await response.json();
      if (data.status) {
        setAddresses((prevAddresses) =>
          prevAddresses.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address
          )
        );
        setEditingAddress(null);
        alert("Address updated successfully");
      } else {
        setError(
          "Failed to update address: " + (data.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Error updating address.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingAddress) {
      const { name, value } = e.target;
      setEditingAddress((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // const handleSelectionChange = (value: string) => {
  //   const selected = addresses.find((address) => address.id.toString() === value);
  //   if (selected) {
  //     onSelectAddress(selected);
  //   }
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <RadioGroup
        onValueChange={handleSelectionChange}
        className=""
        classNames={{
          wrapper:
            "grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1",
        }}
      >
        {addresses.map((address) => (
          <CustomRadio
            subChild={() => (
              <AddressDescription
                address={address}
                editingAddress={editingAddress}
                onEdit={handleEdit}
                onRemove={handleRemove}
                isEditing={editingAddress?.id === address.id}
                onInputChange={handleInputChange}
                onSave={handleSave}
              />
            )}
            key={address.id}
            value={address.id.toString()}
          >
            {address.name}
          </CustomRadio>
        ))}
      </RadioGroup>
    </div>
  );
}

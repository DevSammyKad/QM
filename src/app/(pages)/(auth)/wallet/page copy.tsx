'use client';
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { header } from "../../utils/Api";
import Api from "../../utils/Api";

type Props = {};

export default function Page({}: Props) {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [amountToAdd, setAmountToAdd] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("WALLET_MONEY_DEPOSIT");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    const fetchWalletData = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetch(`https://quickmeds.sndktech.online/wallet.get?userId=${storedUserId}`, {
          method: "GET",
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch wallet data");
        }

        const data = await response.json();
        if (data.status) {
          setWallet(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error fetching wallet data");
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactions = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const transactionResponse = await fetch(`https://quickmeds.sndktech.online/transaction.getAll?userId=${storedUserId}`, {
          method: "GET",
          headers: {
            "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!transactionResponse.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const transactionData = await transactionResponse.json();
        if (transactionData.status) {
          setTransactions(transactionData.fromatedResponse);
        } else {
          setError(transactionData.message);
        }
      } catch (error) {
        setError("Error fetching transaction data");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
    fetchTransactions();
  }, []);

  const handleAddMoney = async () => {
    if (!amountToAdd || parseFloat(amountToAdd) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const type = transactionType === "WALLET_MONEY_DEPOSIT" ? "CREDIT" : "DEBIT";
    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(Api.AddMoney, {
        method: 'POST',
          headers: {
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: wallet?.userId, // assuming you have a userId in the wallet data       
         transactionType: transactionType,
          type: type,
          amount: parseFloat(amountToAdd),
        }),
      });

      const data = await response.json();
      if (data.status) {
        setWallet((prevWallet: any) => ({
          ...prevWallet,
          balance: prevWallet.balance + (transactionType === "WALLET_MONEY_DEPOSIT" ? parseFloat(amountToAdd) : -parseFloat(amountToAdd)),
        }));
        setAmountToAdd("");
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error adding money to the wallet");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/^0+/, "");
    setAmountToAdd(value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="w-full">
      <p className="text-4xl font-semibold">Wallet</p>
      <div className="flex items-start max-lg:flex-col max-lg:items-center max-lg:gap-5 py-7 gap-20">
        <div className="w-1/4 flex flex-col gap-5 items-center">
          <div className="bg-primary-500 w-full aspect-square p-10 flex items-center justify-center rounded-full">
            <div className="text-shade bg-white flex justify-center items-center flex-col aspect-square w-full rounded-full">
              <p className="text-[28px] font-semibold">₹{wallet?.balance || "0"}</p>
              <p>Available Balance</p>
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <input
              type="number"
              value={amountToAdd}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="px-4 py-2 border rounded-md"
            />
            <Button color="primary" variant="bordered" onClick={handleAddMoney}>
              + Add money
            </Button>
          </div>
        </div>
        <div className="w-3/4">
          <p className="text-primary-500 font-semibold">Recent transactions</p>
          <div className="flex pt-5 flex-col gap-5">
            {transactions.map((transaction) => (
              <div key={transaction.transactionId} className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center">
                <User
                  name={transaction.senderName || "Unknown Vendor"}
                  description={new Date(transaction.date).toLocaleDateString()}
                  avatarProps={{ src: "" }}
                />
                <p className="border border-border-shade text-shade px-3 py-1 rounded-xl">
                  {transaction.status === "PENDING" ? `₹${transaction.amount}` : `- ₹${transaction.amount}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
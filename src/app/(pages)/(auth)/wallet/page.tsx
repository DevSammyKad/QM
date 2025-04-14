"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import Api from "../../utils/Api";

type Props = {};

export default function Page({}: Props) {
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [amountToAdd, setAmountToAdd] = useState<number | string>("");
  const [transactionType, setTransactionType] = useState<string>(
    "WALLET_MONEY_DEPOSIT"
  );
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    const fetchWalletData = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          `https://quickmeds.sndktech.online/wallet.get?userId=${storedUserId}`,
          {
            method: "GET",
            headers: {
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

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
        const transactionResponse = await fetch(
          `https://quickmeds.sndktech.online/transaction.getAll?userId=${storedUserId}`,
          {
            method: "GET",
            headers: {
              "x-authorization":
                "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!transactionResponse.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const transactionData = await transactionResponse.json();
        if (transactionData.status) {
          setTransactions(transactionData.data || []); // Ensure it's always an array
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
    if (!amountToAdd || parseFloat(amountToAdd.toString()) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    const type =
      transactionType === "WALLET_MONEY_DEPOSIT" ? "CREDIT" : "DEBIT";
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`https://quickmeds.sndktech.online/transaction.add`, {
        method: "POST",
        headers: {
          "x-authorization": "RGVlcGFrS3-VzaHdhaGE5Mzk5MzY5ODU0-QWxoblBvb2ph",
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: wallet?.userId,
          transactionType,
          type,
          amount: parseFloat(amountToAdd.toString()),
        }),
      });

      const data = await response.json();

      if (data.status) {
        setWallet((prevWallet: any) => ({
          ...prevWallet,
          balance:
            prevWallet.balance +
            (transactionType === "WALLET_MONEY_DEPOSIT"
              ? parseFloat(amountToAdd.toString())
              : -parseFloat(amountToAdd.toString())),
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
        <div className="w-1/4 max-xl:w-1/3 max-lg:w-1/2 max-md:w-2/3 max-sm:w-[90%] flex flex-col gap-5 items-center">
          <div className="bg-primary-500 w-full aspect-square relative p-10 flex items-center justify-center rounded-full">
            <div className="text-shade bg-white flex justify-center items-center flex-col aspect-square w-full rounded-full">
              <p className="text-[28px] font-semibold">
                ₹{wallet?.balance || "0"}
              </p>
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
        <div className="w-3/4 max-xl:w-2/3 max-lg:w-full">
          <p className="text-primary-500 font-semibold">Recent transactions</p>
          <div className="flex pt-5 flex-col gap-5">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex bg-white rounded-3xl px-5 py-2 justify-between items-center"
                >
                  <User
                    name={transaction.orderId || "Unknown Vendor"}
                    description={new Date(
                      transaction.createdAt
                    ).toLocaleDateString()}
                    avatarProps={{ src: "" }}
                  />
                  <p
                    className={`border px-3 py-1 rounded-xl ${
                      transaction.status === "SUCCESS"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "CREDIT"
                      ? `+ ₹${transaction.amount}`
                      : `- ₹${transaction.amount}`}
                  </p>
                </div>
              ))
            ) : (
              <p>No transactions available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

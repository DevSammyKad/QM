import React from 'react';

const WalletPaymentConfirmPopUp = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <img src="/PaymentConfirm.png" alt="payment Done" />
      <h1 className="text-center text-2xl font-semibold">Congratulations!!</h1>
      <p className="text-gray-500 text-center">
        The amount has been added to the wallet.
      </p>
    </div>
  );
};

export default WalletPaymentConfirmPopUp;

import React from "react";
import { BackArrowIcon } from "./Icons";

const PaymentForm = ({ 
  paymentFormData, 
  onInputChange, 
  onBack, 
  onSubmit, 
  isLoading = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(paymentFormData);
  };

  return (
    <>
      {/* Payment Form Header */}
      <div className="relative w-full px-4 py-6 md:p-8">
        <h1 className="text-center text-black font-['Lexend'] font-medium text-xl md:text-2xl lg:text-[29.4366px] leading-tight">
          Payment Methods
        </h1>

        {/* Back Button */}
        <button
          className="absolute left-4 top-6 md:left-8 md:top-8 bg-transparent border-none cursor-pointer p-2"
          onClick={onBack}
          type="button"
        >
          <BackArrowIcon />
        </button>
      </div>

      {/* Form Content */}
      <form 
        onSubmit={handleSubmit}
        className="flex-1 px-4 md:px-8 lg:px-[180px] py-4 space-y-4 md:space-y-6"
      >
        {/* Input Fields */}
        <input
          type="text"
          placeholder="Enter card name"
          value={paymentFormData.cardName}
          onChange={(e) => onInputChange("cardName", e.target.value)}
          className="w-full h-12 md:h-[60px] border border-[#D5D5D5] rounded-lg md:rounded-[15px] px-4 md:px-5 py-0 font-['Lexend'] text-sm md:text-base text-black outline-none"
          required
        />

        <input
          type="text"
          placeholder="Enter card number"
          value={paymentFormData.cardNumber}
          onChange={(e) => onInputChange("cardNumber", e.target.value)}
          className="w-full h-12 md:h-[60px] border border-[#D5D5D5] rounded-lg md:rounded-[15px] px-4 md:px-5 py-0 font-['Lexend'] text-sm md:text-base text-black outline-none"
          required
        />

        {/* Split inputs on larger screens */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter expiry date"
            value={paymentFormData.expiryDate}
            onChange={(e) => onInputChange("expiryDate", e.target.value)}
            className="w-full h-12 md:h-[60px] border border-[#D5D5D5] rounded-lg md:rounded-[15px] px-4 md:px-5 py-0 font-['Lexend'] text-sm md:text-base text-black outline-none"
            required
          />

          <input
            type="text"
            placeholder="Enter CVV"
            value={paymentFormData.cvv}
            onChange={(e) => onInputChange("cvv", e.target.value)}
            className="w-full h-12 md:h-[60px] border border-[#D5D5D5] rounded-lg md:rounded-[15px] px-4 md:px-5 py-0 font-['Lexend'] text-sm md:text-base text-black outline-none"
            required
          />
        </div>

        {/* Pay Button */}
        <div className="flex justify-center md:justify-end pt-4">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto min-w-[144px] h-12 md:h-[56px] bg-[#0490CF] rounded-lg md:rounded-[14.3935px] border-none text-white font-['Lexend'] font-semibold text-base md:text-lg cursor-pointer flex items-center justify-center px-6 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Pay"}
          </button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;
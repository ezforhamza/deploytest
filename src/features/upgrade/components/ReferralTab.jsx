import React from "react";

const ReferralTab = ({ 
  referralCode, 
  onReferralCodeChange, 
  onApplyReferral,
  isLoading = false,
  error = null,
  success = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyReferral(referralCode);
  };

  return (
    <div className="max-w-[709px] mx-auto px-4 md:px-0 py-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Enter referral code"
            value={referralCode}
            onChange={(e) => onReferralCodeChange(e.target.value)}
            className={`w-full h-12 md:h-[60px] border rounded-lg md:rounded-[10.7042px] px-4 md:px-5 py-0 font-['Lexend'] text-sm md:text-base text-black outline-none ${
              error 
                ? "border-red-500" 
                : success 
                ? "border-green-500" 
                : "border-[#B6B6B6]"
            }`}
            required
          />
          
          {error && (
            <p className="text-red-500 text-sm mt-2 font-['Lexend']">
              {error}
            </p>
          )}
          
          {success && (
            <p className="text-green-500 text-sm mt-2 font-['Lexend']">
              Referral code applied successfully!
            </p>
          )}
        </div>

        <div className="flex justify-center md:justify-end">
          <button 
            type="submit"
            disabled={isLoading || !referralCode.trim()}
            className="w-full md:w-auto min-w-[144px] h-12 md:h-[56px] bg-[#0490CF] rounded-lg md:rounded-[14.3935px] border-none text-white font-['Lexend'] font-semibold text-base md:text-lg cursor-pointer flex items-center justify-center px-6 disabled:opacity-50"
          >
            {isLoading ? "Applying..." : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReferralTab;
import React from "react";
import SubscriptionCard from "../SubscriptionCard";

const PlanOption = ({ 
  plan, 
  isSelected, 
  onSelect, 
  title, 
  price, 
  billing 
}) => (
  <div
    className={`w-full h-auto md:h-[60px] bg-white shadow-[0px_0px_10.0957px_rgba(0,0,0,0.1)] rounded-lg md:rounded-[10.627px] cursor-pointer flex flex-col md:flex-row items-start md:items-center p-4 md:px-5 gap-2 md:gap-0 ${
      isSelected ? "border-2 border-[#0490CF]" : "border border-[#E2E2E2]"
    }`}
    onClick={() => onSelect(plan)}
  >
    <input
      type="radio"
      name="plan"
      value={plan}
      checked={isSelected}
      onChange={() => onSelect(plan)}
      className="w-4 h-4 md:w-5 md:h-5 mr-0 md:mr-[15px] accent-[#0490CF]"
    />
    <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between w-full">
      <span className="font-['Lexend'] text-base md:text-lg font-medium text-black">
        {title} ${price}
      </span>
      <span className="font-['Lexend'] text-sm md:text-base font-normal text-[#58606C]">
        {billing}
      </span>
    </div>
  </div>
);

const UpgradeTab = ({ 
  selectedPlan, 
  onPlanSelect, 
  onUpgradeClick,
  plans = null,
  isLoading = false 
}) => {
  const defaultPlans = [
    {
      id: "monthly",
      title: "Monthly",
      price: "18",
      billing: "Billed Monthly"
    },
    {
      id: "annual",
      title: "Annual",
      price: "199",
      billing: "Billed Yearly"
    }
  ];

  const planOptions = plans || defaultPlans;

  return (
    <>
      {/* Subscription Card */}
      <div className="w-full max-w-[704px] mx-auto mb-6 transform scale-75 md:scale-90 lg:scale-100 origin-top">
        <SubscriptionCard />
      </div>

      {/* Plan Options */}
      <div className="space-y-4 max-w-[704px] mx-auto px-4 md:px-0">
        {planOptions.map((plan) => (
          <PlanOption
            key={plan.id}
            plan={plan.id}
            isSelected={selectedPlan === plan.id}
            onSelect={onPlanSelect}
            title={plan.title}
            price={plan.price}
            billing={plan.billing}
          />
        ))}

        {/* Upgrade Button */}
        <div className="flex justify-center md:justify-end pt-4 pb-6">
          <button
            className="w-full md:w-auto min-w-[198px] h-12 md:h-[56px] bg-[#0490CF] rounded-lg md:rounded-[14.2897px] border-none text-white font-['Lexend'] font-semibold text-base md:text-lg cursor-pointer flex items-center justify-center px-6 disabled:opacity-50"
            onClick={onUpgradeClick}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Upgrade Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default UpgradeTab;
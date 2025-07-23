import React from "react";
import { BackArrowIcon, CardIcon } from "./Icons";

// Import colors from design system
const COLORS = {
  primary: "#1090cf", // var(--color-primary)
  textGrey: "#58606c", // var(--color-text)
};

const PaymentMethodOption = ({
  method,

  onSelect,
  icon,
  title,
  cardNumber,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getBorderColor = () => {
    if (isHovered) return COLORS.primary;
    return COLORS.textGrey;
  };

  return (
    <button
      className="w-full h-16 md:h-[76px] rounded-lg md:rounded-[17.5761px] cursor-pointer flex items-center px-4 md:px-[17.58px] bg-transparent transition-all duration-200"
      style={{
        border: "2px solid",
        borderColor: getBorderColor(),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(method)}
    >
      <div className="w-6 h-6 md:w-[26.36px] md:h-[26.36px] mr-3 md:mr-[17.58px] flex items-center justify-center">
        <CardIcon />
      </div>
      <div className="flex flex-col gap-1 md:gap-[8.79px] flex-1">
        <p className="font-['Lexend'] font-medium text-sm md:text-[15.3791px] leading-tight text-[#101010] m-0 text-left">
          {title}
        </p>
        <p className="font-['Poppins'] font-normal text-xs md:text-[13.1821px] leading-tight text-[#878787] m-0 text-left">
          {cardNumber}
        </p>
      </div>
      <img
        src={icon}
        alt={title}
        className="w-8 h-8 md:w-[47.49px] md:h-[47.49px]"
      />
    </button>
  );
};

const PaymentMethods = ({
  selectedPaymentMethod,
  onPaymentMethodSelect,
  onBack,
  paymentMethods = [],
}) => {
  const defaultPaymentMethods = [
    {
      id: "card",
      title: "Card",
      cardNumber: "**** **** 0783 7873",
      icon: "/upgrade/mastercard.png",
    },
    {
      id: "apple",
      title: "Apple Wallet",
      cardNumber: "**** **** 0582 4672",
      icon: "/upgrade/applepay.png",
    },
    {
      id: "google",
      title: "Google Wallet",
      cardNumber: "**** **** 0582 4672",
      icon: "/upgrade/googlepay.png",
    },
  ];

  const methods =
    paymentMethods.length > 0 ? paymentMethods : defaultPaymentMethods;

  return (
    <>
      {/* Header */}
      <div className="relative w-full px-4 py-6 md:p-8">
        <h1 className="text-center text-black font-['Lexend'] font-medium text-xl md:text-2xl lg:text-[29.2243px] leading-tight">
          Payment Methods
        </h1>

        {/* Back Button */}
        <button
          className="absolute left-4 top-6 md:left-8 md:top-8 bg-transparent border-none cursor-pointer p-2"
          onClick={onBack}
        >
          <BackArrowIcon />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 md:px-8 space-y-6 overflow-y-auto">
        {/* Bank Card Image */}
        <div className="w-full max-w-[704px] mx-auto h-48 md:h-64 lg:h-[350px] bg-[#0490CF] rounded-2xl md:rounded-[31.4373px] overflow-hidden">
          <img
            src="/upgrade/card.png"
            alt="Bank Card"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Payment Method Options */}
        <div className="space-y-4 max-w-[704px] mx-auto">
          {methods.map((method) => (
            <PaymentMethodOption
              key={method.id}
              method={method.id}
              isSelected={selectedPaymentMethod === method.id}
              onSelect={onPaymentMethodSelect}
              icon={method.icon}
              title={method.title}
              cardNumber={method.cardNumber}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;

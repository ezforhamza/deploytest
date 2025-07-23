// src/components/ui/SocialButton.jsx

const SocialButton = ({
  type = "google",
  size = "default",
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const sizes = {
    small: { width: "60px", height: "27px" },
    default: { width: "80px", height: "36px" },
    large: { width: "100px", height: "45px" },
  };

  const buttonStyle = {
    ...sizes[size],
    backgroundColor: "#F8f8f8",
    border: "none",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s ease",
  };

  const AppleIcon = () => (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.71108 4.82328C8.49819 3.66273 9.04694 2.4684 9.7078 1.66352C10.4361 0.77543 11.686 0.094375 12.7541 0.0195312C12.9346 1.23629 12.438 2.4218 11.7844 3.26035C11.0832 4.16121 9.87764 4.8598 8.71108 4.82328ZM14.9763 9.02855C15.3068 8.10644 15.9616 7.2768 16.9774 6.71703C15.9509 5.43609 14.5097 4.69242 13.1496 4.69242C11.3502 4.69242 10.5894 5.54973 9.33956 5.54973C8.05206 5.54973 7.0753 4.69242 5.51667 4.69242C3.98827 4.69242 2.36136 5.62398 1.32956 7.21496C0.950183 7.80305 0.693191 8.53363 0.553035 9.34738C0.164129 11.6302 0.745067 14.6035 2.478 17.2436C3.32057 18.5247 4.44366 19.9677 5.91085 19.9803C7.21784 19.9931 7.58862 19.1447 9.35796 19.1359C11.1299 19.1259 11.4657 19.9891 12.7709 19.9766C14.2385 19.9643 15.4235 18.3673 16.2661 17.0864C16.866 16.1671 17.0929 15.7029 17.5594 14.6636C15.1873 13.769 14.2117 11.1551 14.9763 9.02855Z"
        fill="black"
      />
    </svg>
  );

  const GoogleIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.7511 10.1941C18.7511 9.47471 18.6916 8.94971 18.5626 8.40527H10.1797V11.6525H15.1003C15.0011 12.4595 14.4654 13.6747 13.2749 14.4913L13.2582 14.6001L15.9088 16.6123L16.0924 16.6303C17.7789 15.1039 18.7511 12.858 18.7511 10.1941Z"
        fill="#4285F4"
      />
      <path
        d="M10.1793 18.75C12.59 18.75 14.6137 17.9722 16.092 16.6305L13.2745 14.4915C12.5206 15.0068 11.5086 15.3665 10.1793 15.3665C7.81824 15.3665 5.81428 13.8402 5.09993 11.7305L4.99522 11.7392L2.23917 13.8295L2.20312 13.9277C3.67136 16.786 6.68724 18.75 10.1793 18.75Z"
        fill="#34A853"
      />
      <path
        d="M5.09916 11.7303C4.91068 11.1858 4.80159 10.6024 4.80159 9.9997C4.80159 9.39688 4.91068 8.81357 5.08924 8.26913L5.08425 8.15313L2.29366 6.0293L2.20236 6.07186C1.59723 7.25801 1.25 8.58995 1.25 9.9997C1.25 11.4094 1.59723 12.7413 2.20236 13.9274L5.09916 11.7303Z"
        fill="#FBBC05"
      />
      <path
        d="M10.1794 4.63331C11.8559 4.63331 12.9869 5.34303 13.6317 5.93612L16.1516 3.525C14.604 2.11528 12.5901 1.25 10.1794 1.25C6.68724 1.25 3.67137 3.21388 2.20312 6.07218L5.09002 8.26944C5.8143 6.15972 7.81824 4.63331 10.1794 4.63331Z"
        fill="#EB4335"
      />
    </svg>
  );

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      className={`social-button ${className}`}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = "#EEEEEE";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = "#F5F5F5";
        }
      }}
      {...props}
    >
      {type === "apple" ? <AppleIcon /> : <GoogleIcon />}
    </button>
  );
};

export default SocialButton;

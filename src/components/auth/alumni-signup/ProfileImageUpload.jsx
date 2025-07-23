import { Camera, Edit3 } from "lucide-react";
import { colors } from "../../../styles/tokens";

const ProfileImageUpload = ({ profileImage, onImageUpload }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size must be less than 5MB");
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert("Only JPEG, PNG, and GIF images are allowed");
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full bg-gray-100 border-2 flex items-center justify-center cursor-pointer bg-cover bg-center overflow-hidden"
          style={{
            borderColor: colors.primary,
            backgroundImage: profileImage ? `url(${profileImage})` : "none",
          }}
          onClick={() => document.getElementById("profile-upload").click()}
        >
          {!profileImage && <Camera size={24} color={colors.primary} />}
        </div>
        
        {/* Edit Icon - Only show when there's an image */}
        {profileImage && (
          <button
            type="button"
            onClick={() => document.getElementById("profile-upload").click()}
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center cursor-pointer transition-all hover:scale-110"
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Edit3 size={12} />
          </button>
        )}
        
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileImageUpload;
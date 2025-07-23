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
      // Store the file object for upload, but create a preview URL
      const fileWithPreview = file;
      fileWithPreview.preview = imageUrl;
      onImageUpload(fileWithPreview);
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="relative">
        <div
          className="rounded-full bg-gray-100 border-2 flex items-center justify-center cursor-pointer bg-cover bg-center overflow-hidden"
          style={{
            width: "142px",
            height: "142px",
            borderColor: colors.primary,
            backgroundImage: profileImage ? `url(${profileImage.preview || profileImage})` : "none",
          }}
          onClick={() => document.getElementById("profile-upload").click()}
        >
          {!profileImage && (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 39H27" stroke="#3C3C3C" strokeWidth="3" strokeLinecap="round"/>
              <path d="M36 30V48" stroke="#3C3C3C" strokeWidth="3" strokeLinecap="round"/>
              <path d="M57 30H54" stroke="#3C3C3C" strokeWidth="3" strokeLinecap="round"/>
              <path d="M6 40.0908C6 30.8982 6 26.3016 8.24706 22.9998C9.21984 21.5704 10.4698 20.3431 11.9257 19.388C14.0866 17.9704 16.792 17.4637 20.934 17.2826C22.9105 17.2826 24.6124 15.812 25 13.9091C25.5814 11.0547 28.1341 9 31.0989 9H40.9011C43.8657 9 46.4184 11.0547 47.0001 13.9091C47.3877 15.812 49.0893 17.2826 51.066 17.2826C55.2081 17.4637 57.9132 17.9704 60.0744 19.388C61.53 20.3431 62.7801 21.5704 63.753 22.9998C66 26.3016 66 30.8982 66 40.0908C66 49.2837 66 53.8803 63.753 57.1821C62.7801 58.6113 61.53 59.8386 60.0744 60.7938C56.7114 63 52.0299 63 42.6666 63H29.3333C19.9702 63 15.2887 63 11.9257 60.7938C10.4698 59.8386 9.21984 58.6113 8.24706 57.1821C7.61238 56.2494 7.15698 55.2135 6.83019 54" stroke="#3C3C3C" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          )}
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
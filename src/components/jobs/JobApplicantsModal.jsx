// import { useState } from "react";
// import { colors } from "../../styles/tokens";

// const JobApplicantsModal = ({ isOpen, onClose, applicants = [] }) => {
//   if (!isOpen) return null;

//   // Sample applicants data if none provided
//   const sampleApplicants = [
//     { id: 1, name: "Katona Beatrix", avatar: null, isOnline: false },
//     { id: 2, name: "Mitchell", avatar: null, isOnline: false },
//     { id: 3, name: "Veres Panna", avatar: null, isOnline: false },
//     { id: 4, name: "Balázs Annamária", avatar: null, isOnline: false },
//     { id: 5, name: "László Cintia", avatar: null, isOnline: false },
//     { id: 6, name: "Philip", avatar: null, isOnline: false },
//     { id: 7, name: "Philip", avatar: null, isOnline: false },
//     { id: 8, name: "Takács Bianka", avatar: null, isOnline: false },
//     { id: 9, name: "Bruce", avatar: null, isOnline: false },
//     { id: 10, name: "Török Melinda", avatar: null, isOnline: false },
//     { id: 11, name: "Marvin", avatar: null, isOnline: false },
//     { id: 12, name: "Nagy Tímea", avatar: null, isOnline: true }
//   ];

//   const displayApplicants = applicants.length > 0 ? applicants : sampleApplicants;

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//       onClick={handleBackdropClick}
//     >
//       {/* Modal Container */}
//       <div className="relative bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <h2 className="font-lexend font-medium text-xl text-black">
//             Applications
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               className="text-black"
//             >
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </button>
//         </div>

//         {/* Applicants List */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="space-y-4">
//             {displayApplicants.map((applicant) => (
//               <div
//                 key={applicant.id}
//                 className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
//               >
//                 {/* Avatar */}
//                 <div className="relative flex-shrink-0">
//                   <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//                     {applicant.avatar ? (
//                       <img
//                         src={applicant.avatar}
//                         alt={`${applicant.name} avatar`}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <span className="text-white font-lexend font-medium text-lg">
//                         {applicant.name.charAt(0).toUpperCase()}
//                       </span>
//                     )}
//                   </div>

//                   {/* Online Status Indicator */}
//                   {applicant.isOnline && (
//                     <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
//                       <svg
//                         width="8"
//                         height="8"
//                         viewBox="0 0 24 24"
//                         fill="white"
//                         className="w-2 h-2"
//                       >
//                         <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                       </svg>
//                     </div>
//                   )}
//                 </div>

//                 {/* Name */}
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-lexend font-medium text-base text-black truncate">
//                     {applicant.name}
//                   </h3>
//                 </div>

//                 {/* Action Button */}
//                 <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <polyline points="9,18 15,12 9,6"></polyline>
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Gradient Fade at Bottom */}
//         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
//       </div>
//     </div>
//   );
// };

// export default JobApplicantsModal;

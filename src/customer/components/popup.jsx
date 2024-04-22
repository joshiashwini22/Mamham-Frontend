import React from "react";

const Popup = ({ onClose, content }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg p-8 relative top-10">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-0 right-0 m-4 p-2 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Popup content */}
        {content}
      </div>
    </div>
  );
};

export default Popup;

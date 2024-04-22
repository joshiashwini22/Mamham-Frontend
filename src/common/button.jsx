import React from 'react';

function Button({ purpose, onClick }) {
  const isDisabled = !onClick; // If no purpose, the button should be disabled

  return (
    <button
      type="button"
      className={`text-white bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ${
        isDisabled ? ' cursor-default  opacity-50' : '' // Add opacity and change cursor if disabled
      }`}
      onClick={isDisabled ? undefined : onClick} // Only allow clicks if not disabled
      disabled={isDisabled} // Disable button if there's no purpose
    >
      {purpose || 'Unavailable'} {/* Display a default text if no purpose */}
    </button>
  );
}

export default Button;

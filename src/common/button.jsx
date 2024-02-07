import React from 'react';

function Button({ purpose, onClick }) {
  return (
    <button type="button"
    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={onClick}>{purpose}</button>
  );
}

export default Button;
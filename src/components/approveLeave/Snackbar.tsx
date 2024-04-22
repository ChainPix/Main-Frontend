import React from 'react';

function Snackbar({ message, type }) {
  return (
    <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-${type === 'success' ? 'green-500' : 'red-500'} text-white p-4 rounded shadow`}>
      {message}
    </div>
  );
}

export default Snackbar;

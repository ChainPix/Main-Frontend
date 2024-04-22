import React, { useState, useEffect } from 'react';

function AlertDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel, setShowDialog }) {
  const [rejectReason, setRejectReason] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => setIsAnimating(false));
    return () => clearTimeout(timeout);
  }, []);

  const handleConfirm = () => {
    onConfirm(rejectReason); // Pass reason if needed
    closeDialog();
  };

  const handleCancel = () => {
    onCancel();
    closeDialog();
  };

  const closeDialog = () => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
      setShowDialog(false); // Close dialog
    }, 300); // Animation duration
    return () => clearTimeout(timeout);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-10 transition-opacity ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
      <div className="fixed inset-0 bg-black/50 backdrop-filter backdrop-blur-sm"></div>
      <div className="bg-white rounded shadow p-4 transform transition-transform duration-300 scale-100">
        <h3 className=" dark:text-white text-lg font-bold">{title}</h3>
        <p className="dark:text-white mt-2">{message}</p>
        {title === 'Reject Leave Request' && (
          <textarea
            className="mt-2 w-full border border-gray-300 rounded p-2"
            placeholder="Enter rejection reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={handleCancel}>
            {cancelLabel}
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;

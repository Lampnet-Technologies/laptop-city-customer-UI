
const Modal = ({ isOpen, onClose, onSelect }) => {
  const conditions = [
    { id: 'new', label: 'New Products' },
    { id: 'used', label: 'Used Products' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h3 className="text-lg font-bold mb-4">Choose Product Type</h3>
        <div className="flex flex-col space-y-3">
          {conditions.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                onSelect(id);
                onClose();
              }}
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            >
              {label}
            </button>
          ))}
          <button
            className="w-full text-sm text-gray-500 mt-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

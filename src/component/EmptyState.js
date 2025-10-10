// Helper Component
import { useNavigate } from "react-router-dom";

function EmptyState({ message }) {
  const navigate = useNavigate();
  return (
    <div className="text-center text-gray-600 py-12 px-4">
      <p className="text-lg mb-6">{message}</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/products")}
          className="bg-green hover:bg-dark-green text-white px-6 py-2 rounded-lg transition"
        >
          View All Products
        </button>
      </div>
    </div>
  );
}
export default EmptyState;
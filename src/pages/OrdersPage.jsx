import { useState, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api_order_history.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user?.user_id }),
        });

        const data = await response.json();
        if (data.success) {
          setOrders(data.data.order_info);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.user_id) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-dark-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Order History</h2>

        {loading ? (
          <LoadingSpinner />
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.order_id}
                className="border border-dark-600 rounded-lg overflow-hidden"
              >
                <div className="bg-dark-600 p-4 flex flex-wrap justify-between items-center">
                  <div>
                    <h3 className="font-medium text-white">
                      Order #{order.order_id}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Placed on{" "}
                      {new Date(order.date_created).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.payment_status === "paid"
                          ? "bg-success/20 text-success"
                          : "bg-warning/20 text-warning"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                    <span className="text-white font-medium">
                      KES {Number(order.total_amount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowOrderModal(true);
                    }}
                    className="text-accent-400 hover:text-accent-300 text-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">
              No orders yet
            </h3>
            <p className="text-gray-400">
              When you place an order, it will appear here.
            </p>
          </div>
        )}

        {showOrderModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-dark-700 p-6 rounded-lg w-full max-w-2xl shadow-lg relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => {
                  setShowOrderModal(false);
                  setSelectedOrder(null);
                }}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold text-white mb-6">
                Order Details #{selectedOrder.order_id}
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Order Date</p>
                    <p className="text-white">
                      {new Date(selectedOrder.date_created).toLocaleDateString(
                        "en-KE",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Payment Method</p>
                    <p className="text-white uppercase">
                      {selectedOrder.payment_method}
                    </p>
                  </div>
                </div>

                <div className="border border-dark-600 rounded-lg overflow-hidden">
                  {selectedOrder.order_details.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border-b border-dark-600 last:border-b-0"
                    >
                      <div className="w-16 h-16 bg-dark-600 rounded-lg overflow-hidden">
                        <img
                          src={`${IMAGE_BASE_URL}/${item.product_image}`}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-white font-medium">
                          {item.product_name}
                        </h3>
                        <p className="text-gray-400 text-sm">{item.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">
                          KES {Number(item.amount).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dark-600 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">
                        KES{" "}
                        {Number(
                          selectedOrder.total_amount - selectedOrder.delivery_fee
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Delivery Fee</span>
                      <span className="text-white">
                        KES {Number(selectedOrder.delivery_fee).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-medium pt-2 border-t border-dark-600">
                      <span className="text-white">Total</span>
                      <span className="text-white">
                        KES {Number(selectedOrder.total_amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-dark-600">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.status === "delivered"
                          ? "bg-success/20 text-success"
                          : "bg-warning/20 text-warning"
                      }`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() +
                        selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div
                    className={`text-sm ${
                      selectedOrder.payment_status === "paid"
                        ? "text-success"
                        : "text-warning"
                    }`}
                  >
                    Payment:{" "}
                    {selectedOrder.payment_status.charAt(0).toUpperCase() +
                      selectedOrder.payment_status.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

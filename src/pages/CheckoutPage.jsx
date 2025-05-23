import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCreditCard,
  FiPhone,
  FiCheckCircle,
  FiArrowLeft,
  FiDollarSign,
} from "react-icons/fi";
import { useCart } from "../contexts/CartContext";
import { paymentService } from "../services/paymentService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const userId = user?.user_id;
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    // Delivery details
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",

    // MPesa details
    mpesaPhone: "",

    // Card details
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  // const shippingCost = 250;
  // const taxAmount = Math.round(totalAmount * 0.16);
  const orderTotal = totalAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user_id = localStorage.getItem("user_id"); // or wherever you're storing the user
      const order_items = cartItems.map((item) => ({
        product_id: item.productId,
        variation_id: item.variantId,
        quantity: item.quantity.toString(),
        size: item.size || "",
        sub_total: (item.price * item.quantity).toString(),
      }));

      const payload = {
        user_id: userId,
        total_amount: orderTotal.toString(),
        delivery_fee: shippingCost.toString(),
        status: "placed",
        order_items: cartItems.map((item) => ({
          product_id: item.product_id,
          variation_id: item.variation_id,
          quantity: item.quantity,
          size: item.size,
          sub_total: item.price * item.quantity,
        })),
        payment: {
          method: paymentMethod,
          status: paymentMethod === "cash" ? "pending" : "pending",
          phone_number: formData.mpesaPhone || formData.phone || "0712345678",
          ref_id: paymentMethod === "cash" ? "CASH-ORDER" : "",
          date: null,
          amount: orderTotal.toString(),
        },
      };

      const res = await fetch(
        "https://admin.shehena.co.ke/endpoints/api_create_order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!data.success)
        throw new Error(data.message || "Order creation failed");

      setPaymentSuccess(true);
      clearCart();
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };
  
  if (cartItems.length === 0 && !paymentSuccess) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-400 mb-6">
          Add some products to your cart before attempting to checkout.
        </p>
        <Link to="/" className="btn btn-accent">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
          <FiCheckCircle className="h-10 w-10 text-success" />
        </div>
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          {paymentMethod === "cash"
            ? "Order Placed Successfully"
            : "Payment Successful"}
        </h2>
        <p className="text-gray-300 mb-8 max-w-md">
          {paymentMethod === "cash"
            ? "Thank you for your order! Our delivery team will contact you shortly for payment collection."
            : "Thank you for your order! Your payment has been processed successfully. You will receive a confirmation email shortly."}
        </p>
        <Link to="/" className="btn btn-accent">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        to="/cart"
        className="inline-flex items-center text-gray-300 hover:text-accent-400 transition-colors"
      >
        <FiArrowLeft className="mr-2" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-display font-bold text-white">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Delivery Information */}
            {/* <div className="bg-dark-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Delivery Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="input w-full"
                  />
                </div>
              </div>
            </div> */}

            {/* Payment Method */}
            <div className="bg-dark-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Payment Method
              </h2>

              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mpesa")}
                  className={`flex items-center p-4 rounded-lg border ${
                    paymentMethod === "mpesa"
                      ? "border-accent-500 bg-dark-600"
                      : "border-dark-600 hover:border-dark-500"
                  }`}
                >
                  <FiPhone
                    className={`h-5 w-5 mr-3 ${
                      paymentMethod === "mpesa"
                        ? "text-accent-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      paymentMethod === "mpesa" ? "text-white" : "text-gray-300"
                    }`}
                  >
                    M-Pesa
                  </span>
                </button>

                {/* <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center p-4 rounded-lg border ${
                    paymentMethod === "card"
                      ? "border-accent-500 bg-dark-600"
                      : "border-dark-600 hover:border-dark-500"
                  }`}
                >
                  <FiCreditCard
                    className={`h-5 w-5 mr-3 ${
                      paymentMethod === "card"
                        ? "text-accent-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      paymentMethod === "card" ? "text-white" : "text-gray-300"
                    }`}
                  >
                    Credit/Debit Card
                  </span>
                </button> */}

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex items-center p-4 rounded-lg border ${
                    paymentMethod === "cash"
                      ? "border-accent-500 bg-dark-600"
                      : "border-dark-600 hover:border-dark-500"
                  }`}
                >
                  <FiDollarSign
                    className={`h-5 w-5 mr-3 ${
                      paymentMethod === "cash"
                        ? "text-accent-500"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      paymentMethod === "cash" ? "text-white" : "text-gray-300"
                    }`}
                  >
                    Cash on Delivery
                  </span>
                </button>
              </div>

              {/* M-Pesa Payment Fields */}
              {paymentMethod === "mpesa" && (
                <div>
                  <p className="text-gray-300 mb-4">
                    Enter your M-Pesa phone number to receive payment prompt.
                  </p>

                  <div>
                    <label
                      htmlFor="mpesaPhone"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      M-Pesa Phone Number
                    </label>
                    <input
                      type="tel"
                      id="mpesaPhone"
                      name="mpesaPhone"
                      value={formData.mpesaPhone}
                      onChange={handleChange}
                      placeholder="e.g. 0712345678"
                      required={paymentMethod === "mpesa"}
                      className="input w-full"
                    />
                  </div>
                </div>
              )}

              {/* Card Payment Fields */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      required={paymentMethod === "card"}
                      className="input w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cardholderName"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardholderName"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleChange}
                      required={paymentMethod === "card"}
                      className="input w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        required={paymentMethod === "card"}
                        className="input w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        required={paymentMethod === "card"}
                        className="input w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cash Payment Notice */}
              {paymentMethod === "cash" && (
                <div className="bg-dark-600 p-4 rounded-lg">
                  <p className="text-gray-300 text-sm">
                    Pay with cash upon delivery. Our delivery team will collect
                    the payment when they deliver your order. Please ensure you
                    have the exact amount ready.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-accent-500 text-dark-900 text-center rounded-md font-medium hover:bg-accent-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Processing...</span>
                </div>
              ) : paymentMethod === "cash" ? (
                "Place Order - Pay on Delivery"
              ) : (
                `Pay KES ${orderTotal}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-dark-700 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-display font-bold text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div className="flex items-start">
                    <span className="text-accent-500 mr-2">
                      {item.quantity}x
                    </span>
                    <span className="text-gray-300">
                      {item.name} ({item.size})
                    </span>
                  </div>
                  <span className="text-white">
                    KES {item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-dark-600 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal(tax inclusive)</span>
                <span className="text-white">KES {totalAmount}</span>
              </div>
              {/* <div className="flex justify-between">
                <span className="text-gray-300">Shipping</span>
                <span className="text-white">KES {shippingCost}</span>
              </div> */}
              {/* <div className="flex justify-between">
                <span className="text-gray-300">Tax (16%)</span>
                <span className="text-white">KES {taxAmount}</span>
              </div> */}
            </div>

            <div className="border-t border-dark-600 mt-4 pt-4 flex justify-between items-center">
              <span className="text-lg text-white font-semibold">Total</span>
              <span className="text-xl text-accent-400 font-bold">
                KES {orderTotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

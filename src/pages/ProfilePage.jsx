import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiEdit2, FiShoppingBag, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const API_BASE_URL = import.meta.env.VITE_API_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_URL;

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [sending, setSending] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold text-white">
        Your Account
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-dark-700 rounded-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center mb-4">
                <FiUser className="h-10 w-10 text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {user?.bar_name }
              </h2>
              <p className="text-gray-400 text-sm">
                {user?.user_email }
              </p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === "profile"
                    ? "bg-dark-600 text-accent-400"
                    : "text-gray-300 hover:bg-dark-600 hover:text-white"
                }`}
              >
                <FiUser className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </button>

              <Link 
                to="/orders"
                className="w-full flex items-center p-3 rounded-md transition-colors text-gray-300 hover:bg-dark-600 hover:text-white"
              >
                <FiShoppingBag className="h-5 w-5 mr-3" />
                <span>Order History</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-md text-error hover:bg-dark-600 transition-colors"
              >
                <FiLogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Profile Information
                  </h2>
                  <button className="text-primary-400 hover:text-primary-300 flex items-center">
                    <FiEdit2 className="h-4 w-4 mr-1" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Business Name
                    </h3>
                    <p className="text-white">
                      {user?.bar_name}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Email
                    </h3>
                    <p className="text-white">
                      {user?.user_email }
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Phone
                    </h3>
                    <p className="text-white">{user?.user_phone}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">
                      Member Since
                    </h3>
                    <p className="text-white">
                      {user?.user_date_created
                        ? new Date(user.user_date_created).toLocaleDateString(
                            "en-KE",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Unknown"}
                    </p>
                  </div>
                </div>

                {/* <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Default Delivery Address
                  </h2>

                  <div className="p-4 border border-dark-600 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">Home</h3>
                      <button className="text-primary-400 hover:text-primary-300 text-sm">
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-300">123 Liquor Lane, Westlands</p>
                    <p className="text-gray-300">Nairobi</p>
                    <p className="text-gray-300">Kenya</p>
                  </div>
                </div> */}

                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    Account Settings
                  </h2>

                  <div className="space-y-4">
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="text-primary-400 hover:text-primary-300 block"
                    >
                      Change Password
                    </button>
                    <button className="text-error hover:text-error/80 block">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Password Modal */}
            {showPasswordModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-dark-700 p-6 rounded-lg w-full max-w-md shadow-lg relative">
                  <button
                    onClick={() => {
                      setShowPasswordModal(false);
                      setStep(1);
                      setIdentifier("");
                      setVerificationCode("");
                      setNewPassword("");
                      setResponseMsg("");
                    }}
                    className="absolute top-2 right-2 text-white"
                  >
                    ✕
                  </button>

                  {/* STEP 1: SEND VERIFICATION CODE */}
                  {step === 1 && (
                    <>
                      <h2 className="text-xl font-semibold text-white mb-4">
                        Reset Password
                      </h2>
                      <p className="text-gray-300 text-sm mb-4">
                        Enter your email or phone number to receive a
                        verification code.
                      </p>
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Email or Phone"
                        className="input w-full mb-4"
                      />
                      <button
                        onClick={async () => {
                          setSending(true);
                          setResponseMsg("");
                          try {
                            const res = await fetch(
                              `${API_BASE_URL}/api_reset_password.php`,
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  user_email: identifier,
                                }),
                              }
                            );
                            const data = await res.json();
                            if (data.success) setStep(2);
                            setResponseMsg(data.message || "Check your inbox.");
                          } catch (err) {
                            setResponseMsg("Error sending verification code.");
                          } finally {
                            setSending(false);
                          }
                        }}
                        disabled={sending || !identifier}
                        className="btn btn-accent w-full"
                      >
                        {sending ? "Sending..." : "Send Verification Code"}
                      </button>
                    </>
                  )}

                  {/* STEP 2: VERIFY CODE */}
                  {step === 2 && (
                    <>
                      <h2 className="text-xl font-semibold text-white mb-4">
                        Verify Code
                      </h2>
                      <p className="text-gray-300 text-sm mb-4">
                        Enter the 4-digit code sent to your phone or email.
                      </p>
                      <input
                        type="text"
                        maxLength={4}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="4-digit code"
                        className="input w-full mb-4"
                      />
                      <button
                        onClick={async () => {
                          setSending(true);
                          setResponseMsg("");
                          try {
                            const res = await fetch(
                              `${API_BASE_URL}/api_verify_code.php`,
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  phone: identifier,
                                  verification_code: verificationCode,
                                  reset_password: true,
                                }),
                              }
                            );
                            const data = await res.json();
                            setResponseMsg(data.message);
                            if (data.success) setStep(3);
                          } catch (err) {
                            setResponseMsg("Verification failed.");
                          } finally {
                            setSending(false);
                          }
                        }}
                        disabled={sending || verificationCode.length !== 4}
                        className="btn btn-accent w-full"
                      >
                        {sending ? "Verifying..." : "Verify Code"}
                      </button>
                    </>
                  )}

                  {/* STEP 3: SET NEW PASSWORD */}
                  {step === 3 && (
                    <>
                      <h2 className="text-xl font-semibold text-white mb-4">
                        Set New Password
                      </h2>
                      <p className="text-gray-300 text-sm mb-4">
                        Enter your new password.
                      </p>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="input w-full mb-4"
                      />
                      <button
                        onClick={async () => {
                          setSending(true);
                          setResponseMsg("");
                          try {
                            const res = await fetch(
                              `${API_BASE_URL}/api_update_password.php`,
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  user_email: identifier,
                                  user_password: newPassword,
                                }),
                              }
                            );
                            const data = await res.json();
                            setResponseMsg(data.message);
                            if (data.success) {
                              // Optionally close modal or redirect
                              setTimeout(() => {
                                setShowPasswordModal(false);
                              }, 1000);
                            }
                          } catch (err) {
                            setResponseMsg("Failed to update password.");
                          } finally {
                            setSending(false);
                          }
                        }}
                        disabled={sending || newPassword.length < 4}
                        className="btn btn-accent w-full"
                      >
                        {sending ? "Updating..." : "Update Password"}
                      </button>
                    </>
                  )}

                  {responseMsg && (
                    <p className="text-sm text-accent-400 mt-4">
                      {responseMsg}
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage
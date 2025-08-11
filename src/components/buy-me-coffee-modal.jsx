// components/buy-me-coffee-modal.jsx

"use client"

import { useState, useEffect } from "react"

const BuyMeCoffeeModal = ({ isOpen, onClose, onConfirmPayment }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [amount, setAmount] = useState(100) // Default amount
  const [isProcessing, setIsProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState("")

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setPhoneNumber("")
      setAmount(100)
      setIsProcessing(false)
      setShowConfirmation(false)
      setConfirmationMessage("")
    }
  }, [isOpen])

  const handleConfirm = async () => {
    if (!phoneNumber || !amount) return

    setIsProcessing(true)

    // Simulate the M-Pesa STK Push
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Simulate API call and success/failure
    const success = Math.random() > 0.1 // 90% chance of success
    if (success) {
      setConfirmationMessage("M-Pesa STK Push sent to your phone. Please enter your PIN to complete the transaction.")
      onConfirmPayment(amount, phoneNumber)
    } else {
      setConfirmationMessage("Failed to initiate payment. Please check your phone number and try again.")
    }

    setIsProcessing(false)
    setShowConfirmation(true)

    setTimeout(() => {
      onClose()
    }, 5000)
  }

  const isValidPhone = phoneNumber.startsWith("07") && phoneNumber.length === 10

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="text-xl font-bold mb-4 text-center text-emerald-400">Buy Hamza a Coffee ☕</h3>
        {showConfirmation ? (
          <div>
            <p className="text-center mb-4">{confirmationMessage}</p>
            <p className="text-center text-sm text-gray-400">This is a simulation. The terminal will update shortly.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-4 text-sm">
              Support my work by sending a virtual coffee via M-Pesa. This is a secure,
              simulated payment flow that demonstrates a full-stack capability.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-1">M-Pesa Phone Number (e.g., 0712345678)</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="07..."
                  className="bg-zinc-950/70 border-zinc-700/50 focus:border-emerald-400"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">Amount (KSH)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="1"
                  className="bg-zinc-950/70 border-zinc-700/50 focus:border-emerald-400"
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={onClose}
                className="bg-zinc-800 text-gray-300 hover:bg-zinc-700 px-4 py-2 rounded transition-colors"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-emerald-500 text-black font-bold hover:bg-emerald-400 px-4 py-2 rounded transition-colors"
                disabled={isProcessing || !isValidPhone || amount < 1}
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BuyMeCoffeeModal
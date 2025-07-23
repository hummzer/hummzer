"use client"

import { useState } from "react"

export default function BuyMeCoffeeModal({ isOpen, onClose, onConfirmPayment }) {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleConfirm = async () => {
    const parsedAmount = Number.parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Please enter a valid amount.")
      return
    }

    setIsLoading(true)
    await onConfirmPayment(parsedAmount)
    setIsLoading(false)
    setAmount("") // Clear amount after transaction
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-xl font-bold mb-4 text-center">Buy Hamza a Coffee! ☕</h2>
        <p className="text-sm text-center mb-4">Enter an amount to send via simulated M-Pesa.</p>
        <label htmlFor="coffee-amount" className="block text-sm font-medium mb-1">
          Amount (KSH):
        </label>
        <input
          id="coffee-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 100"
          min="1"
          step="any"
          className="mb-4"
          disabled={isLoading}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    </div>
  )
}

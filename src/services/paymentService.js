// Mock payment service - to be replaced with actual payment gateway integration

export const paymentService = {
  // Process M-Pesa payment
  processMpesaPayment: async (phoneNumber, amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validate phone number (simple validation for demo)
        if (!phoneNumber || phoneNumber.length < 10) {
          reject(new Error('Invalid phone number'))
          return
        }
        
        // Validate amount
        if (!amount || amount <= 0) {
          reject(new Error('Invalid amount'))
          return
        }
        
        // Simulate successful payment
        resolve({
          success: true,
          transactionId: 'MP' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          message: 'Payment successful',
          timestamp: new Date().toISOString()
        })
      }, 2000) // Simulate network delay
    })
  },
  
  // Process card payment
  processCardPayment: async (cardDetails, amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { cardNumber, expiryDate, cvv, cardholderName } = cardDetails
        
        // Basic validation
        if (!cardNumber || cardNumber.length < 16) {
          reject(new Error('Invalid card number'))
          return
        }
        
        if (!expiryDate || !cvv || !cardholderName) {
          reject(new Error('All card details are required'))
          return
        }
        
        if (!amount || amount <= 0) {
          reject(new Error('Invalid amount'))
          return
        }
        
        // Simulate successful payment
        resolve({
          success: true,
          transactionId: 'CD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          message: 'Payment successful',
          timestamp: new Date().toISOString()
        })
      }, 2000) // Simulate network delay
    })
  },
  
  // Verify payment status
  verifyPayment: async (transactionId) => {
    return new Promise(resolve => {
      setTimeout(() => {
        // Simulate payment verification
        resolve({
          transactionId,
          status: 'completed',
          amount: 2500,
          currency: 'KES',
          paymentMethod: transactionId.startsWith('MP') ? 'M-Pesa' : 'Card',
          timestamp: new Date().toISOString()
        })
      }, 1000)
    })
  }
}
const PaymentService = require('../services/PaymentService');

/**
 * Payment Controller - handles HTTP requests for payments
 */
class PaymentController {
  /**
   * Process payment endpoint
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async processPayment(req, res) {
    try {
      const result = await PaymentService.processPayment(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      // Log the error for audit trail
      console.error(`Payment processing failed: ${error.message}`);
      res.status(400).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
}

module.exports = new PaymentController();

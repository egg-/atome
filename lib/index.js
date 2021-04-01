'use strict'

const Client = require('./client')

module.exports = class {
  constructor (username, password, environment) {
    this.client = new Client(username, password, environment)
  }

  /**
   * check the configuration on merchant site.
   * @param {object} params
   * @param {string} [params.callbackUrl] Optional, use to check the connectivity between Atome server and your endpoint(in case the callback may be blocked by firewall etc). Atome will give this endpoint a POST request, and identify 20x status code as success.
   * @param {string} params.countryCode Enum: "SG" "HK" "MY" "ID" "TH" use to check the country setting. Two digit country code using ISO-3611 format.
   * @param {function} cb
   */
  auth (params, cb) {
    this.client.post('/v2/auth', params, cb)
  }

  /**
   * create new payment.
   * payment will be automatically cancelled in 12 hours, if payment has not been paid yet.
   * @param {object} params
   * @param {string} params.referenceId must be [0-9a-zA-Z-]{1,40}
   * @param {string} params.currency Enum: "SGD" "HKD" "MYR" "IDR" "THB"
   * @param {integer} params.amount Amount intended to be collected by this payment. A positive integer representing how much to charge in the smallest currency unit. For example:
   SGD: in cents. 1234 stands for S$12.34 (Minimum amount S$10.00)
   HKD: in cents. 1234 stands for HK$12.34 (Minimum amount HK$50.00)
   MYR: in sen. 1234 stands for RM12.34 (Minimum amount RM25.00)
   IDR: in rupiah. 1234 stands for Rp1,234 (Minimum amount Rp100,000)
   THB: in satang. 1234 stangds for ฿12.34 (Minimum amount ฿100.00)
   * @param {string} params.callbackUrl a callback API will be sent to the specified url when there is any update of payment.
   * @param {string} params.paymentResultUrl Atome payment gateway will redirect to this url if payment succeed.
   * @param {string} [params.paymentCancelUrl] Atome payment gateway will redirect user to this url if the user leave the payment process.
   * @param {string} [params.merchantReferenceId] Your order id, if you want to search a order in our merchant portal.
   * @param {object} params.customerInfo more info about this customer. To make the payment process easier, Atome will prefill the form with customer's information in payment process.
   * @param {string} params.customerInfo.mobileNumber customer's mobile number, formatted in E.164 standard. e.x. Singapore phone number +6587654321
   * @param {string} params.customerInfo.fullName customer's full name.
   * @param {string} [params.customerInfo.email] customer's email
   * @param {object} params.shippingAddress
   * @param {string} params.shippingAddress.countryCode Enum: "SG" "HK" "MY" "TH"
   * @param {array} params.shippingAddress.lines address lines.
   * @param {string} params.shippingAddress.postCode postcode (It is optional in Hong Kong region)
   * @param {string} [params.shippingAddress.selfPickUp] If it is true, shipping address is pickup point address
   * @param {object} params.billingAddress
   * @param {string} params.billingAddress.countryCode Enum: "SG" "HK" "MY" "TH"
   * @param {array} params.billingAddress.lines address lines.
   * @param {string} params.billingAddress.postCode postcode
   * @param {integer} [params.taxAmount] the tax part of total amount . Same format as field amount
   * @param {integer} [params.shippingAmount] shipping fee part of total amount. Same format as field amount.
   * @param {integer} [params.originalAmount] the amount before discount if there is any discount. Same format as field amount.
   * @param {string} [params.voucherCode] Any voucher code applied
   * @param {array} params.items detailed information about order items.
   * @param {string} params.items[].itemId ID of this product/sku.
   * @param {string} params.items[].name name of the item
   * @param {integer} params.items[].quantity quantity of the item
   * @param {integer} params.items[].price selling price of the item. Same format as field amount.
   * @param {string} [params.items[].variationName] name of specific variation.
   * @param {integer} [params.items[].originalPrice] price before discount. Same format as field amount.
   * @param {array} [params.items[].categories] categories of the item
   * @param {object} [params.additionalInfo] You can put necessary data in here if above fields don't meet your needs
   * @param {function} cb
   */
  create (params, cb) {
    this.client.post('/v2/payments', params, cb)
  }

  /**
   * Get payment information
   * @param {string} referenceId
   */
  get (referenceId, cb) {
    this.client.get(`/v2/payments/${referenceId}`, {}, cb)
  }

  /**
   * Refund payment
   * Refund full/partial amount of this payment to customer.
   * This api is syncronous (will return after the refund has done).
   * The currency of refundAmount is the same as what is in the payment.
   * Input your end refundId can achieve idempotent
   * @param {string} referenceId
   * @param {object} params
   * @param {integer} parmas.refundAmount
   * @param {string} [parmas.refundId] must be [0-9a-zA-Z-]{1,40}
   * @param {function} cb
   */
  refund (referenceId, params, cb) {
    this.client.post(`/v2/payments/${referenceId}/refund`, params, cb)
  }

  /**
   * Cancel payment
   * Cancel this payment. You can only cancel payment before user has paid.
   * @param {string} referenceId
   * @param {function} cb
   */
  cancel (referenceId, cb) {
    this.client.post(`/v2/payments/${referenceId}/cancel`, {}, cb)
  }
}

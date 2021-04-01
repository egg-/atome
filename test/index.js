/* globals it describe */

'use strict'

const assert = require('assert')

const Atome = require('../lib')

describe('atome', () => {
  const config = require('../config.json')
  const atome = new Atome(config.username, config.password)

  // test data
  const dummyPayment = require('./fixtures/payment.json')

  it('auth', (done) => {
    atome.auth({ countryCode: config.countryCode }, (err, data) => {
      assert.strictEqual(err, null)
      assert.strictEqual(data.code, 'SUCCESS')

      done()
    })
  })

  dummyPayment.referenceId = 'P' + (new Date()).getTime()
  dummyPayment.merchantReferenceId = dummyPayment.referenceId

  it('create payment', (done) => {
    atome.create(dummyPayment, (err, data) => {
      console.info(err, data)

      assert.strictEqual(err, null)
      assert.strictEqual(data.status, 'PROCESSING')

      done()
    })
  })

  it('get payment information', (done) => {
    atome.get(dummyPayment.referenceId, (err, data) => {
      console.info(err, data)

      assert.strictEqual(err, null)

      done()
    })
  })

  it('cancel payment', (done) => {
    atome.cancel(dummyPayment.referenceId, (err, data) => {
      console.info(err, data)

      assert.strictEqual(err, null)

      done()
    })
  })

  if (config.paidReferenceId) {
    it('get paid information', (done) => {
      atome.get(config.paidReferenceId, (err, data) => {
        console.info(err, data)

        assert.strictEqual(err, null)

        done()
      })
    })
    it('refund payment', (done) => {
      atome.refund(config.paidReferenceId, { refundAmount: 100 }, (err, data) => {
        console.info(err, data)

        assert.strictEqual(err, null)

        done()
      })
    })
  }
})

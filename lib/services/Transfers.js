/**
 * @module Transfers
 * @desc [MangoPay Transfers API Reference](https://docs.mangopay.com/api-references/transfers/)
 */

var Service = require('../service');

var Transfer = require('../models/Transfer');
var Refund = require('../models/Refund');

var Transfers = Service.extend({
    /**
     * Create new transfer
     * @param {Object}  transfer    Transfer object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}            Request promise
     */
    create: function(transfer, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: transfer,
            dataClass: Transfer
        });

        return this._api.method('transfers_create', callback, options);
    },

    /**
     * Get transfer
     * @param {number}  transferId      Transfer identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}                Request promise
     */

    mango.wallet.fetchTransfer({
        Id: "1167492", // Required
    }, function(err, transfer, res){
        console.log('err', err);
        console.log('transfer', transfer);
        console.log('res', res.statusCode);
    }),

    /**
    * Get transfer
    * @param {number}  transferId      Transfer identifier
    * @param {Function} callback    Callback function
    * @param {Object} options    Request options
    * @return {Object}                Request promise
    */

    get: function(transferId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: transferId
            },
            dataClass: Transfer
        });

        return this._api.method('transfers_get', callback, options);
    },

    /**
     * Create refund for transfer object
     * @param {number}  transferId  Transfer identifier
     * @param {Object}  refund      Refund object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}            Request promise
     */

    mango.wallet.transfer({
        AuthorId : "1167495", // Required
        DebitedFunds: {Currency : "EUR", Amount : 1000}, // Required
        Fees : {Currency : "EUR", Amount : 100}, // Required, default 'EUR' and 0
        DebitedWalletID : "1167496", // Required (Where the funds are held before the transfer)
        CreditedWalletID : "1167504", // Required (Where the funds will be held after the transfer)
        CreditedUserId : "1167502",
        Tag : "DefaultTag"
    }, function(err, transfer, res){
        console.log('err', err);
        console.log('transfer', transfer);
        console.log('res', res.statusCode);
    }),

    /**
    * Create refund for transfer object
    * @param {number}  transferId  Transfer identifier
    * @param {Object}  refund      Refund object
    * @param {Function} callback    Callback function
    * @param {Object} options    Request options
    * @return {Object}            Request promise
    */
    createRefund: function(transferId, refund, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: refund,
            path: {
                id: transferId
            },
            dataClass: Refund
        });

        return this._api.method('transfers_createrefunds', callback, options);
    }
});

module.exports = Transfers;
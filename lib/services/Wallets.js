/**
 * @module Wallets
 * @desc [MangoPay Wallets API Reference](https://docs.mangopay.com/api-references/wallets/)
 */
var Service = require('../service');

var Wallet = require('../models/Wallet');
var Transaction = require('../models/Transaction');

var Wallets = Service.extend({
    /**
     * Create new wallet
     * @param {Object}  wallet   Wallet object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    mango.wallet.create({
        Owners: ["1167492"], // Required
        Description: "A very cool wallet", // Required, default: 'wallet'
        Currency: "EUR", // Required, default: 'EUR'
        Tag: "your custom tag"
}, function(err, wallet, res){
        console.log('err', err);
        console.log('wallet', wallet);
        console.log('res', res.statusCode);
    }),
    /**
     * Create new wallet
     * @param {Object}  wallet   Wallet object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */

    create: function(wallet, callback, options) {
        options = this._api._getOptions(callback, options, {
            data: wallet,
            dataClass: Wallet
        });

        return this._api.method('wallets_create', callback, options);
    },

    /**
     * Get pay-in
     * @param {number}  walletId Wallet identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}         Request promise
     */
    get: function(walletId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: walletId
            },
            dataClass: Wallet
        });

        return this._api.method('wallets_get', callback, options);
    },

    /**
     * Update wallet
     * @param {Object}  wallet  Wallet object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */

    mango.wallet.fetch({
        Id: "1167492", // Required
    }, function(err, wallet, res){
        console.log('err', err);
        console.log('wallet', wallet);
        console.log('res', res.statusCode);
    }),

    /**
     * Update wallet
     * @param {Object}  wallet  Wallet object
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}        Request promise
     */

    update: function(wallet, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: wallet.Id
            },
            data: wallet,
            dataClass: Wallet
        });

        return this._api.method('wallets_save', callback, options);
    },

    /**
     * Get transactions for the wallet
     * @param {number}  walletId    Wallet identifier
     * @param {Function} callback    Callback function
     * @param {Object} options    Request options
     * @return {Object}            Request promise
     */

    mango.wallet.transactions({
        Id: "123456789", // Required
    }, function(err, transaction, res){
        console.log('err', err);
        console.log('transaction', transcation);
        console.log('res', res.statusCode);
    }),

    /**
    * Get transactions for the wallet
    * @param {number}  walletId    Wallet identifier
    * @param {Function} callback    Callback function
    * @param {Object} options    Request options
    * @return {Object}            Request promise
    */
    getTransactions: function(walletId, callback, options) {
        options = this._api._getOptions(callback, options, {
            path: {
                id: walletId
            },
            dataClass: Transaction
        });

        return this._api.method('wallets_alltransactions', callback, options);
    }
});

module.exports = Wallets;
var _ = require('underscore');
var Transaction = require('./Transaction');
var RefundReasonDetails = require('./RefundReasonDetails');

var Refund = Transaction.extend({
    defaults: _.extend({}, Transaction.prototype.defaults, {
        InitialTransactionId: null,

        /**
         * Initial transaction Type {PAYIN, PAYOUT, TRANSFER}
         */

        mango.wallet.createRefund({
            Id: "1122477",        // Required (The ID of the Transfer)
            AuthorId: "1167492",  // Required (The user ID of the Transfer transaction’s author)
        }, function(err, refund, res){
            console.log('err', err);
            console.log('refund', refund);
            console.log('res', res.statusCode);
        })),

        /**
         * Initial transaction Type {PAYIN, PAYOUT, TRANSFER}
         */

        InitialTransactionType: null,
        DebitedWalletId: null,
        CreditedWalletId: null,
        RefundReason: null
    }),

    getSubObjects: function() {
        return {
            'RefundReason': RefundReasonDetails
        }
    }
});

module.exports = Refund;
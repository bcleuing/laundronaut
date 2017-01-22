/**
 * Created by anson on 7/11/2016.
 */
Template.ConfirmActionModal.onRendered(function () {
    $('.confirmActionModalConfirm').on('click', function () {
        callBackFunction();
        Session.set('confirmActionMessage', undefined);
    });
});
Template.ConfirmActionModal.helpers({
    confirmMessage: function () {
        return Session.get('confirmActionMessage');
    }
});
Template.ConfirmActionModal.events({
});
showConfirmActionModal = function (confirmMessage, callbackAction) {
    check(confirmMessage, String);
    Session.set('confirmActionMessage', confirmMessage);
    $('#confirmActionModal').modal('show');
    callBackFunction = callbackAction;
};

var callBackFunction;
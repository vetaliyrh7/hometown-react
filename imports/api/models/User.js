import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { serverFn } from '../lib';

export const User = {
    get:            () => Meteor.user() || {},
    id:             () => Meteor.userId(),
    isLoggedIn:     () => !!Meteor.userId(),
    isLoggedOut:    () => !User.isLoggedIn(),
    profile:        () => User.get().profile,
    create:         (opts, callback) => Accounts.createUser(opts, callback)
};

export const ChangeUsername = serverFn('ChangeUsername', true, function (value) {
    if(value.length >= 4) {
        return Meteor.users.update({_id: Meteor.userId()}, {
            $set: {
              'username': value
            }
        });
    }
    else throw new Error("Login must contain at least 4 characters!");
});

export const ChangeEmail = serverFn('ChangeEmail', true, function (value) {
    var regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regExp.test(value)) {
        return Meteor.users.update({_id: Meteor.userId()}, {
            $set: {
              'emails.0.address': value
            }
        });
    }
    else throw new Error("Wrong EMAIL format!");
});
//
export const ChangePassWord = (oldPass, newPass, success, fail) => {
    Accounts.changePassword(oldPass, newPass, (error, result) => {
      if (typeof error === 'undefined' && typeof result === 'undefined') {
        return success("Password changing: Password changed successfully!");
      } else if (error) {
        return fail('Password changing: Error while changing Password - ' + error.reason);
      }
    });
};

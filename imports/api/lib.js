import { Meteor } from 'meteor/meteor';
import Promise from 'promise';


export function serverFn(name, onlyServer, fn) {
    if (!onlyServer || Meteor.isServer) {
        var methods = {};
        methods[name] = fn;
        Meteor.methods(methods);
    }

    if (Meteor.isServer) {
        return fn;
    } else {
        return (...args) => new Promise((resolve, reject) => {
            var callback = [(err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            }];
            Meteor.call.apply(this, [name].concat(args).concat(callback));
        });
    }
}

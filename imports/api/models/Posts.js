import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { serverFn } from '../lib';
import _ from 'lodash';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    Posts._ensureIndex({
      'postName': 'text'
    });

    Meteor.publish('posts', function() {
        this.autorun(function() {
            return Posts.find();
        });
    });
}

// export const pagination = serverFn('pagination', true, function (type, limit, data) {
//   console.log("ServerSide", type, limit, data);
//     Posts.find({type: type}, {limit: limit, skip: data.selected * limit}).fetch();
// });

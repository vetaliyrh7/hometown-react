import { Meteor } from 'meteor/meteor';
import { FS } from 'meteor/cfs:base-package';
import {GridFS } from 'meteor/cfs:gridfs';
import { serverFn } from '../lib';
import _ from 'lodash';

import { Tracker } from 'meteor/tracker';

export const Images = new FS.Collection('Images', {
  stores: [new FS.Store.GridFS('Images', {})]
});

Images.allow({
  insert: (userId, file) => {
    return true;
  },
  update: (userId, file, fieldNames, modifier) => {
    return true;
  },
  remove: (userId, file) => {
    return true;
  },
  download: (userId) => {
    return true;
  }
});

if (Meteor.isServer) {
    Meteor.publish('images', function() {
        this.autorun(function() {
            return Images.find();
        });
    });
}

export const loadImage = function (id) {
  var file = Images.findOne({_id: id});
  return file ? file.url() : '/images/image-not-found.png';
};

export const uploadImg = function (file) {
  return Images.insert(file, function (err, fileObj) {
    //   var start = new Date().getTime();
      progress(fileObj._id);


    console.log(fileObj, fileObj.isUploaded())
    // while(!fileObj.isUploaded()) {
    //     console.log(fileObj.uploadProgress());
    // }
      // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
  });
};

export const progress = serverFn('progress', true, function(fileId, start){
    var file = Images.findOne(fileId);
    console.log(file.uploadProgress());
    file.once('stored', Meteor.bindEnvironment(function() {
      console.log(file.uploadProgress());
        // if(file.isUploaded() === true) {
        //     var end = new Date().getTime();
        //     var time = end - start;
        //     console.log("isUploaded??", file.isUploaded());
        //     console.log("EXEC_TIME", time);
        // }
    }));
});

// export const uploadImg = serverFn('uploadImg', true, function (val, files) {
//   console.log("ServerSide", val, files);
//   _.forEach(files, (file) => {
//       Images.insert(file, function (err, fileObj) {
//           console.log("FILES OBJ", fileObj);
//           // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
//       });
//   });
// });

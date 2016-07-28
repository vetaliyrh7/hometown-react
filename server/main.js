import { Meteor } from 'meteor/meteor';
import { Posts } from '../imports/api';
import '../imports/startup/server/main.js';

Meteor.startup(() => {
  // code to run on server at startup
  if (Posts.find().count() === 0) {
      var posts = [{
          title: 'Test1!',
          subtitle: 'New looks at common things',
          creator: 'Vitaliy Kononenko',
          role: 'admin',
          shortText: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          text: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          phone: "022919418238",
          creationDate: new Date(),
          links: "links",
          type: "News",
          cover: 'http://placehold.it/350x150'
      },
      {
          title: 'Test2',
          subtitle: 'New looks at common things',
          creator: 'Vitaliy Kononenko',
          role: 'admin',
          shortText: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          text: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          phone: "022919418238",
          creationDate: new Date(),
          links: "links",
          type: "News",
          cover: 'http://placehold.it/350x150'
      },
      {
          title: 'Test3!',
          subtitle: 'New looks at common things',
          creator: 'Vitaliy Kononenko',
          role: 'admin',
          shortText: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          text: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          phone: "022919418238",
          creationDate: new Date(),
          links: "links",
          type: "News",
          cover: 'http://placehold.it/350x150'
      },
      {
          title: 'Our web-site has started!',
          subtitle: 'New looks at common things',
          creator: 'Vitaliy Kononenko',
          role: 'admin',
          shortText: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          text: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          phone: "022919418238",
          creationDate: new Date(),
          links: "links",
          type: "News",
          cover: 'http://placehold.it/350x150'
      },
      {
          title: 'Developer chat is up!',
          subtitle: 'Now you can speak with Hometown developers',
          creator: 'Vitaliy Kononenko',
          role: 'admin',
          shortText: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          text: 'I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.',
          phone: "022919418238",
          creationDate: new Date(),
          links: "links",
          type: "News",
          cover: 'http://placehold.it/350x150'
      }
      ];

      for (var i = 0; i < posts.length; i++) {
          Posts.insert(posts[i]);
      }
  }
});

const { User, Session } = require('../../../database');
const sessionData = require('../../../client/src/components/Payment/sampleData/session.js');

module.exports = {
  seedUser: (req, res) => {
    const userData = [
      {
        username: 'Jamie Builder',
        email: 'jamieb@gmail.com',
        user_id: 10,
        password: '1x23577gasrtty3456xhg',
        photo_url:'https://cdn-icons-png.flaticon.com/512/219/219969.png',
        friends: [100, 120]
      },
      {
        username: 'Chris Handy',
        email: 'chrish@gmail.com',
        user_id: 100,
        password: '1x23577asetahwe3456xhg',
        photo_url:'https://cdn-icons-png.flaticon.com/512/236/236832.png',
        friends: [10, 120]
      },
      {
        username: 'Leslie Ross',
        email: 'leslier@gmail.com',
        user_id: 120,
        password: '28hwetsawe56xhg',
        photo_url:'https://cdn-icons-png.flaticon.com/512/2021/2021646.png',
        friends: [10, 100]
      },
      {
        username: 'Dennis Ross',
        email: 'dennisr@gmail.com',
        user_id: 50,
        password: '1x2gaweyfhs367d',
        photo_url:'https://cdn-icons-png.flaticon.com/512/847/847969.png',
        friends: [51]
      },
      {
        username: 'Tan Ross',
        email: 'tanr@gmail.com',
        user_id: 51,
        password: 'aswteahw21x2assd',
        photo_url:'https://cdn-icons-png.flaticon.com/512/847/847969.png',
        friends: [50]
      }
    ];

    return User.insertMany(userData)
    .then((results) => {
      console.log('success log user into db');
      return results;
    })
    .catch((err) => {
      console.log('error log user into db', err);
      return null;
    });
  },
  seedSession: (req, res) => {
    // console.log(sessionData);
    const newSession = new Session(sessionData);
    return newSession.save()
    .then((results) => {
      console.log('success log session into db');
      return results;
    })
    .catch((err) => {
      console.log('error log session into db', err);
      return null;
    });
  }
}
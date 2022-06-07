const User = require('../../../database/index.js').User;
const bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {

    User.findOne({ 'email': req.body.email, 'username': req.body.username })
      .then(async (user) => {
        if (!user) {
          const hash = await bcrypt.hash(req.body.password, 8);

          const userId = await User.estimatedDocumentCount() + 1;

          User.create({
            'username': req.body.username,
            'email': req.body.email,
            'user_id': userId,
            'password': hash
          })
            .then(async (user) => {
              const sessionCookie = await bcrypt.hash((user.id + Date.now().toString()), 8);
              createBrowserSession(userId, req.body.email, req.body.username, sessionCookie, res);
            })
            .catch((err) => errorHandler(err, res));

        } else {

          if ((user.email === req.body.email) && (user.username === req.body.username)) {
            res.status(200)
              .json({ message: 'an account with that email and username exists', existingUser: true });
          } else if (user.email === req.body.email) {
            res.status(200)
              .json({ message: 'an account with that email exists', existingUser: true });
          } else if (user.username === req.body.username) {
            res.status(200)
              .json({ message: 'an account with that username exists', existingUser: true });
          }

        }
      })
      .catch((err) => errorHandler(err, res));

  },
  login: (req, res) => {

    User.findOne({ 'email': req.body.email })
      .then((user) => {

        if (!user) {
          res.status(200).json({ message: 'user does not exist', noSuchUser: true });
        } else {

          bcrypt.compare(req.body.password, user.password)
            .then(async (validated) => {
              if (validated) {
                const sessionCookie = await bcrypt.hash((user.id + Date.now().toString()), 8);
                createBrowserSession(user.user_id, user.email, user.username, sessionCookie, res);
              } else {
                res.status(200).json({ message: 'wrong password', wrongPassword: true });
              }
            })
            .catch((err) => errorHandler(err, res));
        }
      })
      .catch((err) => errorHandler(err, res));

  },
  logout: (req, res) => {

    const { token, username, userId } = req.cookies.splitsy;

    User.findOneAndUpdate({ 'session_cookie': token, 'username': username, 'user_id': userId },
      { $pull: { 'session_cookie': token }}
    )
      .then(() => {
        res.clearCookie('splitsy').redirect('/Auth');
      })
      .catch((err) => errorHandler(err, res));

  },
  verifyUser: (cookieData) => {

    const { token, username, userId } = cookieData;

    User.findOne({ 'session_cookie': token, 'username': username, 'user_id': userId })
      .then((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => errorHandler(err, res));

  },
};

const createBrowserSession = (userId, email, username, sessionCookie, res) => {
  User.findOneAndUpdate({ 'email': email, 'username': username, 'user_id': userId },
    { $push: { 'session_cookie': sessionCookie }}
  )
    .then(() => {
      res.status(200)
        .cookie('splitsy',
          { 'token': sessionCookie, 'username': username, 'userId': userId },
          { sameSite: true }
        )
        .json({ message: 'user is logged in', loggedIn: true });
    })
    .catch((err) => errorHandler(err, res));
};

const errorHandler = (error, res) => {
  console.error(error);
  res.status(500).send('server error');
};

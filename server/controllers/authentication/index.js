const User = require('../../../database/index.js').User;
const bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {

    User.findOne({ 'email': req.body.email, 'username': req.body.username })
      .then(async (user) => {
        if (!user) {

          const usernameValid = alphaNumericUnderscore(req.body.username);
          const firstnameValid = alphaNumericHyphen(req.body.firstname);
          const lastnameValid = alphaNumericHyphen(req.body.lastname);
          const passwordValid = req.body.password.length >= 8 && !req.body.password.includes(' ');

          if (usernameValid && firstnameValid && lastnameValid && passwordValid) {

            const hash = await bcrypt.hash(req.body.password, 8);
            const userId = await User.estimatedDocumentCount() + 1;

            User.create({
              'username': req.body.username,
              'firstname': req.body.firstname,
              'lastname': req.body.lastname,
              'email': req.body.email,
              'user_id': userId,
              'password': hash,
              'photo_url': 'https://cdn-icons-png.flaticon.com/512/2021/2021646.png'
            })
              .then(async (user) => {
                const sessionCookie = await bcrypt.hash((user.id + Date.now().toString()), 8);
                createBrowserSession(userId, req.body.email, req.body.username, sessionCookie, res);
              })
              .catch((err) => errorHandler(err, res));

          } else if (!usernameValid) {
            res.status(200)
              .json({ message: 'usernames can only contain alpha-numeric characters and a hyphen', invalidEntry: true });
          } else if (!firstnameValid || !lastnameValid) {
            res.status(200)
              .json({ message: 'firstname/lastname can only contain alpha-numeric characters and an underscore', invalidEntry: true });
          } else if (!passwordValid) {
            res.status(200)
              .json({ message: 'password must be at least 8 characters long with no spaces', invalidEntry: true });
          }

        } else {

          if (user.email === req.body.email) {
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

    if (cookieData.token !== undefined && cookieData.username !== undefined || cookieData.userId !== undefined) {
      const { token, username, userId } = cookieData;
    } else {
      return false
    }


    User.findOne({ 'session_cookie': token, 'username': username, 'user_id': userId })
      .then((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {errorHandler(err, res)});

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

const alphaNumericUnderscore = (string) => {
  const regex = new RegExp('^[a-zA-Z0-9_]+$');
  return regex.test(string);
};

const alphaNumericHyphen = (string) => {
  const regex = new RegExp('^[a-zA-Z0-9-]+$');
  return regex.test(string);
};

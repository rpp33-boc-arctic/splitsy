const User = require('')
const bcrypt = require('bcryptjs');

module.exports = {
  register: (req, res) => {

    User.findOne({ 'email': req.body.email })
      .then(async (user) => {
        if (!user) {
          const hash = await bcrypt.hash(req.body.password, 8);

          User.create({
            'username': req.body.username,
            'email': req.body.email,
            'password': hash
          })
            .then(async (user) => {
              const sessionCookie = await bcrypt.hash((user.id + Date.now().toString()), 8);
              createSession(req.body.email, req.body.username, sessionCookie, res);
            })
            .catch((err) => errorHandler(err, res));

        } else {
          res.status(200).json({ message: 'an account with that email exists', existingUser: true });
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
                createSession(user.email, user.username, sessionCookie, res);
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

    const { token, username } = req.cookies.splitsy;

    User.findOneAndUpdate({ 'session_cookie': token, 'username': username },
      { $pull: { 'session_cookie': token }}
    )
      .then(() => {
        res.clearCookie('splitsy').redirect('/login');
      })
      .catch((err) => errorHandler(err, res));

  },
  verifyUser: (cookieData) => {

    User.findOne({ 'session_cookie': cookieData.token, 'username': cookieData.username })
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

const createSession = (email, username, sessionCookie, res) => {
  User.findOneAndUpdate({ 'email': email, 'username': username },
    { $push: { 'session_cookie': sessionCookie }}
  )
    .then(() => {
      res.status(200)
        .cookie('splitsy', { 'token': sessionCookie, 'username': username }, { sameSite: true })
        .json({ message: 'user is logged in', loggedIn: true });
    })
    .catch((err) => errorHandler(err, res));
};

const errorHandler = (error, res) => {
  console.error(error);
  res.status(500).send('server error');
};

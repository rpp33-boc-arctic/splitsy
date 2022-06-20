# Splitsy
Welcome to Splitsy! A service that allows users to conveniently split restaurant bills!


## Visit the Website

### Demo video #1
### Demo video #2


## Contributers

[Dennis Wang](https://github.com/denniswangcodes) <br/>
[Grant Mitchell](https://github.com/grant350)<br/>
[Muizz Matemilola](https://github.com/ayokanme)<br/>
[Neen Aroonrerk](https://github.com/neenachcha)<br/>
[Tan Ha](https://github.com/tandha)<br/>
[Yufang Cheng](https://github.com/yfcheng1)<br/>


## Milestones

-   [ ] **Jun 11** Complete and Share with friends
-   [ ] **Jun 04** Features complete
  * -   [x] Authorization
  * -   [ ] Browse restaurants
  * -   [ ] Browse Menu
  * -   [ ] Cart
  * -   [x] Spliting bill
  * -   [x] User profile
  * -   [x] Friend list
-   [x] **May 21** Project Proposal
-   [x] **May 14** Project Start


## Tech Stack

### Technologies

<table>
  <tr>
    <td>Frontend</td>
    <td><a href="https://reactjs.org/">React</a></td>
    <td><a href="https://reactrouter.com/">React Router</a></td>
    <td><a href="https://mui.com/">Material UI</a></td>
  </tr>
  <tr>
    <td>Backend</td>
    <td><a href="http://nodejs.org">Node</a></td>
    <td><a href="http://expressjs.com">Express</a></td>
    <td><a href="https://www.mongodb.com/">MongoDB</a></td>
  </tr>
  <tr>
      <td>Dev Tools</td>
      <td><a href="https://webpack.js.org/">Webpack</a></td>
      <td><a href="https://babeljs.io/">Babel</a></td>
      <td><a href="https://jestjs.io/">Jest.io</a></td>
    </tr>
  <tr>
    <td>APIs</td>
    <td><a href="">(Documenu)</a></td>
  </tr>
  <tr>
      <td>Authentication</td>
      <td><a href="">(authentication)</a></td>
    </tr>
</table>


### Installation

From within the root directory:
```sh
See the example.env file and create a .env file to save mongoose database connection.
Alternatively, change the dbAdress variable within database/index.js to mongodb://localhost:27017/splitsy

$ cd client
$ npm run build

In root directory:
$ npm run server

Go to localhost:3001/
```

### Sample data

In order to use sample data, make sure you have MongoDB installed.
From within the root directory (outside Mongo shell), type command :

```sh
mongorestore dump-v2/
```

### Features

**Authentication** <br />
TODO Authentication's description <br />

<img src="https://github.com/rpp33-boc-arctic/splitsy/blob/readme/readmeGif/signin1.gif" height="500" /><br />
<img src="https://github.com/rpp33-boc-arctic/splitsy/blob/readme/readmeGif/login1.gif" height="500" /><br />

**Restaurant & Menu** <br />
TODO Restaurant's description <br />

<img src="https://github.com/rpp33-boc-arctic/splitsy/blob/readme/readmeGif/restaurant1.gif" height="500" /><br />

**Cart** <br />
TODO cart's description

<img src="https://github.com/rpp33-boc-arctic/splitsy/blob/readme/readmeGif/cart1.gif" height="500" /><br />

**Split payment** <br />
TODO split payment's description <br />

<img src="https://github.com/rpp33-boc-arctic/splitsy/blob/readme/readmeGif/payment1.gif" height="500" /><br />

**Split payment** <br />
TODO User's profile descrpition <br />

<img src="https://github.com/rpp33-boc-arctic/splitsy/blob/readme/readmeGif/userProfile1.gif" height="500" /><br />

## Git Feature Workflow
  * ### Start by switching to the main branch, fetch the latest commit, merge the changes into the local branch
    Run `git checkout main` then run <br>A) `git fetch origin` and `git reset --hard origin/main` OR<br> B) `git pull`
    Run `npm install` to update packages/depeendences installed by others during merge.
  * #### 1) starting work on a new widget
    Run `git checkout -b new-feature`.<br>Including the `-b` flag tells Git to create the branch if it doesn’t already exist.
  * #### 2) After pulling changes from origin/main
    Run `git checkout new-feature` and then `git merge main`. This merges the changes pulled from main into the feature branch (and preserves the full commit history in the log).
  * ### Update, add, and commit changes, as necessary
    Run `git status`,<br>
    `git add <changed-file>`,<br>
    `git commit -m "YOUR COMMIT MESSAGE"`
  * ### Push the local commits to the remote of your feature branch
    Run `git push -u origin new-feature`.<br>Including the `-u` flag adds it as a remote tracking branch. After setting up the tracking branch, `git push` automatically pushes the new-feature to the central repository.
  * ### Make pull request (with detail summary of changes made) to merge to main branch on GitHub
  * ### Move issue ticket to in review column and tag team to request review
  * ### Team mate performs code review asynchronously
  * ### Resolve feedback from code review
  * ### Merge your pull request

## Code Reviews
  * ### Run the changes you are reviewing on your local server
    Run `git switch <feature-branch-to-review>`. This creates and switches to a local version of the remote branch you are attempting to run and tracks its remote. Then run `git pull` to pull in the changes to that branch to your local branch.
  * ### Provide feedback
    Provide feedback on the code you reviewed and merge or leave the pull request open, as necessary.

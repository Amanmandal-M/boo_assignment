<h1 align="center">Welcome to Boo World Backend</h1>

<br>

## About

<br>

Boo Backend is a versatile application designed to facilitate the creation of user accounts, comments, and the ability to like or dislike comments with ease and efficiency. This robust platform provides a seamless user experience for managing interactions within the system.

<br>

## Features

- Creating a new User Profile 
- You can do comments and likes, unlikes
- Relationships Comments with profileID.
- Error Handling.

<br>

## Technologies Used

- Node.js
- MongoDB
- Mocha (For unit testing)

## Clone Repository

<br>

```
git clone https://github.com/Amanmandal-M/boo_world.git
```

<br>

### Prerequisites

- Javascript
- NodeJS
- MongoDB

<br>

## Installation

<br>

```
cd boo_world
npm run start
```

<br>

## Start the Backend server

<br>

```
npm run start
or
npm run server
or
node app.js
```

<br>

##  MVC Structure

```js
├── app.js
├── configs
|    └── db.js
├── models
|    └── profileModel.js
|    └── commentModel.js
├── routes
|    └── profile.js
|    └── comment.js
├──controllers
|    └── profile.js
|    └── comment.js
|    └── HomePageController.js
├──views
|    ├──partials
|    |    └── categories.ejs
|    |    └── epilogue.ejs
|    |    └── footer.ejs
|    |    └── header.ejs
|    |    └── metadata.ejs
|    |    └── profile_card.ejs
|    |    └── prologue.ejs
|    |    └── scripts.ejs
|    |    └── styles.ejs
|    └──profile_template.ejs
├──helpers
|    └── successAndError.js
├──public
|    ├── static
|    |    └── space.png
|    |    └── wing.png
|    ├── sample.md
```

Note : 

-  Before doing anything first create `.env` file and put `PORT`, `NODE_ENV, MONGO_URI`.
-  If you are not using `MONGO_URI` so don't worry it will run automatically using mongoDB-memory-server
- `PORT` is for listening the server.
- `MONGO_URL` is for running database and store your data in database so put your mongo link.
- `NODE_ENV` is for accessing database for test and it is like a authentication but not full authentication .

<br>

## Endpoints

<table>
    <thead>
        <tr>
            <th>Models</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
            <th>Status Code</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Profile</td>
            <td>POST</td>
            <td>/profile/</td>
            <td>This endpoint should allow to create a new Profile and store in database.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Profile</td>
            <td>Get</td>
            <td>/profile/:id</td>
            <td>This endpoint should allow to view profile by its id.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Comment</td>
            <td>GET</td>
            <td>/comment/</td>
            <td>This endpoint should allow to view all comments with profileId.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Comment</td>
            <td>GET</td>
            <td>/comment/:profileId</td>
            <td>This endpoint should allow to view comments by profileId.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Comment</td>
            <td>POST</td>
            <td>/comment/</td>
            <td>This endpoint should allow to create a new comment using profileId.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Comment</td>
            <td>POST</td>
            <td>/like/:commentId</td>
            <td>This endpoint should allow to like comments by commentId.</td>
            <td>200</td>
        </tr>
        <tr>
            <td>Comment</td>
            <td>POST</td>
            <td>/unlike/:commentId</td>
            <td>This endpoint should allow to unlike comments by commentId.</td>
            <td>200</td>
        </tr>
    </tbody>
</table>


<br>

<br>

## Schema

### Profile Schema

```js
{
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mbti: {
    type: String,
    required: true,
  },
  enneagram: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    required: true,
  },
  tritype: {
    type: Number,
    required: true,
  },
  socionics: {
    type: String,
    required: true,
  },
  sloan: {
    type: String,
    required: true,
  },
  psyche: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}
```

<br>

### Comment Schema

```js
{
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0 
  }
}
```

<br>

### Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request
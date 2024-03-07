# Auth Club

<img width="800" alt="image" src="https://github.com/Lucas256w/Auth-Club/assets/112456075/54421c58-c2a7-4d90-94ca-abcfacf9d1cf">

**:point_right: See it live [here](https://auth-club.up.railway.app/)**

Auth Club is an exclusive message board where anyone can come and see the messages but only logged-in users can write new messages. To see who created the message and when users have to get the membership by entering a SECRET code. There's also an admin who can see all the messages with author, date, and time, and can also delete the messages.

I created this project mainly to practice back-end development with a focus on authentication and user permissions management.

## Features

- Create and Read public messages (Admin can delete)
- User authentication with Passport.js LocalStrategy.
- User authorization and permissions management (Admin, member, and non-member but registered user).
- Persistent cookies to remember users
- Back-end is written using MVC architecture.
- Securing passwords using bcryptjs.
- Membership by entering a secret code hidden using dotenv with enviroment variables.
- Schema validation using Mongoose.

## Run It Locally

### Prerequisites

- You'll need a running MongoDB instance, either locally or deployed in the cloud. You can deploy one easily following this [documentation](https://www.mongodb.com/docs/atlas/getting-started/).
- Nodejs version `16.17.0` or above.

### Cloning the repository

Make a appropriate directory and cd to it using the terminal

```bash
# Clone this repository
$ git clone git@github.com:Lucas256w/Auth-Club.git

# Go into the repository
$ cd Auth-Club
```

### Install dependencies

```bash
# Install dependencies
$ npm install
```

### Setting up environment variables

- Make a file at the root directory called `.env`.
- Populate `.env` located in server with the following environment variables:
  - `CONNECTION_STRING`: Your connection string that MongoDB provides
  - `SECRET`: The secret value that is used to sign the session ID cookie
  - `MEMBER_CODE`: The secret code you want user to enter to get membership.
  - `ADMIN_CODE`: The secret code you want user to enter to get admin.
- NOTE: If you set your own member and admin code, you might want to change the riddle questions in the secret_form.pug view template located in the views folder

### Starting the application

From root directory run the following commands:

```bash
# Start the server
$ npm run start

```

## Technologies Used

- [Nodejs](https://nodejs.org/)
- [Expressjs](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoosejs](https://mongoosejs.com/)
- [Passportjs](https://www.passportjs.org/)
- [Pug](https://pugjs.org/api/getting-started.html)

## License

<a href="https://github.com/rahimratnani/members-only/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License">
</a>

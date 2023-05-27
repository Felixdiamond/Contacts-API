# Contacts API

The Contacts API is a RESTful API built with Node.js, Express, and MongoDB. It allows users to store and manage their contacts securely using access tokens and password hashing.

## Features

The Contacts API provides the following features:

- **JWT-based authentication**: Users can authenticate using access tokens and refresh tokens. The API uses JSON Web Tokens (JWTs) to authenticate users and protect routes that require authentication.

- **Secure password hashing**: User passwords are hashed using bcrypt, a widely-used password hashing library. This helps to protect users' passwords in case the database is compromised.

- **CRUD operations**: Users can create, read, update, and delete contacts. Contacts are associated with the user's account, so each user can only access their own contacts.

## Getting started

To get started with the Contacts API, you'll need to have Node.js and MongoDB installed on your system. You can then clone the repository and install the dependencies:

```sh
git clone https://github.com/your-username/contacts-api.git
cd contacts-api
npm install
```
You'll also need to set up a MongoDB database and provide the connection string in a .env file in the root of the project:
```sh
CONNECTION_STRING=mongodb://<username>:<password>@<host>:<port>/<database-name>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
PORT=<port-number>
```
You can then start the server using the `npm start` command to start the production server, or `npm run dev` to start the development server using nodemon.

## API documentation

The Contacts API provides the following endpoints:

### Authentication

- `POST /api/users/register`: Register a new user account. Requires an email address and password in the request body.

- `POST /api/users/login`: Log in with an existing user account. Requires an email address and password in the request body. Returns an access token and refresh token.

- `POST /api/users/refresh-token`: Refresh an expired access token. Requires a refresh token in the request body.

- `GET /api/users/current`: Get the details of the current user. Requires an access token in the `Authorization` header.

### Contacts

- `GET /api/contacts`: Retrieve a list of all contacts associated with the authenticated user.

- `GET /api/contacts/:id`: Retrieve a specific contact by ID. Requires the ID of the contact to retrieve in the URL.

- `POST /api/contacts`: Create a new contact. Requires a name and email address in the request body.

- `PUT /api/contacts/:id`: Update an existing contact. Requires a name and email address in the request body, and the ID of the contact to update in the URL.

- `DELETE /api/contacts/:id`: Delete an existing contact. Requires the ID of thecontact to delete in the URL.

All endpoints except for `/api/users/register` and `/api/users/login` require authentication using an access token. The access token should be included in a `Authorization` header with the value `Bearer <access-token>`.

## Security considerations

The Contacts API has been designed with security in mind. Here are some of the security measures that have been implemented:

- **Access token authentication**: The API uses access tokens to authenticate users and protect routes that require authentication. Access tokens are short-lived and must be refreshed periodically using a refresh token.

- **Password hashing**: User passwords are hashed using bcrypt before they are stored in the database. This helps to protect users' passwords in case the database is compromised.

- **Data validation**: The API validates user input to prevent attacks such as SQL injection and cross-site scripting (XSS) attacks.
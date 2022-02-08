<!-- PROJECT SHIELDS -->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues-open][issues-open-shield]][issues-url]
[![Issues-closed][issues-closed-shield]][issues-url]
[![Contributors][contributors-shield]][contributors-url]

<!-- PROJECT LOGO -->
|                                        express-production-template                                       |
| :------------------------------------------------------------------------------------------------------: |
|                                              ![app-icon][]                                               |
|              Template for backends with NodeJS + Express, ready to use in production!                    |
|                          [🐞 Report a bug or 🙋‍♂️ request a feature][issues-url]                           |
| [![contributions welcome][contributions-welcome]][issues-url] [![License][badge-apache]][apache-license] |

- [Features](#features)
  - [Getting started](#getting-started)
    - [How to use it](#how-to-use-it)
  - [Pre requirements](#pre-requirements)
    - [Installation](#installation)
    - [Set Environments](#set-environments)
  - [Code Overview](#code-overview)
  - [Dependencies](#dependencies)
  - [Application Structure](#application-structure)
  - [Error Handling](#error-handling)
  - [Authentication](#authentication)
- [Collaborators](#collaborators)
  - [References and kudos](#references-and-kudos)
    - [Used:](#used)
    - [Ideas](#ideas)
  - [Contributing](#contributing)
  - [Show your support](#show-your-support)
  - [License](#license)

# Features

[![Framework][badge-framework]][framework-url]
![javascript][]
![nodejs][]

- Async/Await support
- WinstonJs Logger Implementation
- Error Handling
- Postgres Migrations and Seed Support
- Basic request parameters Validation
- Open Api Specification implemented through swagger and swagger-ui
- JWT implementation
- Environment variables to hold configuration values `.env` file
- Functional Programming with Middlewares and helpers
- Standard Coding with Eslint and Prettier, this helps to keep thing into perspective.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Getting started

### How to use it

This code is meant to be run in a server accesible online, so other services can use it. This is a Rest Api solution using basic database create, read, update and delete operations (CRUD) as well as a basic token (JWT) generator/validator.

It uses a RESTful API to be used by any other client, but for human readability it also have `swagger` (it can even be used as an ad hoc admin panel!). To use it from a client you need to make HTPP(S) requests, for example using `curl`:

```sh
> curl http://localhost:8000/ping -v
> curl -d "email=example&password=example2" http://localhost:8000/api/v1/auth/login
```

But you can use any language or library: PHP, GO, C++, Rust, etc. The only unique point is how to manage the JWT. It was decided to use a header named `x-access-token`, in order to avoid a normal way to check for tokens: `Authorization: Bearer` header. This is just an extra security measure. To send a JWT token for a request in a protected endpoint, you MUST use `x-access-token` header.

## Pre requirements

Before to start you need have some requirements:

1. [Node.js](https://nodejs.org/) > v16.13.2

   Node.js is a runtime environment for Javascript that allows us to use the language outside of the browser, in this case we use it to configure and run the development server.

2. [npm](https://www.npmjs.com/) > v8.1.2

   npm is a package manager for Node.js and comes installed with it, we use it to install and manage application dependencies.

3. [Git](https://git-scm.com/) > v2.0.0

   Git is a version control system for code, we use it to manage the different branches of the code.

4. Connection to internet

5. [Visual Studio Code](https://code.visualstudio.com/) or another code editor (optional)

### Installation

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm run dev` or `npm run dev:dash` (with GUI-like experience on your terminal) to start the local server

### Set Environments

```sh
> cp .env.example .env
> nano .env
```

Remove local branches deleted on the remote server

```sh
> git fetch -p && for branch in `git branch -vv --no-color | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done
```

Check unused, outdated states of dependencies: `npx depcheck # OR npx npm-check-updates`

## Code Overview

This backend's code is made using JavaScript language, and [Node.js](nodejs.org) runtime. With a package named Express.js to create the server, routers and middleware necessary. Also PostgreSQL is used to provide a modern, open sourced and performant database layer. Lastly, the server have auxiliar packages for development and deployment to ensure is production ready, enterprise level. Typing and compile correctness by Typescript.

As with most of node.js applications, we would want to install node and npm in our local PC in order to run the server or develop code. This folder include all the necessary files to run the server local or online, just take into account that you'll need to use a terminal as no GUI is available yet.

If you want to develop you have to setup a good dev environment. First of all a good text editor/IDE, I prefer to use Visual Studio Code, but you can use anything else. For the use of VSCode I provide configuration files in the hidden folder `.vscode`.

For more information about the code please check the [code overview](docs/CODE_OVERVIEW.md).

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [slug](https://github.com/dodo/node-slug) - For encoding titles into a URL-friendly format

## Application Structure



- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our models.

## Error Handling

In `routes/api/index.js`, we define a error-handling middleware for handling Mongoose's `ValidationError`. This middleware will respond with a 422 status code and format the response to have error messages the clients can understand

## Authentication

Requests are authenticated using the `Authorization` header with a valid JWT. We define two express middlewares in `routes/auth.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.payload` in the endpoint. The `optional` middleware configures the `express-jwt` in the same way as `required`, but will *not* return a 401 status code if the request cannot be authenticated.

# Collaborators

|   [Israel Laguan][author-github]    | ![email-icon][] Email me to [contact@israellaguan.com][author-email] / ![linkedin-icon][] Connect to [my Linkedin][author-linkedin] |
| :---------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|           ![author-pic][]           | ![banner][]                                                                                                                         |
|    [Victor Peña][victor-github]     | ![email-icon][] Email me to [victordev2002@gmail.com][victor-email] / ![linkedin-icon][] Connect to [my Linkedin][victor-linkedin]  |
|           ![victor-pic][]           |                                                                                                                                     |
| [Emmanuel Azócar][emmanuel-github]  |![email-icon][] Email me to [azocarmel@gmail.com][emmanuel-email]                                                                    |
|          ![emmanuel-pic][]          |                                                                                                                                     |
|   [Angelica Molina][ange-github]    |![email-icon][] Email me to [angeli.molina1@gmail.com][ange-email]                                                                   |
|            ![ange-pic][]            |                                                                                                                                     |

## References and kudos

### Used:
https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
https://github.com/nfour/eslint-config-standard-typescript-prettier
https://codeql.github.com/
https://github.com/santoshshinde2012/node-boilerplate


### Ideas

https://github.com/MichielDeMey/express-jwt-permissions
https://www.medianova.com/en-blog/nodejs-exprees-for-jwt-auth-example/
https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html
https://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
https://github.com/cham11ng/typescript-api-starter // Have migrations with postgres
https://caddyserver.com/docs/running
https://github.com/PW486/express-ts-starter // Have docker conf


## Contributing

[![contributions welcome][contributions-welcome]][issues-url]

🤝 Contributions, issues and feature requests are welcome!
Feel free to check the [issues page][issues-url].

## Show your support

🤗 Give a ⭐️ if you like this project!

Icons from:

<a href="https://icons8.com/icon/13917/full-image">Icons8</a>

## License

[![License][badge-apache]][apache-license]

📝 This project is licensed under the [MIT](LICENSE)\
Feel free to fork this project and improve it

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/Azordev/backend-template?style=for-the-badge
[contributors-url]: https://github.com/Azordev/backend-template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Azordev/backend-template?style=for-the-badge
[forks-url]: https://github.com/Azordev/backend-template/network/members
[stars-shield]: https://img.shields.io/github/stars/Azordev/backend-template?style=for-the-badge
[stars-url]: https://github.com/Azordev/backend-template/stargazers
[issues-open-shield]: https://img.shields.io/github/issues/Azordev/backend-template?style=for-the-badge
[issues-url]: https://github.com/Azordev/backend-template/issues
[issues-closed-shield]: https://img.shields.io/github/issues-closed/Azordev/backend-template?style=for-the-badge
[badge-framework]: https://img.shields.io/badge/express.js-v4.x-9cf?style=for-the-badge
[framework-url]: https://expressjs.com/
[contributions-welcome]: https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=for-the-badge
[badge-apache]: https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge
[apache-license]: https://opensource.org/licenses/Apache-2.0
[javascript]: https://img.shields.io/badge/JAVASCRIPT-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript
[nodejs]: https://img.shields.io/badge/Node-16-339933?style=for-the-badge&logo=node.js
[app-icon]: https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png
[author-pic]: https://avatars2.githubusercontent.com/u/36519478?s=460&v=4
[author-github]: https://israel-laguan.github.io
[author-linkedin]: https://www.linkedin.com/in/israellaguan
[author-email]: mailto:contact@israellaguan.com
[banner]: https://github.com/Israel-Laguan/Israel-Laguan/raw/master/docs/banner.jpg
[linkedin-icon]: https://img.icons8.com/color/20/000000/linkedin.png
[email-icon]: https://img.icons8.com/color/20/000000/message-squared.png
[victor-github]: https://github.com/Katsu08
[victor-pic]: https://avatars.githubusercontent.com/u/66505715?v=4
[victor-email]: mailto:victordev2002@gmail.com
[victor-linkedin]: https://www.linkedin.com/in/v%C3%ADctor-pe%C3%B1a-348a3918a/
[emmanuel-github]: https://github.com/e-azocar
[emmanuel-pic]: https://avatars.githubusercontent.com/u/61360270?v=4
[emmanuel-email]: mailto:azocarmel@gmail.com
[ange-github]: https://github.com/angelik0828
[ange-pic]: https://avatars.githubusercontent.com/u/4030477?s=200&v=4
[ange-email]: mailto:angeli.molina1@gmail.com
[denis-github]: https://github.com/denisosuna
[denis-pic]: https://avatars.githubusercontent.com/u/21060798?v=4
[denis-email]: denisosuna@gmail.com

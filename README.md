## About
<img src="https://img.shields.io/badge/License-MIT-blue.svg">
Chatroom application for the web. By chatroom, I really mean one chatroom. It does not have a database to store login information or chatroom message history. I'd like to come back to this someday to incorporate more features such as the ones listed.


The server runs on Node and Express. Along with the basic rest apis, it keeps track of cookies so you can leave and come back to the website and automatically join the chatroom where you last left off. A websocket connection is also made to communicate the chatroom messages to the client.

The Express server is running on port 5000 and the Webpack development server is on port 3000.

The application was developed with JavaScript, React, Node, Express, Webpack, and Babel.

## Self-hosted application development

First, install the repository and package dependencies

```bash
git clone git@github.com:eferrabelo1114/Chatroom-Web-Application.git
cd Chatroom-Web-Application
npm install
```

Now just run the application

```bash
npm run dev
```

To view the application go to `localhost:3000`

Currently, there is no configuration for a production build. This may or may not chane in the future.

## License

This project is open source and available under the [MIT License](LICENSE).
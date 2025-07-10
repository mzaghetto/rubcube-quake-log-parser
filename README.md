## Rubcube - Quake Log Parser
The objective of this repository is to develop an application that fulfills the user stories created by the [@Rubcube](https://www.rubcube.com/) team.

Based on the user stories, I created the `functional requirements` and the `business requirements`.
You can see the stories and rules created from them in the [roadmap](./ROADMAP.md).

## Tech Stack
- [Typescript](https://www.typescriptlang.org/)
- [tsup](https://github.com/egoist/tsup) (to transpile from TypeScript to JavaScript)
- [Node.js](https://nodejs.org/en)
- [Fastify](https://www.fastify.io/) (Framework used in this application)
- [Zod](https://github.com/colinhacks/zod) (Schema validator)
- [Vite](https://vitejs.dev/) (Used for tests)
- [Husky](https://www.npmjs.com/package/husky) (Pre-commit tests, only allows committing if the tests are up to date)
- [SuperTest](https://github.com/ladjs/supertest) (Used for e2e testing)
- [Github Actions](https://github.com/features/actions) (To run the test pipeline whenever a PR/Push is made)

## How to run the application
First, install the dependecies
```shell
npm run install
```

Running locally
```shell
npm run start:dev
```

Running with Docker
```shell
npm run build:docker
npm run start:docker
```

## Application Usage Documentation
To ensure the proper functioning of the application, please follow these guidelines.

The `games.log` file is parsed when the `/parser` route is used.

Therefore, to get all the data on the other routes without any issues, first run the `/parser` route.

#### cURL for /parser route
```shell
curl --location --request GET 'http://localhost:5001/parser'
```

After that, you have the following alternatives:

### Route for Story 1
To successfully use the route, you can use the cURL below:

#### cURL for /basic-stats route with admin
```shell
curl --location --request GET 'http://localhost:5001/basic-stats' \
--header 'user: admin'
```

If you want to test the story and try to get the route information as a user (it will return a 403 error):
#### cURL for /basic-stats route with user
```shell
curl --location --request GET 'http://localhost:5001/basic-stats' \
--header 'user: user' \
--header 'Content-Type: application/json' \
```

### Route for Story 2
To successfully use the route, you can use the cURL below:
#### cURL for /player-statistics route
```shell
curl --location --request POST 'http://localhost:5001/player-statistics' \
--header 'Content-Type: application/json' \
--data-raw '{
    "playerName": "Mal"
}'
```

### Route for Story 3
There are 2 routes: the first one will get all the games, and the second one will get a specific game by its ID.

To use the second route, it's recommended to run the route that fetches all games first to get the specific ID of the game you want to view.
#### cURL for the route with all games /games-statistics with admin
```shell
curl --location --request GET 'http://localhost:5001/games-statistics' \
--header 'user: admin'
```

#### cURL for the route with a specific game ID /games-statistics/{gameID} with admin
```shell
curl --location --request GET 'http://localhost:5001/games-statistics/8e5afa7d-f050-4f3f-92f0-afd2bd615e62' \
--header 'user: admin'
```

## Tests
This application has several test commands. Below is the list of commands:

#### unit test
```
npm test
```

#### coverage test
```
npm run test:coverage
```

#### tests in watch mode (the tests are re-run every time a file is changed)
```
npm run test:watch
```

#### tests with UI (to view the tests through the Vitest UI)
```
npm run test:ui
```

## CI
GitHub Actions has been added to this application to run tests automatically when a push is made or a PR is opened.

[See it in action](https://github.com/mzaghetto/rubcube-quake-log-parser/actions)


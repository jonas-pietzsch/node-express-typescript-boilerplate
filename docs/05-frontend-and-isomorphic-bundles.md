## 05 – Frontend, Isomorphic Bundles, Hot Reloading & more

This branch introduces a lot of new NPM scripts and tools (webpack, nodemon, isomorphic-loader, awesome-typescript-loader, core-js and some more) to the codebase that will be used during the development flow. Use them as followed:

1. `npm start` – Changed! It now uses nodemon to run `npm run server` and listens to source code changes. On changes it restarts.
2. `npm run server` – This is the previous `npm start`, not ran by `npm start`. Uses `ts-node` to "directly run" the server entrypoint file.
3. `npm run build:client` – It does the Webpack build for the frontend
4. `npm run build:server` – Creates the build of the whole application inside `./lib` using the TypeScript compiler (`tsc`)
5. `npm run build` – Combines `npm run build:client` and `npm run build:server` for a complete build of the application.

And the other NPM scripts being available at this point:

1. `npm run prettier:check` and `prettier:write` checks and fixes linting issues using [Prettier](https://prettier.io/)
2. `npm run test:unit` runs unit tests (`/**/*Spec.ts`) using Mocha
3. `npm run test:integration` runs integration tests (`test/integration/**/*Test.ts`) using Mocha
4. `npm run test` runs Prettier check, unit as well as integration tests in sequence
5. `npm run client:statistics` uses [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) to visualise the weight of code and dependencies of the application

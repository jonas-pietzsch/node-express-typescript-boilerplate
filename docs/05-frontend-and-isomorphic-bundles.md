## 05 – Frontend, Isomorphic Bundles, Hot Reloading & more

This branch introduces a lot of new NPM scripts and tools (webpack, nodemon, isomorphic-loader, awesome-typescript-loader, core-js and some more) to the codebase that will be used during the development flow. Use them as follows:

1. `npm start` – Got re-defined; it now runs the backend in hot-reloading mode using nodemon. Make changes and the server will quickly re-start.
2. `npm run server` – Will do the old start-script. It just starts the server application without hot-reloading.
3. `npm run build:client` – It does the Webpack build for the frontend
4. `npm run build:server` – Creates the build of the whole application inside `./lib` using the TypeScript compiler (`tsc`)
5. `npm run build` – Combines `npm run build:client` and `npm run build:server` for a complete build of the application.

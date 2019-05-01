## 04 – Unit and Integration Tests

Let's test our service implementations, endpoint functions, middlewares and all other kinds of code through unit tests.
Also handling integration tests in the sense of doing HTTP requests against the running service. Try it out:

1. `npm test` – Will run Prettier check, unit tests, and NPM security audit of dependencies
2. `npm run test:unit` – Runs only the unit tests
3. `npm run test:integration` (start server manually before) – Executes the ingration tests on top of the running service

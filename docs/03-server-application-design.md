## 03 – Cut and design of the Backend

This branch introduces a proposal how to cut features in the backend: where to put data access, business logics and request handling.

Like always, `npm start` the server and try out the new enpoints:

1. `http://localhost:8000/api/cat` – Get all available cats
2. `http://localhost:8000/api/cat/1` – Now there are some more cats and details available. Try Cat ID 1 to 5.
3. `http://localhost:800/api/statistics/cat` – It responds statistics about all cats

git checkout 02-express-middlewares-and-request-handlers
git pull --rebase origin 01-setup
git push

git checkout 03-server-application-design
git pull --rebase origin 02-express-middlewares-and-request-handlers
git push

git checkout 04-unit-and-integration-tests
git pull --rebase origin 03-server-application-design
git push

git checkout 05-frontend-and-isomorphic-bundles
git pull --rebase origin 04-unit-and-integration-tests
git push

git checkout 06-web-security-and-rate-limiting
git pull --rebase origin 05-frontend-and-isomorphic-bundles
git push

git checkout 07-fflip-feature-toggles
git pull --rebase origin 06-web-security-and-rate-limiting
git push

git checkout 08–environment-configuration
git pull --rebase origin 07-fflip-feature-toggles
git push

git checkout master
git pull --rebase origin 08–environment-configuration
git push


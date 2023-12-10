git checkout production
git merge dev
git push origin production
npm run build
gcloud app deploy --quiet
git checkout dev


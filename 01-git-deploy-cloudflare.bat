@echo on

git checkout prod
git pull origin prod
git reset --hard
git rebase main

git checkout dev
git push --all

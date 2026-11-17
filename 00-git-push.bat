@echo on

git add .
git commit -m "feat: update"
git pull origin dev
git add .
git commit -m "feat: update"


git checkout main
git pull origin main
git rebase dev


git checkout dev
git push --all


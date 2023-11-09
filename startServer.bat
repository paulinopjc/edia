cd C:\Users\cyrus\OneDrive\Documents\ediavault
git pull
rmdir /s /q .next
rmdir /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps
npm run build
npm run start

payse
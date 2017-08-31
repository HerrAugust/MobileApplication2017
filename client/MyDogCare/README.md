Start the server (see /server folder)

Change directory:
Open Terminal/Prompt
cd to the directory MobileApplication2017/client/MyDogCare on your computer

Install Ionic2 packages with:
npm install

Install dependencies:
npm install ionic2-calendar --save
npm install --save intl

Launch app in browser with:
ionic serve --lab
(update all proposed packages)

For refreshing page, give in browser's console:
location.href = "http://localhost:8100/"; location.hash=""; location.reload();

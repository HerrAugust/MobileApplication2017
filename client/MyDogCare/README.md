Start the server (see /server folder)

Change directory:
Open Terminal/Prompt
cd to the directory MobileApplication2017/client/MyDogCare on your computer

Install Ionic2 packages with:
npm install

Install dependencies:
npm install ionic2-calendar --save
npm install --save intl

ionic cordova plugin add cordova-plugin-inappbrowser
npm install --save @ionic-native/in-app-browser

ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation --save

ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID=<YOUR KEY>
npm install @ionic-native/google-maps --save

Launch app in browser with:
ionic serve --lab
(update all proposed packages)

For refreshing page, give in browser's console:
location.href = "http://localhost:8100/"; location.hash=""; location.reload();

Start to Android device:
ionic cordova run android --device

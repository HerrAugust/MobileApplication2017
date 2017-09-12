Start the server (see /server folder)

Change directory:<br/>
Open Terminal/Prompt<br/>
cd to the directory MobileApplication2017/client/MyDogCare on your computer<br/>

Install Ionic2 packages with:<br/>
npm install

Install dependencies:<br/>
npm install ionic2-calendar --save<br/>
npm install --save intl

ionic cordova plugin add cordova-plugin-inappbrowser<br/>
npm install --save @ionic-native/in-app-browser

ionic cordova plugin add cordova-plugin-geolocation<br/>
npm install @ionic-native/geolocation --save

ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID=<YOUR KEY><br/>
npm install @ionic-native/google-maps --save

ionic cordova plugin add cordova-plugin-camera-preview<br/>
npm install @ionic-native/camera-preview --save

Launch app in browser with:<br/>
ionic serve --lab<br/>
(update all proposed packages)

For refreshing page, give in browser's console:<br/>
location.href = "http://localhost:8100/"; location.hash=""; location.reload();

Start to Android device:<br/>
ionic cordova run android --device

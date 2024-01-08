// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBWFIGGCuAEn4ZAL6UbkeQDK5QZZorTwFU",
  authDomain: "aquaobserver-49185.firebaseapp.com",
  projectId: "aquaobserver-49185",
  storageBucket: "aquaobserver-49185.appspot.com",
  messagingSenderId: "489677408795",
  appId: "1:489677408795:web:56350c63816ace32fac6be",
  measurementId: "G-Y3LKFESHWK",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './public/logo.png'
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

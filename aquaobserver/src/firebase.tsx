import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

async function registerDevice(data: any) {
  const response = await fetch("/api/registerDevice/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "any-value",
    },
    body: JSON.stringify(data),
  });
  // console.log(response);
}

const firebaseConfig = {
  apiKey: "AIzaSyBWFIGGCuAEn4ZAL6UbkeQDK5QZZorTwFU",
  authDomain: "aquaobserver-49185.firebaseapp.com",
  projectId: "aquaobserver-49185",
  storageBucket: "aquaobserver-49185.appspot.com",
  messagingSenderId: "489677408795",
  appId: "1:489677408795:web:56350c63816ace32fac6be",
  measurementId: "G-Y3LKFESHWK",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getNotificationToken = (setTokenFound: any) => {
  return getToken(messaging, {
    vapidKey:
      "BPJ0JUD97Y-6mGt8fumcq-WfBUdFUetc9A4ugNPw8wa9_jbbgb_emknlgomi044dOzhrqcWQ-jH4y3LepEgA7pE",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        let data = {
          token: currentToken,
        };
        registerDevice(data);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

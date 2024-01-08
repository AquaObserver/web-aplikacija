import { useState, useEffect } from "react";
import { getNotificationToken, onMessageListener } from "./firebase";
import { Toast, Button } from "react-bootstrap";
import AppRouter from "./AppRouter";
import TitleBar from "./components/TitleBar";
import "./index.css";

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });

  const logo = "../public/logo.png";

  // useEffect(() => {
  //   getNotificationToken(setTokenFound);
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       getNotificationToken(setTokenFound);
  //     }
  //   });
  // }, []);

  function manageNotifications() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        getNotificationToken(setTokenFound);
      }
    });
  }

  onMessageListener()
    .then((payload: any) => {
      setShowNotification(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      // const notification = new Notification(payload.notification.title, {
      //   body: payload.notification.body,
      //   icon: logo,
      // });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <>
      <AppRouter>
        <TitleBar
          manageNotifications={manageNotifications}
          notificationPermission={Notification.permission}
        ></TitleBar>
      </AppRouter>

      <div>
        <Toast
          onClose={() => setShowNotification(false)}
          show={showNotification}
          animation
          style={{
            position: "absolute",
            top: 80,
            right: 20,
          }}
        >
          <Toast.Header>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{notification.title}</strong>
          </Toast.Header>
          <Toast.Body className="d-flex justify-content-between">
            <div>{notification.body}</div>
            <div>
              <i
                className="fa-solid fa-arrows-rotate"
                onClick={() => window.location.reload()}
              ></i>
            </div>
          </Toast.Body>
        </Toast>
      </div>
    </>
  );
}

export default App;

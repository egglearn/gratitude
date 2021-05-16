// import { graphData } from "./app.js";

var firebaseConfig = {
  apiKey: "AIzaSyDpJUKeG8a6eNrhXtd9-EsNuH0pVH9Qjhw",
  authDomain: "gratitude-4ccbd.firebaseapp.com",
  databaseURL:
    "https://gratitude-4ccbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gratitude-4ccbd",
  storageBucket: "gratitude-4ccbd.appspot.com",
  messagingSenderId: "367578256139",
  appId: "1:367578256139:web:bc98ea94280d6e8b0a880e",
};

var provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(firebaseConfig);
//

firebase.auth().onAuthStateChanged(function (user) {
  var uid = user.uid;

  firebase
    .database()
    .ref("users/" + uid)
    .on("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let datas = childSnapshot.val().gratitude;
        console.log(datas);
        let graphData = [childSnapshot.val()];
      });
    });
});

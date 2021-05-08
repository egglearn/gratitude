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
//d
let date = new Date();
let htmlDate = document.getElementById("date");
htmlDate.textContent = date;
let gratitudeInput = document.getElementById("gratitudeInput");
let addGratitude = document.getElementById("addGratitude");
let gratitudeBtn = document.getElementById("showGratitudeList");
console.log(date);

var gratitudeRef = firebase.database().ref("gratitude");

let container = document.getElementById("container");
let gratitudeList = document.getElementById("gratitudeList");
let themeChange = document.getElementById("themeChange");

themeChange.addEventListener("click", function () {
  console.log("shoudl of changed");

  container.style.backgroundImage =
    "url(https://images.unsplash.com/photo-1485201543483-f06c8d2a8fb4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)";
});
const signIn = document.getElementById("signIn");
const signOut = document.getElementById("signOut");

function googleSignIn() {
  //var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log("i ran");
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

firebase.auth().onAuthStateChanged(function (user) {
  var uid = user.uid;
  if (user) {
    // User is signed in.

    firebase
      .database()
      .ref("users/" + uid)
      .set({
        uid: uid,
        // email: user.email
      });
    console.log("working");
  } else {
    // No user is signed in.
  }

  function writeUserData(e) {
    e.preventDefault();
    console.log("added gratitude entry");
    let data = gratitudeInput.value;

    firebase
      .database()
      .ref("users/" + uid + "gratitude")
      .push({
        gratitude: data,
        test: JSON.stringify(date),
      });

    gratitudeInput.value = " ";
  }
});

function googleSignOut() {
  // [START auth_sign_out]
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("sign out successful");
    })
    .catch((error) => {
      // An error happened.
    });
  // [END auth_sign_out]
}

signIn.addEventListener("click", googleSignIn);
signOut.addEventListener("click", googleSignOut);

// function writeUserData(e) {
//   e.preventDefault();
//   console.log("added gratitude entry");
//   let data = gratitudeInput.value;

//   gratitudeRef.push({
//     gratitude: data,
//     test: JSON.stringify(date),
//   });

//   gratitudeInput.value = " ";
// }

function reader(e) {
  e.preventDefault();

  gratitudeRef.on("value", function (snapshot) {
    gratitudeList.textContent = " ";
    snapshot.forEach(function (childSnapshot) {
      let datas = childSnapshot.val().gratitude;
      console.log(gratitudeList);
      let p = document.createElement("p");
      p.textContent = datas;
      gratitudeList.appendChild(p);
    });
  });
}

//addGratitude.addEventListener("click", writeUserData);
gratitudeBtn.addEventListener("click", reader);

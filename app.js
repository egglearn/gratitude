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

function writeUserData(e) {
  e.preventDefault();
  console.log("added gratitude entry");
  let data = gratitudeInput.value;

  gratitudeRef.push({
    gratitude: data,
    test: JSON.stringify(date),
  });

  gratitudeInput.value = " ";
}

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

addGratitude.addEventListener("click", writeUserData);
gratitudeBtn.addEventListener("click", reader);

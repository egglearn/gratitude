let graphData = [];
let bod = document.getElementById("bod");
var svg = d3
  .select("#mydata")
  .append("svg")
  .attr("width", 100)
  .attr("height", 100);

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
//htmlDate.textContent = date;
let gratitudeInput = document.getElementById("gratitudeInput");
let addGratitude = document.getElementById("addGratitude");
let gratitudeBtn = document.getElementById("showGratitudeList");
let hideListBtn = document.getElementById("hideGratitudeList");
console.log(date);

var gratitudeRef = firebase.database().ref("gratitude");

let container = document.getElementById("container");
let gratitudeList = document.getElementById("gratitudeList");
let themeChange = document.getElementById("themeChange");

// themeChange.addEventListener("click", function () {
//   console.log("shoudl of changed");

//   container.style.backgroundImage =
//     "url(https://images.unsplash.com/photo-1485201543483-f06c8d2a8fb4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)";
// });
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

    firebase.database().ref("users/" + uid);

    console.log("working");
  } else {
    // No user is signed in.
  }

  //initil write on auth because the event listener below listens for a click and here the click has already happened in anonymous sign in
  function write() {
    if (user) {
      console.log("added gratitude entry");

      if (gratitudeInput.value != " ") {
        let data = gratitudeInput.value;

        firebase
          .database()
          .ref("users/" + uid)
          .push({
            gratitude: data,
            test: JSON.stringify(date),
          });

        gratitudeInput.value = " ";
      } else {
        ("nothing");
      }

      //d3
      addGratitude.addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
          var uid = user.uid;

          if (user) {
            firebase
              .database()
              .ref("users/" + uid)
              .on("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                  let datas = childSnapshot.val().gratitude;
                  let test = childSnapshot.val().test;
                  //dd
                  graphData.push({ datas: datas, test: test });
                  console.log(graphData);
                  //
                  //d3

                  //d3
                });

                var width = 100;
                var height = 100;

                // append the svg object to the body of the page

                // create dummy data -> just one element per circle

                // Initialize the circle: all located at the center of the svg area
                var node = svg
                  .append("g")
                  .selectAll("circle")
                  .data(graphData)
                  .enter()
                  .append("circle")
                  .attr("r", 5)
                  .attr("cx", width / 2)
                  .attr("cy", height / 2)
                  .style("fill", "#69b3a2")
                  .style("fill-opacity", 0.3)
                  .attr("stroke", "#69a2b2")
                  .style("stroke-width", 4);

                // Features of the forces applied to the nodes:
                var simulation = d3
                  .forceSimulation()
                  .force(
                    "center",
                    d3
                      .forceCenter()
                      .x(width / 2)
                      .y(height / 2)
                  ) // Attraction to the center of the svg area
                  .force("charge", d3.forceManyBody().strength(20)) // Nodes are attracted one each other of value is > 0
                  .force(
                    "collide",
                    d3.forceCollide().strength(0.01).radius(30).iterations(1)
                  ); // Force that avoids circle overlapping

                // Apply these forces to the nodes and update their positions.
                // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
                simulation.nodes(graphData).on("tick", function (d) {
                  node
                    .attr("cx", function (d) {
                      return d.x;
                    })
                    .attr("cy", function (d) {
                      return d.y;
                    });
                });
              });

            //d
            //d3

            //d3
          } else {
          }
        });
      });
      //d3
    } else {
      //   alert("sign in to save data");
    }
  }

  write();

  addGratitude.addEventListener("click", writeUserData);
  function writeUserData(e) {
    e.preventDefault();

    //gratitude.input.value is not == empty
    if (user) {
      console.log("added gratitude entry");

      if (gratitudeInput.value != "") {
        let data = gratitudeInput.value;

        firebase
          .database()
          .ref("users/" + uid)
          .push({
            gratitude: data,
            test: JSON.stringify(date),
          });

        gratitudeInput.value = " ";
      } else {
        alert("sign in to save data");
      }

      addGratitude.addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
          var uid = user.uid;

          if (user) {
            firebase
              .database()
              .ref("users/" + uid)
              .on("value", function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                  let datas = childSnapshot.val().gratitude;
                  let test = childSnapshot.val().test;
                  //dd
                  graphData.push({ datas: datas, test: test });
                  console.log(graphData);
                  //
                  //d3

                  //d3
                });

                //d3

                // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
              });

            //d
            //d3

            //d3
          } else {
          }
        });
      });

      //d3
    } else {
      ("nothing");
    }
  }

  gratitudeBtn.addEventListener("click", reader);

  //only want reader to work if someone is signed in

  function reader(e) {
    e.preventDefault();

    if (user) {
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", function (snapshot) {
          gratitudeList.textContent = " ";
          snapshot.forEach(function (childSnapshot) {
            let datas = childSnapshot.val().gratitude;
            let test = childSnapshot.val().gratitude;

            console.log(childSnapshot.val());
            graphData = [childSnapshot.val()];

            let p = document.createElement("p");
            p.textContent = datas;
            gratitudeList.appendChild(p);
            //graphData.push({ datas: datas, test: test });
          });
        });
    }
  }
});

signOut.addEventListener("click", googleSignOut);

function googleSignOut() {
  gratitudeList.textContent = " ";
  // [START auth_sign_out]
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.

      console.log("sign out successful");
      location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
  // [END auth_sign_out]
}

signIn.addEventListener("click", googleSignIn);

function anonymous() {
  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      console.log("anonymoussign in");
      // Signed in..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}
addGratitude.addEventListener("click", anonymous);
hideListBtn.addEventListener("click", function () {
  gratitudeList.textContent = " ";
});

// export { graphData };

bod.addEventListener("click", function () {
  firebase.auth().onAuthStateChanged(function (user) {
    var uid = user.uid;

    if (user) {
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let datas = childSnapshot.val().gratitude;
            let test = childSnapshot.val().test;
            //dd
            graphData.push({ datas: datas, test: test });
            console.log(graphData);
            //
            //d3

            //d3
          });

          var width = 100;
          var height = 100;

          // append the svg object to the body of the page

          // create dummy data -> just one element per circle

          // Initialize the circle: all located at the center of the svg area
          var node = svg
            .append("g")
            .selectAll("circle")
            .data(graphData)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", "#69b3a2")
            .style("fill-opacity", 0.3)
            .attr("stroke", "#69a2b2")
            .style("stroke-width", 4);

          // Features of the forces applied to the nodes:
          var simulation = d3
            .forceSimulation()
            .force(
              "center",
              d3
                .forceCenter()
                .x(width / 2)
                .y(height / 2)
            ) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(20)) // Nodes are attracted one each other of value is > 0
            .force(
              "collide",
              d3.forceCollide().strength(0.01).radius(30).iterations(1)
            ); // Force that avoids circle overlapping

          // Apply these forces to the nodes and update their positions.
          // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
          simulation.nodes(graphData).on("tick", function (d) {
            node
              .attr("cx", function (d) {
                return d.x;
              })
              .attr("cy", function (d) {
                return d.y;
              });
          });
        });

      //d
      //d3

      //d3
    } else {
    }
  });
});

// import { graphData } from "./app.js";

// set the dimensions and margins of the graph
var width = 650;
var height = 650;

// append the svg object to the body of the page
var svg = d3
  .select("#mydata")
  .append("svg")
  .attr("width", 450)
  .attr("height", 450);

// create dummy data -> just one element per circle

// Initialize the circle: all located at the center of the svg area
var node = svg
  .append("g")
  .selectAll("circle")
  .data(graphData)
  .enter()
  .append("circle")
  .attr("r", 25)
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
  .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
  .force("collide", d3.forceCollide().strength(0.01).radius(30).iterations(1)); // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation.nodes(data).on("tick", function (d) {
  node
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });
});

var user = firebase.auth().currentUser;

if (user) {
  var uid = user.uid;
  if (uid) {
    console.log("true");
  }
  // User is signed in.
} else {
  // No user is signed in.
}

// firebase.auth().onAuthStateChanged(function (user) {
//   var uid = user.uid;
//   if (user) {
//     // User is signed in.

//     firebase.database().ref("users/" + uid);

//     console.log("working");
//   } else {
//     // No user is signed in.
//   }

//   //initil write on auth because the event listener below listens for a click and here the click has already happened in anonymous sign in
//   function write() {
//     if (user) {
//       console.log("added gratitude entry");
//       let data = gratitudeInput.value;

//       firebase
//         .database()
//         .ref("users/" + uid)
//         .push({
//           gratitude: data,
//           test: JSON.stringify(date),
//         });

//       gratitudeInput.value = " ";
//     } else {
//       //   alert("sign in to save data");
//     }
//   }

//   write();

//   addGratitude.addEventListener("click", writeUserData);
//   function writeUserData(e) {
//     e.preventDefault();

//     console.log(`i am the ${user}`);

//     if (user) {
//       console.log("added gratitude entry");
//       let data = gratitudeInput.value;

//       firebase
//         .database()
//         .ref("users/" + uid)
//         .push({
//           gratitude: data,
//           test: JSON.stringify(date),
//         });

//       gratitudeInput.value = " ";
//     } else {
//       //   alert("sign in to save data");
//     }
//   }

//   gratitudeBtn.addEventListener("click", reader);

//   //only want reader to work if someone is signed in

//   function reader(e) {
//     e.preventDefault();

//     if (user) {
//       firebase
//         .database()
//         .ref("users/" + uid)
//         .on("value", function (snapshot) {
//           gratitudeList.textContent = " ";
//           snapshot.forEach(function (childSnapshot) {
//             let datas = childSnapshot.val().gratitude;
//             console.log(childSnapshot.val());
//             graphData = [childSnapshot.val()];

//             let p = document.createElement("p");
//             p.textContent = datas;
//             gratitudeList.appendChild(p);
//           });
//         });
//     }
//   }
// });

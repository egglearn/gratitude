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

var gratitudeRef = firebase.database().ref("gratitude");

firebase.auth().onAuthStateChanged(function (user) {
  let graphData;
  var uid = user.uid;
  if (user) {
    // User is signed in.

    firebase.database().ref("users/" + uid);

    console.log("working");
  } else {
    // No user is signed in.
  }

  function reader() {
    if (user) {
      firebase
        .database()
        .ref("users/" + uid)
        .on("value", function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            let datas = childSnapshot.val().gratitude;
            console.log(childSnapshot.val());
            graphData = [childSnapshot.val()];
          });
        });

      var width = 650;
      var height = 650;

      // append the svg object to the body of the page
      var svg = d3
        .select("#mydata")
        .append("svg")
        .attr("width", 450)
        .attr("height", 450);

      console.log("this is " + ":" + svg);
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
        .force(
          "collide",
          d3.forceCollide().strength(0.01).radius(30).iterations(1)
        ); // Force that avoids circle overlapping

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
    }
  }

  reader();
});

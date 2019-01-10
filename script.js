var damage = 100;
var c4Active = false;
var bazookaActive = false;
var dot = 0;
var items = [
  "Wolf Meat",
  "Shotgun",
  "Barrel"
];

// Write 500 inside divs
for (var i = 1; i < 10; i++) {
  document.querySelector(".box" + i).innerHTML = 500
}

// Activate/Deactivate weapons
document.getElementById("c4").addEventListener("click", function() {
  c4Active = !c4Active;
});

document.getElementById("bazooka").addEventListener("click", function() {
  bazookaActive = !bazookaActive;
});

document.getElementById("dot").addEventListener("click", function() {
  dot = 10;
});

setInterval(function () {
  if (dot == 0) {
    return;
  }

  for (var i = 1; i < 10; i++) {
    hitBox(i, 20);
    checkBoxHealths();
  }

  dot = dot - 1;
}, 1000);

// Lower the value of divs by 100 when you click on them, and change the color of div when the value is <= 200
for (var i = 1; i < 10; i++) {
  document.querySelector(".box" + i).addEventListener("click", lowerHp)
}

function hitBox(elementId, damage) {
  var box = document.getElementById(elementId);

  if (box == null) {
    return;
  }

  box.innerHTML -= damage;

  if (box.innerHTML <= 0) {
    var luck = Math.floor(Math.random() * 3) + 1; 
    var itemIndex = Math.floor(Math.random() * items.length);

    if (luck == 2) {
      alert("An item dropped: " + items[itemIndex]);
    }
  }
}

function checkBoxHealths() {
    for (var i = 1; i < 10; i++) {
        var box = document.getElementById(i);

        if (box.innerHTML <= 200 && box.innerHTML > 0) {
            box.style.backgroundColor = "red";
        } else if (box.innerHTML <= 0) {
            box.style.visibility = "hidden";
        }
    }
}
// CALCULATE DAMAGE FUNCTION
function lowerHp(event) {

    if (c4Active == true) {
        hitBox(event.target.id, damage * 4);
    } else if (bazookaActive == true) {
        const id = parseInt(event.target.id);
        hitBox(id, damage * 2);
        hitBox(id - 3, damage * 2);
        hitBox(id - 1, damage * 2);
        hitBox(id + 3, damage * 2);
        hitBox(id + 1, damage * 2);
    } else {
        hitBox(event.target.id, damage);
    }

    checkBoxHealths();
};

// Restarting the game
document.getElementById("restart").addEventListener("click", function() {
    for (var i = 1; i < 10; i++) {
document.querySelector(".box" + i).innerHTML = 500;
document.querySelector(".box" + i).style.backgroundColor = "#000";
document.querySelector(".box" + i).style.visibility = "visible";}
})


// Toggle Dark-Light background
document.getElementById("toggle").addEventListener("click", function() {
    var color = document.getElementById("container");
    color.classList.toggle("dark-mode");
});

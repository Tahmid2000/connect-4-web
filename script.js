var container = $("#container");
var grid = [];
var playerCount = 0;
grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

function createGrid() {
  var r = -1;
  for (let i = 0; i < 42; i++) {
    if (i % 7 === 0) r++;
    $("<div/>", {
      class: "grid-item white-grid-item",
      row: `${r}`,
      col: `${i % 7}`,
      id: `${i}`
    }).appendTo(container);
  }
  $("#player").html("Player 1's Turn. (Red)");
}

function action() {
  var i = 0;
  var id = 0;
  var color;
  $(".grid-item").on("click", function() {
    id = 0;
    var colClicked = parseInt($(this).attr("col"));
    var rowClicked = parseInt($(this).attr("row"));

    var wholeCol = $(`div[col=${colClicked}]`);
    i = 0;
    id = parseInt($(this).attr("id"));

    while (
      wholeCol.eq(i).attr("class") === "grid-item white-grid-item" &&
      i < 6
    ) {
      i++;
    }
    newi = i - 1 - rowClicked;
    id = id + newi * 7;
    if (playerCount % 2 == 0) {
      grid[i - 1][colClicked] = 1;
      $(`#${id}`).addClass("red-grid-item");
      color = 1;
      $("#player").html("Player 2's Turn. (Yellow)");
    } else {
      grid[i - 1][colClicked] = 2;
      $(`#${id}`).addClass("yellow-grid-item");
      color = 2;
      $("#player").html("Player 1's Turn. (Red)");
    }
    playerCount++;
    $(`#${id}`).removeClass("white-grid-item");
    showWin(color, [i - 1, colClicked]);
  });
}

async function showWin(color, index) {
  var winner = color == 1 ? "Player 1" : "Player 2";
  if (checkWin(color, index)) {
    $("#player").html(`Player ${color} Wins!`);
    $("#player").addClass("bigger");
    $("#player").removeClass("smaller");
    var els1 = $("#title"),
      saved = els1.clone(true);
    els1.remove();
    var els2 = $("#description"),
      saved = els2.clone(true);
    els2.remove();
    await sleep(2000);
    $("body").prepend(els2);
    $("body").prepend(els1);
    $("#player").removeClass("bigger");
    $("#player").addClass("smaller");
    $("#player").html("Player 1's Turn. (Red)");
    resetGrid();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function checkWin(color, index) {
  var res1 = checkHorizontal(color, index);
  var res2 = checkVertical(color, index);
  var res3 = checkDiagonal(color, index);
  return res1 || res2 || res3;
}

function checkHorizontal(color, index) {
  //right
  var row = index[0]; //doesnt change
  var col = index[1]; //changes
  var i = 0;
  var count = 0;
  while (i < 4 && col + i <= 6) {
    if (grid[row][col + i] == color) {
      i++;
      count++;
    } else {
      break;
    }
  }

  i = -1;
  //left
  while (i > -4 && col + i >= 0) {
    if (grid[row][col + i] == color) {
      i--;
      count++;
    } else {
      break;
    }
  }
  if (count == 4) return true;
  return false;
}

function checkVertical(color, index) {
  //down
  var row = index[0]; //changes
  var col = index[1]; //doesnt change
  var i = 0;
  var count = 0;
  while (i < 4 && row + i <= 5) {
    if (grid[row + i][col] == color) {
      i++;
      count++;
    } else {
      break;
    }
  }

  i = -1;
  //up
  while (i > -4 && row + i >= 0) {
    if (grid[row + i][col] == color) {
      i--;
      count++;
    } else {
      break;
    }
  }
  if (count == 4) return true;
  return false;
}

function checkDiagonal(color, index) {
  return checkDiagonal1(color, index) || checkDiagonal2(color, index);
}

function checkDiagonal1(color, index) {
  //down
  var row = index[0];
  var col = index[1];
  var i = 0;
  var j = 0;
  var count = 0;
  while (i < 4 && j < 4 && row + i <= 5 && col + j <= 6) {
    if (grid[row + i][col + j] == color) {
      i++;
      j++;
      count++;
    } else {
      break;
    }
  }

  i = -1;
  j = -1;
  //up
  while (i > -4 && j > -4 && row + i >= 0 && col + j >= 0) {
    if (grid[row + i][col + j] == color) {
      i--;
      j--;
      count++;
    } else {
      break;
    }
  }

  if (count == 4) return true;
  return false;
}

function checkDiagonal2(color, index) {
  //down
  var row = index[0];
  var col = index[1];
  var i = 0;
  var j = 0;
  var count = 0;
  while (i < 4 && j > -4 && row + i <= 5 && col + j >= 0) {
    if (grid[row + i][col + j] == color) {
      i++;
      j--;
      count++;
    } else {
      break;
    }
  }

  i = -1;
  j = 1;
  //up
  while (i > -4 && j < 4 && row + i >= 0 && col + j <= 6) {
    if (grid[row + i][col + j] == color) {
      i--;
      j++;
      count++;
    } else {
      break;
    }
  }
  if (count == 4) return true;
  return false;
}

function reset() {
  $("#reset").on("click", () => {
    resetGrid();
  });
}

function resetGrid() {
  $(".red-grid-item")
    .addClass("white-grid-item")
    .removeClass("red-grid-item");
  $(".yellow-grid-item")
    .addClass("white-grid-item")
    .removeClass("yellow-grid-item");
  playerCount = 0;
  grid = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
}

createGrid();
action();
reset();

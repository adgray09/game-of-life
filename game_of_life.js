var grid;
var button;
var on = true;
function reset() {
 setup();
 
}

function setup() {
  createCanvas(400, 400);
  grid = new Grid(5);
  grid.randomize();
  grid.draw();

}



function draw() {
  background(25);
  grid.draw();
  // grid.updateNeighborCounts();
  // grid.updatePopulation();
  
  if (on) {
  	grid.updateNeighborCounts ();
  	grid.updatePopulation ();
  }
}

function pause () {
	on = !on;
	}

function keyPressed () {
	if (keyCode === ENTER) {
		on = !on;
		print (on);
	}
}

// function mousePressed() {
  
// }

class Grid {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.numberOfColumns = width / cellSize;
    this.numberOfRows = height / cellSize;

    var x = this.numberOfColumns;
    var y = this.numberOfRows;

    this.cells = new Array(x);
    for (var i = 0; i < this.numberOfColumns; i++) {
      this.cells[i] = new Array(this.numberOfRows);
    }


    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, this.cellSize);
      }
    }
    //print(this.cells);

    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
  }

  draw() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
      }
    }
  }
  randomize() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var rando = floor(random(2));
        this.cells[column][row].setIsAlive(rando);
      }
    }
  }


  updatePopulation() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveOrDie();
      }
    }
  }


  getNeighbors(currentCell) {

    var neighbors = [];

    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var neighborColumn = currentCell.column + xOffset;
        var neighborRow = currentCell.row + yOffset;
        if (this.isValidPosition(neighborColumn, neighborRow)) {
          if ((currentCell.column == neighborColumn) && (currentCell.row == neighborRow)) {
          } else {
            var cell = this.cells[neighborColumn][neighborRow];
            neighbors.push(cell);
          }
        }
      }
      // do something with neighborColumn and neighborRow
    }

    return neighbors;
  }


  isValidPosition(column, row) {
    return column >= 0 && row >= 0 && column < this.numberOfColumns && row < this.numberOfRows;
  }
  updateNeighborCounts() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        var neighbors = this.getNeighbors(cell);
        var count = 0;
        for (var i = 0; i < neighbors.length; i++) {
          if(neighbors[i].isAlive){
            count++;
          }
          
        }

        cell.liveNeighborCount = count;
      }
    }
  }

}

class Cell {
  constructor(column, row, sizes) {
    this.column = column;
    this.row = row;
    this.sizes = sizes;
    this.liveNeighborCount = 0;
    this.isAlive = false;
  }
  draw() {
    if (this.isAlive === true) {
      fill(color(random(255), random (255),random(255)));
    } else {
      fill(0);
    }
    noStroke();
    rect(this.column * this.sizes + 1, this.row * this.sizes + 1, this.sizes - 1, this.sizes - 1);

  }
  setIsAlive(value) {
    if (value) {
      this.isAlive = true;
    } else {
      this.isAlive = false;
    }
  }
  liveOrDie() {
    if (this.isAlive && this.liveNeighborCount < 2) {
      this.isAlive = false;
    } else if (this.isAlive && this.liveNeighborCount == 2) {
      this.isAlive = true;
    } else if (this.isAlive && this.liveNeighborCount == 3) {
      this.isAlive = true;
    } else if (this.isAlive && this.liveNeighborCount > 3) {
      this.isAlive = false;
    } else if (!this.isAlive && this.liveNeighborCount == 3) {
      this.isAlive = true;
    }
  }
} 
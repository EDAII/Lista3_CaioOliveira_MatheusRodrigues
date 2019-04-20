let values = [];
let w = 10;

let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  values = new Array(10);
  for (let i = 0; i < values.length; i++) {
    values[i] = random(3,50);
    states[i] = -1;
  }
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  
  background(0);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill(255,0,0);
    } else if (states[i] == 1) {
      fill(0,255,0);
    } else {
      fill(255);
    }
    circle(w * i * 10 + 100 , height/2, values[i]);
    text(parseInt(values[i]),w * i * 10 + 85 , height/2 + 90)
    textSize(30)
    text("Quick sort",windowWidth/2 -100,100)
  }
 
}


async function swap(arr, a, b) {
  await sleep(500);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
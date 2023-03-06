let fs = require('fs');
let n = 0;
let maxn=1000000;
let time = 0;
let maxtime = 25;
let lines = fs.readFileSync("./test.txt", 'utf-8').trim().split('\n');
let lengths = lines.length;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


let pick = function(candidate, desire, remain, k) {
  if (desire[k] > 0) desire[k]--;
  var index = candidate.indexOf(k);
  if (index > -1) {
    candidate.splice(index, 1);
  }
}

let roll = function(candidate, desire, remain, rac, count) {
  count++;
  let temp = shuffleArray(candidate);
  let selectArea = [];

  for (i = 0; i < temp.length && i < 5; i++) {
    selectArea.push(temp[i])
  }

  for (let i = 0; i < selectArea.length; i++) {
    if (selectArea[i] != -1) {
      pick(candidate, desire, remain, selectArea[i]);
    }
  }
  let flag = true;
  for (let i = 0; i < desire.length; i++) {
    if (desire[i] != 0) flag = false;
  }
  if (flag == false) {
    roll(candidate, desire, remain, rac, count);
  }
  else {
    // count;
    fs.appendFileSync("./calculated.txt", count + '');
    if (time < maxtime) {
      fs.appendFileSync("./calculated.txt", ',');
      time++; cal(n);
    }
    else {
      fs.appendFileSync("./calculated.txt", '\n');
      setTimeout(() => {
        time = 0;
        n++;
        cal(n);
      }, 10)

    }
  };
}





let cal = function(n) {
  if (n % 1000 == 0 && time == 0) console.log(n);
  if (n >= lines.length||n>=maxn) process.exit();
  let line = lines[n].trim().split(" ");
  let desire = [];
  for (let i = 0; i < 3; i++) {
    desire.push(parseInt(line[0].split(',')[i]))
  }

  let remain = [];
  for (let i = 0; i < 3; i++) {
    remain.push(parseInt(line[1].split(',')[i]))
  }

  let rac = parseInt(line[2]);

  let flag = true;
  for (let i = 0; i < desire.length; i++) {
    if (desire[i] > remain[i]) {
      flag = false;
      break;
    }
  }
  if (flag) {
    if (time == 0) fs.appendFileSync("./calculated.txt", lines[n] + ' ');
    let candidate = new Array(rac).fill(-1);
    for (let j = 0; j < remain.length; j++) {
      for (let i = 0; i < remain[j]; i++) {
        candidate.push(j);
      }
    }
    roll(candidate, desire, remain, rac, 0);
  } else {
    setTimeout(() => {
      time = 0;
      n++;
      cal(n);
    }, 0.1)

  }

}
cal(n)


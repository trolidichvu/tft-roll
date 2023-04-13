let fs = require('fs');

let desiredArr = fs.readFileSync("./desired_4_tier.txt", "utf-8").trim().split('\n');

for (let i = 0; i < desiredArr.length; i++) {
  console.log(i)
  let desired = desiredArr[i];

  let temp = desired.split(',');
  if (temp[1] == 0) {
    for (let j = 1; j <= 12; j++) {
      for (let rac = 0; rac <= 144; rac = rac +1 ) {
        if (temp[0] <= j)
          fs.appendFileSync("test.txt", desired + ' ' + j + ',0,0 ' + rac + '\n');
      }
    }
  } else if (temp[2] == 0) {
    for (let j = 1; j <= 12; j++) {
      for (let k = 1; k <= 12; k++) {
        for (let rac = 0; rac <= 144; rac = rac+1) {
          if (temp[0] <= j && temp[1] <= k)
            fs.appendFileSync("test.txt", desired + ' ' + j + ',' + k + ',0 ' + rac + '\n');
        }
      }
    }
  } else {
    for (let j = 1; j <= 12; j++) {
      for (let k = 1; k <= 12; k++) {
        for (let l = 1; l <= 12; l++) {
          for (let rac = 0; rac <= 144; rac = rac +1) {
            if (temp[0] <= j && temp[1] <= k && temp[2] <= l)
              fs.appendFileSync("test.txt", desired + ' ' + j + ',' + k + ',' + l + ' ' + rac + '\n');
          }
        }
      }
   }
  }
}

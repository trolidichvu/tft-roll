const calFolder = './cal/';
const outputFolder = './calOutput/'
const fs = require('fs');

const CaseLength = 43168569;
let numberOfFiles =0;

let arrAll = [];
fs.readdirSync(calFolder).forEach(file => {
  numberOfFiles++;
  let arrCal = fs.readFileSync(calFolder+file,'utf-8').trim().split(",");
  arrAll.push(arrCal);
});



let result = [];
for(let i = 0; i< CaseLength ; i++){
    if(i%100000==0) console.log(i)
    let sum = 0;
    let time = 0;
    for(let j=0;j<arrAll.length;j++){
        if(arrAll[j][i]!="undefined"&&arrAll[j][i]){
            sum+= parseInt(arrAll[j][i]);
            time++;
        }
    }
    if(time>0){
        result[i] = sum / time;
    }else{
        result[i] = undefined;
    }
}

fs.writeFileSync(outputFolder+numberOfFiles, JSON.stringify(result));

import data from '/data.js';

let selections = ["pork", "potato", "grilled", "black_pepper"];
let rankings = wineTypeRankings(selections);

console.log(rankings);

function wineTypeRankings(selections) {
  let rankings = [];
  data.wineTypes.forEach(type => {
    rankings.push({name: type.name, score: 0});
    type.pairing.forEach(pairing => {
      selections.forEach(selection => {
        if(selection == pairing.id) {
          let typeWeight = getTypeWeightByID(data.ingredients, selection);
          let weight = pairing.weight * typeWeight;
          rankings = increaseScoreByName(rankings, type.name, weight);
        }
      });
    });
  });
  return rankings;
}

function increaseScoreByName(rankings, name, score) {
  let obj = rankings.find((o, i) => {
    if (o.name === name) {
        rankings[i]['score'] += score;
        return true;
    }
  });
  return rankings;
}

function getTypeWeightByID(ingredients, id) {
  let typeWeight = null;
  let obj = ingredients.find((o, i) => {
    if (o.id === id) {
      switch(o.type) {
        case 'main': typeWeight = 4; break;
        case 'secondary': typeWeight = 2; break;
        case 'prep': typeWeight = 1; break;
        case 'spice': typeWeight = 1; break;
      }
      return true;
    }
  });
  return typeWeight;
}

function getIngredientLabelByID(ingredients, id, noEmoji=false) {
  let label = null;
  let obj = ingredients.find((o, i) => {
    if (o.id === id) {
      label = o.label;
      return true;
    }
  });
  if(!noEmoji) return label;
  else return label.substring(3);
}

// Filtering by shared matches
// let selections = ["Red Meat", "Green Vegetables", "Sauteed / Fried", "Black Pepper"];

// let matches = [];
// data.wineTypes.forEach(type => {
//   //matches.push(type.name);
//   selections.forEach(selection => {
//     let obj = type.pairing.find((o, i) => {
//       if (o.name === name) {
//           rankings[i]['score'] += score;
//           return true; // stop searching
//       }
//     });
//     matches.push(type.name);
    
//   });
// });

// for another time... eg Sauteed Spicy Shrimps with Pasta, problem is we can't know if it's pasta or rice unless we split it up
// better just show their full selection with emojis in multiple rows
// function getDishName(selections) {
//   let labels = [];
//   selections.forEach(selection => {
//     labels.push(getIngredientLabelByID(data.ingredients, selection, true));
//   });
//   console.log(labels);
// }
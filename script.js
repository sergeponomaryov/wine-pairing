import data from '/data.js';

// Ranking by score

// let userIngredients = ["Red Meat", "Green Vegetables"];
// let userPrep = "Sauteed / Fried";
// let userSpice = "Black Pepper";
let selections = ["Lobster & Shellfish", "Nuts & Seeds", "Poached / Steamed", "Herbs"];
let wineRankings = [];

data.wineTypes.forEach(type => {
  wineRankings.push({name: type.name, score: 0});
  type.pairing.forEach(pairing => {
    selections.forEach(selection => {
      if(selection == pairing.name) {
        // determine weight by type
        let typeWeight = null;
        let obj = data.ingredients.find((o, i) => {
          if (o.name === selection) {
            switch(o.type) {
              case 'Main': typeWeight = 4; break;
              case 'Secondary': typeWeight = 2; break;
              case 'Prep': typeWeight = 1; break;
              case 'Spice': typeWeight = 1; break;
            }
            return true;
          }
        });
        let weight = pairing.weight * typeWeight;
        wineRankings = increaseScoreByName(wineRankings, type.name, weight);
      }
    });
  });
});

console.log(wineRankings);

function increaseScoreByName(rankings, name, score) {
  let obj = rankings.find((o, i) => {
    if (o.name === name) {
        rankings[i]['score'] += score;
        return true;
    }
  });
  return rankings;
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
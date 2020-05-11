const data = require('./data.json')

export function rankWineTypes(selections) {
  let scores = [];
  let matches = [];

  // calculate scores (weighted number of matches)
  data.wineTypes.forEach(type => {
    scores.push({ name: type.name, score: 0, examples: type.examples, id: type.id, matches: [], perfectMatches: [] });
    type.pairing.forEach(pairing => {
      selections.forEach(selection => {
        if (selection == pairing.id) {
          let typeWeight = getTypeWeightByID(data.ingredients, selection);
          let weight = pairing.weight * typeWeight;
          let isPerfectMatch = (pairing.weight == 2) ? true : false;
          scores = increaseScoreByName(scores, type.name, weight, selection, isPerfectMatch);
        }
      });
    });
  });

  // convert it to % match out of max possible score for these foods
  let maxScore = 0;
  selections.forEach(selection => {
    let typeWeight = getTypeWeightByID(data.ingredients, selection);
    maxScore += typeWeight * 2;
  });
  scores.forEach(scoreObj => {
    let match = (scoreObj.score / maxScore) * 100;
    match = Math.round(50 + (match / 2)); // min score 50, so that it looks better lol
    matches.push({ name: scoreObj.name, match: match, examples: scoreObj.examples, id: scoreObj.id, matches: scoreObj.matches, perfectMatches: scoreObj.perfectMatches });
  });

  // sort them
  matches.sort((a, b) => (a.match < b.match) ? 1 : -1);

  // by default show 2 results, but if second is 50 or less or if third is 100, show 1 or 3
  let size = 2;
  if (matches[1].match <= 50) size = 1;
  else if (matches[2].match == 100) size = 3;
  matches = matches.slice(0, size);

  return matches;
}

function increaseScoreByName(rankings, name, score, ingredient, isPerfectMatch) {
  let obj = rankings.find((o, i) => {
    if (o.name === name) {
      rankings[i]['score'] += score;
      // record matches/perfect matches with selection to wine group
      let label = getIngredientLabelByID(data.ingredients, ingredient);
      if (isPerfectMatch) rankings[i]['perfectMatches'].push(label);
      else rankings[i]['matches'].push(label);
      return true;
    }
  });
  return rankings;
}

function getTypeWeightByID(ingredients, id) {
  let typeWeight = null;
  let obj = ingredients.find((o, i) => {
    if (o.id === id) {
      switch (o.type) {
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

function getIngredientLabelByID(ingredients, id, noEmoji = false) {
  let label = null;
  let obj = ingredients.find((o, i) => {
    if (o.id === id) {
      label = o.label;
      return true;
    }
  });
  if (!noEmoji) return label;
  else return label.substring(3);
}
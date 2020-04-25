const ingredients = [
  {name: "Red Meat"},
  {name: "Cured Meat"},
  {name: "Pork"},
  {name: "Poultry"},
  {name: "Mollusks"},
  {name: "Fish"},
  {name: "Lobster & Shellfish"},
  {name: "Soft Cheese & Cream"},
  {name: "Pungent Cheese"},
  {name: "Hard Cheese"},
  {name: "Alliums"},
  {name: "Green Vegetables"},
  {name: "Root Vegetables & Squash"},
  {name: "Nightshades"},
  {name: "Mushrooms"},
  {name: "Nuts & Seeds"},
  {name: "Beans & Peas"},
  {name: "White Starches"},
  {name: "Whole Wheat Grains"},
  {name: "Sweet Starchy Vegetables"},
  {name: "Potato"},
  {name: "Fruit & Berries"},
  {name: "Vanilla & Caramel"},
  {name: "Chocolate & Coffee"},
];

const preparations = [
  {name: "Grilled / BBQ"},
  {name: "Sauteed / Fried"},
  {name: "Smoked"},
  {name: "Roasted"},
  {name: "Poached / Steamed"},
];

const spices = [
  {name: "Black Pepper"},
  {name: "Red Pepper"},
  {name: "Hot & Spicy"},
  {name: "Herbs"},
  {name: "Baking Spices"},
  {name: "Exotic & Aromatic Spices"},
];

const wineTypes = [
  {name: "Bold Red", pairing: [
    {"name": "Red Meat", "weight": 2},
    {"name": "Cured Meat", "weight": 1},
    {"name": "Pork", "weight": 1},
    {"name": "Grilled / BBQ", "weight": 2},
    {"name": "Smoked", "weight": 1},
    {"name": "Roasted", "weight": 2},
    {"name": "Pungent Cheese", "weight": 1},
    {"name": "Hard Cheese", "weight": 2},
    {"name": "Alliums", "weight": 1},
    {"name": "Nightshades", "weight": 1},
    {"name": "Mushrooms", "weight": 1},
    {"name": "Black Pepper", "weight": 2},
    {"name": "Red Pepper", "weight": 1},
    {"name": "White Starches", "weight": 1},
    {"name": "Potato", "weight": 1}
  ]},
  {name: "Medium Red", pairing: [
    {"name": "Red Meat", "weight": 1},
    {"name": "Cured Meat", "weight": 1},
    {"name": "Pork", "weight": 2},
    {"name": "Poultry", "weight": 1},
    {"name": "Grilled / BBQ", "weight": 1},
    {"name": "Smoked", "weight": 2},
    {"name": "Roasted", "weight": 1},
    {"name": "Soft Cheese & Cream", "weight": 1},
    {"name": "Pungent Cheese", "weight": 2},
    {"name": "Hard Cheese", "weight": 1},
    {"name": "Alliums", "weight": 2},
    {"name": "Nightshades", "weight": 2},
    {"name": "Mushrooms", "weight": 2},
    {"name": "Beans & Peas", "weight": 1},
    {"name": "Black Pepper", "weight": 1},
    {"name": "Red Pepper", "weight": 2},
    {"name": "Herbs", "weight": 1},
    {"name": "Baking Spices", "weight": 1},
    {"name": "Exotic & Aromatic Spices", "weight": 2},
    {"name": "White Starches", "weight": 1},
    {"name": "Potato", "weight": 1},
  ]},
  {name: "Light Red", pairing: [
    {"name": "abc", "weight": 1},
  ]},
  {name: "Rose", pairing: [
    {"name": "abc", "weight": 1},
  ]},
  {name: "Rich White", pairing: [
    {"name": "abc", "weight": 1},
  ]},
  {name: "Light White", pairing: [
    {"name": "abc", "weight": 1},
  ]},
  {name: "Sparkling", pairing: [
    {"name": "abc", "weight": 1},
  ]},
  {name: "Sweet White", pairing: [
    {"name": "abc", "weight": 1},
  ]},
  {name: "Dessert", pairing: [
    {"name": "abc", "weight": 1},
  ]},
];

console.log("hi");

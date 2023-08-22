let pots = [
  ['VIE1', 'PHI1', 'MAS1'],
  ['AUS1', 'SGP1', 'IDN1'],
  ['MYA1', 'PHI2', 'MAS2'],
  ['AUS2', 'SGP/CAM', 'IDN/MYA'],
];

// pots = [
//   ['JOR1', 'IRQ1', 'LBN1'],
//   ['KUW1', 'BHR1', 'SYR1'],
//   ['PLE1', 'IRQ2', 'LBN2'],
//   ['KUW2', 'BHR/OMA', 'SYR/PLE'],
// ];

// pots = [
//   ['KSA1', 'IRN1', 'QAT1', 'UZB1', 'KSA2'],
//   ['IRN2', 'QAT2', 'UZB2', 'KSA3', 'IRN3'],
//   ['JOR1', 'TJK1', 'IRQ1', 'TKM1', 'IND1'],
//   ['UAE1', 'KSA/UAE', 'IRN/UAE', 'QAT3/UZB4', 'QAT4/UZB3'],
// ];

pots = [
  ['KOR1', 'JPN1', 'CHN1', 'THA1', 'KOR2'],
  ['JPN2', 'CHN2', 'THA2', 'KOR3', 'JPN3'],
  ['VIE1', 'PHI1', 'MAS1', 'AUS1', 'SGP1'],
  ['HKG1', 'KOR4', 'JPN4', 'CHN3', 'THA3'],
];

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};
const isValid = (arr) => {
  let countries = arr
    .map((x) =>
      x
        ? x
            .split('/')
            .map((y) => y.substring(0, 3))
            .flat()
        : x
    )
    .flat();
  let uniquec = [...new Set(countries)];
  return countries.length === uniquec.length;
};
const areGroupsValid = (groups) => {
  return groups.map((i) => isValid(i)).reduce((a, b) => a && b, true);
};

let possibles = [];

let start = new Date().getTime();
permutator(pots[1]).forEach((a) => {
  x = pots[0].map((i, j) => [i, a[j]]);
  if (!areGroupsValid(x)) return;

  permutator(pots[2]).forEach((b) => {
    y = x.map((i, j) => [...i, b[j]]);
    if (!areGroupsValid(y)) return;

    permutator(pots[3]).forEach((c) => {
      z = y.map((i, j) => [...i, c[j]]);
      if (!areGroupsValid(z)) return;
      possibles.push(
        z.map((pot, idx) => {
          return pot.map((team, idx) => pots[idx].indexOf(team));
        })
      );
    });
  });
});
let end = new Date().getTime();

console.log(possibles, possibles.length);
console.log('time elapsed ', end - start, ' ms');

let pots = [
  ['IRN3', 'UAE3', 'KSA4', 'QAT4'],
  ['IRN4', 'UAE4', 'UZB2', 'IRQ2'],
  ['JOR1', 'TJK1', 'IND1', 'BHR1'],
  ['JOR2', 'TJK2', 'TKM1', 'KUW1'],
];

// pots = [
//   ['THA2', 'JPN4', 'KOR4', 'CHN4'],
//   ['THA3', 'AUS2', 'MAS2', 'VIE1'],
//   ['HKG1', 'PHI1', 'SIN1', 'THA4'],
//   ['HKG2', 'PHI2', 'SIN2', 'IDN1'],
// ];

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

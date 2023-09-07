let pots = [
  ['AFC1', 'SAM1', 'NAM1', 'EUR1', 'EUR2', 'AFC2'],
  ['EUR3', 'CAF1', 'EUR4', 'AFC3', 'SAM2', 'SAM3'],
  ['OFC1', 'AFC4', 'CAF2', 'NAM2', 'AFC5', 'CAF3'],
  ['NAM3', 'OFC2', 'NAM4', 'CAF4', 'EUR5', 'SAM4'],
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

  possibles.push(
    x.map((pot) => {
      return pot.map((team, idx) => pots[idx].indexOf(team));
    })
  );

  // permutator(pots[2]).forEach((b) => {
  //   y = x.map((i, j) => [...i, b[j]]);
  //   if (!areGroupsValid(y)) return;

  //   permutator(pots[3]).forEach((c) => {
  //     z = y.map((i, j) => [...i, c[j]]);
  //     if (!areGroupsValid(z)) return;
  //     possibles.push(
  //       z.map((pot, idx) => {
  //         return pot.map((team, idx) => pots[idx].indexOf(team));
  //       })
  //     );
  //   });
  // });
});
let end = new Date().getTime();

console.log(possibles, possibles.length);
console.log('time elapsed ', end - start, ' ms');

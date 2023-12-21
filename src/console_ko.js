let pots = [
  ['F1', 'G1', 'H1', 'I1', 'J1'],
  ['G2', 'F2', 'I2'],
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
  let groups = arr
    .map((x) =>
      x
        ? x
            .split('/')
            .map((y) => y.substring(0, 1))
            .flat()
        : x
    )
    .flat();
  let uniquec = [...new Set(groups)];
  return groups.length === uniquec.length;
};
const areGroupsValid = (groups) => {
  return groups.map((i) => isValid(i)).reduce((a, b) => a && b, true);
};

let possibles = [];

let start = new Date().getTime();
pots[0].forEach((a, i) => {
  const pot1 = [...pots[0]];
  const pot2 = [...pots[1]];
  pot1.splice(i, 1);
  pot2.push(a);

  permutator(pot2).forEach((c) => {
    z = pot1.map((i, j) => [i, c[j]]);
    if (!areGroupsValid(z)) return;
    possibles.push(z);
  });
});
let end = new Date().getTime();

console.log(possibles, possibles.length);
console.log('time elapsed ', end - start, ' ms');

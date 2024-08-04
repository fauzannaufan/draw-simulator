let pots = [
  ['UAE1', 'KSA1', 'QAT1', 'IRN1', 'UZB1', 'IRQ1'],
  ['KSA2', 'QAT2', 'IRN2', 'UAE2', 'KSA3', 'UAE3']
];

pots = [
  ['JPN1', 'KOR1', 'CHN1', 'THA1', 'AUS1', 'MAS1'],
  ['JPN2', 'KOR2', 'CHN2', 'JPN3', 'KOR3', 'THA2']
]

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
const areGroupsValid = (groups) => {
  const countries = {}
  let isValid = true;
  groups.forEach((group, groupIndex) => {
    group.forEach(team => {
      const country = team.substring(0,3);
      if (country in countries) {
        if (groupIndex !== countries[country]) {
          isValid = false;
          return;
        }
      } else {
        countries[country] = groupIndex;
      }
    })
  })
  return isValid;
};

let possibles = [];

let start = new Date().getTime();
permutator(pots[0]).forEach(a => {
  x = [
    [a[0],a[3]],
    [a[1],a[4]],
    [a[2],a[5]]
  ]
  if (!areGroupsValid(x)) return;

  permutator(pots[1]).forEach(b => {
    y = [
      [a[0],a[3],b[0],b[3]],
      [a[1],a[4],b[1],b[4]],
      [a[2],a[5],b[2],b[5]]
    ]
    if (!areGroupsValid(y)) return;
    possibles.push(
      y.map(group => group.map((team,index) => pots[Math.floor(index/2)].indexOf(team)))
    );
  })
})
let end = new Date().getTime();

console.log(possibles, possibles.length);
console.log('time elapsed ', end - start, ' ms');

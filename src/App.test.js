import LocalData from './DATABASE/data.json';

const data = LocalData;
const trimData = data.map(item => {
  return {...item, Model: item.Model.replace(/-/g, ' ').toUpperCase()}
})

const getUniqueList = (inputData, key) => {
  return [...new Map(inputData.map(item => [item[key], item])).values()]
}
const uniqeModelData = getUniqueList(trimData, 'Model')

const addNumber = uniqeModelData.map(item => {
  let count = trimData.filter((obj) => obj.Model === item.Model).length
  return {...item, Number: count}
})

let listProductSold = addNumber.sort(function(a, b){return b.Number-a.Number});

let rank = 1;
let bestProduct = [];
for (let i = 0; i < listProductSold.length; i++) {
  if (i > 0 && listProductSold[i].Number < listProductSold[i - 1].Number) {
    rank++;
  }
  if (rank > 3) {
    break;
  } else {
    bestProduct.push(listProductSold[i]);
  }
}

describe('Used data', () => {
  const notExpected = [{
    "ID": "43",
    "Make": "Polygon",
    "Model": "EC-5",
    "Price": "899",
    "UserID": "434",
    "Date": "2021-05-15"
  },{
    "ID": "44",
    "Make": "Dahon",
    "Model": "Beryll",
    "Price": "2100",
    "UserID": "512",
    "Date": "2021-05-03"
  }]

  const allMakes = { Make: 'Gudereit', Make: 'Diamant', Make: 'Awesome Bikes', Make: 'Kettler' }
  const invalidMakes = { Make: 'Dahon', Make: 'Tern' }

  it('does not contain foreign objects ', () => {
    expect(data).toEqual(expect.not.arrayContaining(notExpected));
  });
  
  it('includes valid makes and excludes invalid ones', () => {
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(allMakes),
        expect.not.objectContaining(invalidMakes)
      ])
    );
  })
});

describe('All available sold models', () => {
  it('are valid models', () => {
    const allModels = { Model: 'EC 5', Model: 'BERYLL', Model: 'ET 9 EVO', Model: 'DIRT DRIFTER 3000', Model: 'JUNA', Model: 'VELOSSI', Model: 'MANDARA' }
    const allMakes = { Make: 'Gudereit', Make: 'Diamant', Make: 'Awesome Bikes', Make: 'Kettler'}
    
    expect(uniqeModelData).toEqual(
      expect.arrayContaining([
        expect.objectContaining(allModels)
      ])
    );

    expect(listProductSold).toEqual(
      expect.arrayContaining([
        expect.objectContaining(allMakes),
        expect.objectContaining(allModels)
      ])
    );
  })

  it('are sorted into unique ones', () => {
    const ec5 = { Make: 'Gudereit', Model: 'EC 5' }
    const beryll = { Make: 'Diamant', Model: 'BERYLL' }
    const juna = { Make: 'Diamant', Model: 'JUNA' }
    const et9evo = { Make: 'Gudereit', Model: 'ET 9 EVO' }
    const dd3000 = { Make: 'Awesome Bikes', Model: 'DIRT DRIFTER 3000' }
    const velossi = { Make: 'Kettler', Model: 'VELOSSI' }
    const mandara = { Make: 'Diamant', Model: 'MANDARA' }

    expect(uniqeModelData).toEqual(
      expect.arrayContaining([
        expect.objectContaining( ec5, beryll, juna, et9evo, dd3000, velossi, mandara )
      ])
    );
  })

  it('do not contain invalid makes', () => {
    const invalidMakes = { Make: 'Dahon', Make: 'Tern'}
    expect(listProductSold).toEqual(
      expect.arrayContaining([
        expect.not.objectContaining(invalidMakes)
      ])
    );
  });
});

describe('3 top-ranked products', () => {
  
    let showBestProduct = bestProduct.map(item => {
      return {Make: item["Make"], Model: item["Model"], Number: item["Number"]}
    });

    const mostFreqAdvertised = [
      { Make: 'Gudereit', Model: 'EC 5', Number: 4 },
      { Make: 'Diamant', Model: 'BERYLL', Number: 3 },
      { Make: 'Gudereit', Model: 'ET 9 EVO', Number: 2 },
      { Make: 'Awesome Bikes', Model: 'DIRT DRIFTER 3000', Number: 2 } ];
    
    const firstRankObject = { Make: 'Gudereit', Model: 'EC 5' }
    const secondRankObject = { Make: 'Diamant', Model: 'BERYLL' }
    const thirdRankObjects = { Model: 'ET 9 EVO', Model: 'DIRT DRIFTER 3000'}
    const notTopModels = { Model: 'JUNA', Model: 'VELOSSI', Model: 'MANDARA'}
    const topModels = { Model: 'EC 5', Model: 'BERYLL', Model: 'ET 9 EVO', Model: 'DIRT DRIFTER 3000' }

  it('contain top object properties', () => {
    expect(bestProduct).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          firstRankObject, secondRankObject, thirdRankObjects
        )
      ])
    );
  });

  it('are the most frequently advertised bikes', () => {
    expect(showBestProduct).toEqual(mostFreqAdvertised);
  })

  it('include most frequently advertised ones and exclude others', () => {
    expect(showBestProduct).toEqual(
      expect.arrayContaining([
        expect.objectContaining(topModels),
        expect.not.objectContaining(notTopModels)
      ])
    );
  })
});
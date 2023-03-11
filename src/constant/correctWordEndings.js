const correctEndingHotels = (count, arrCorrectWords) => {
  let currentEnd = '';
  const [firstWord, secondWord, thirdWord] = arrCorrectWords;

  if (count === 11) {
    return thirdWord;
  }

  switch (count % 10) {
    case 1:
      currentEnd = firstWord;
      break;
    case 2:
    case 3:
    case 4:
      currentEnd = secondWord;
      break;
    default:
      currentEnd = thirdWord;
      break;
  }

  return currentEnd;
};

const correctEndingDays = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return `${
    titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ]
  }`;
};

export { correctEndingHotels, correctEndingDays };

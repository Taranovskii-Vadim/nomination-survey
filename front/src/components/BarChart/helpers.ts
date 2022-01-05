export const getRandomHex = () => {
  const hexSymb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let result = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexSymb.length);
    result += hexSymb[randomIndex];
  }
  return result;
};

export const getColors = (length: number): string[][] => {
  const firstTemp = [];
  const secondTemp = [];

  for (let i = 0; i < length; i++) {
    const random = getRandomHex();

    secondTemp.push(random);
    firstTemp.push(`${random}30`);
  }

  return [firstTemp, secondTemp];
};

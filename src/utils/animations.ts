export const blueTheme = [
  { category: 'Housing', color: '#0066FF' },     // Bright Blue
  { category: 'Food', color: '#0052CC' },        // Medium Blue
  { category: 'Transport', color: '#003D99' },   // Deep Blue
  { category: 'Shopping', color: '#002966' },    // Darker Blue
  { category: 'Others', color: '#001433' }       // Darkest Blue
];

export const getRandomStart = () => {
  // Returns a random number between -180 and 180 degrees
  return Math.floor(Math.random() * 360 - 180);
};

export const getRandomPosition = () => {
  // Returns a random rotation between 0 and 360 degrees
  return Math.floor(Math.random() * 360);
};
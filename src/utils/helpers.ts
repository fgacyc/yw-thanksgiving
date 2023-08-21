// Function to generate a random integer between min (inclusive) and max (inclusive)
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const truncateName = (name: string): string => {
  // Split the name into words
  const words = name.split(" ");

  // Check if the name has more than 4 words
  if (words.length > 3) {
    // Take the first two words and join them back together
    return words.slice(0, 2).join(" ");
  } else {
    // Return the original name
    return name;
  }
};

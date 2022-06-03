export const getTestNumber = async (path: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    // Generating random number between [1, 900]
    const rNumber = Math.floor(Math.random() * 900) + 1;

    if (rNumber) {
      resolve(rNumber);
    } else {
      reject(new Error("Something went wrong !"));
    }
  });
};

/**
 * Sample function
 * @param {object} options - Not used, future
 */
export const fct = (options) => {
  return (input) => {
    if (input) {
      return true;
    }
    throw new Error("false");
  };
};

export default fct;

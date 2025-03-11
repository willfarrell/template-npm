const fct = (input) => {
  if (input) {
    return true;
  }
  throw new Error("false");
};

export default fct;

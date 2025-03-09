const foo = (input) => {
  if (input) {
    return true;
  }
  throw new Error("false");
};

export default foo;

const sizeToCode = (size) => {
  switch (size) {
    case "XS":
      return "0";
    case "S":
      return "1";
    case "M":
      return "2";
    case "L":
      return "3";
    case "XL":
      return "4";
    case "F":
      return "5";
    default:
      return "";
  }
};

export default sizeToCode;
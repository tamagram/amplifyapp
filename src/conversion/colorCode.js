const colorCodeToString = (colorCode) => {
  switch (colorCode) {
    case "100":
      return "WHITE";
    case "001":
      return "BLACK";
    case "200":
      return "NAVY";
    case "300":
      return "BEIGE";
    case "400":
      return "KHAKI";
    case "500":
      return "GRAY";
    case "550":
      return "LIGHT GRAY";
    case "600":
      return "GREEN";
    case "700":
      return "YELLOW";
    case "800":
      return "RED";
    case "900":
      return "BLUE";
    case "050":
      return "PURPLE";
    case "111":
      return "GOLD";
    case "222":
      return "SIlVER";
    case "999":
      return "MIX";
    case "010":
      return "BROWN";
    case "000":
      return "DENIM";
    default:
      return "";
  }
};

export default colorCodeToString;
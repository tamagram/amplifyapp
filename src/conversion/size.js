const sizeToCode = (size) => {
  switch (size) {
    //アパレル
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
    //ジュエリー
    case "15号":
      return "6";
    case "16号":
      return "7";
    case "17号":
      return "8";
    case "18号":
      return "9";
    case "19号":
      return "10";
    case "20号":
      return "11";
    case "21号":
      return "12";
    case "22号":
      return "13";
    //シューズ
    case "23.0cm":
      return "14";
    case "23.5cm":
      return "15";
    case "24.0cm":
      return "16";
    case "24.5cm":
      return "17";
    case "25.0cm":
      return "18";
    case "25.5cm":
      return "19";
    case "26.0cm":
      return "20";
    case "26.5cm":
      return "21";
    case "27.0cm":
      return "22";
    case "27.5cm":
      return "23";
    case "28.0cm":
      return "24";
    case "28.5cm":
      return "25";
    case "29.0cm":
      return "26";
    case "29.5cm":
      return "27";
  }
};
export default sizeToCode;
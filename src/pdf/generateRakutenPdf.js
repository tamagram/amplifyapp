import jsPDF from "jspdf";
import { font as fontBold } from "../font/GenShinGothic-Bold";
import { font as fontMedium } from "../font/GenShinGothic-Medium";
import { font as fontNormal } from "../font/GenShinGothic-Normal";

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

const generateRakutenPdf = (product) => {
  const setFabricItem = (value, x, y) => {
    const [item, ratio] = value.replace(/ /g, "").split(/[:|：]/);
    if (item && ratio) {
      doc.setFont("GenShinGothic", "normal");
      doc.setFontSize(6);
      doc.text(item + " :", x, y);
      doc.setFont("GenShinGothic", "bold");
      doc.setFontSize(7);
      doc.text(ratio, x + (item.length + 3) * 1.6, y);
    }
  };

  const generateSticker = (doc, x, y) => {
    const offsetX = 3;
    const adjustedX = x + offsetX;
    doc.setFont("GenShinGothic", "bold");
    doc.setFontSize(10);
    doc.text(product.sku, adjustedX + 20, y + 4.25, null, null, "center");
    doc.line(adjustedX, y + 6.25, adjustedX + 41, y + 6.25);
    doc.setFontSize(9);
    doc.text(product.name, adjustedX + 20, y + 11.25, null, null, "center");
    doc.line(adjustedX, y + 14.25, adjustedX + 41, y + 14.25);
    doc.setFont("GenShinGothic", "normal");
    doc.setFontSize(6);
    doc.text("SIZE:", adjustedX, y + 19.25);
    doc.setFont("GenShinGothic", "bold");
    doc.setFontSize(10);
    doc.text(product.size, adjustedX + 20, y + 19.25, null, null, "center");
    doc.line(adjustedX, y + 22.25, adjustedX + 41, y + 22.25);
    doc.setFont("GenShinGothic", "normal");
    doc.setFontSize(6);
    doc.text("COLOR:", adjustedX, y + 27.25);
    doc.setFont("GenShinGothic", "bold");
    doc.setFontSize(10);
    doc.text(
      colorCodeToString(product.color),
      adjustedX + 20,
      y + 27.25,
      null,
      null,
      "center"
    );
    doc.line(adjustedX, y + 30.25, adjustedX + 41, y + 30.25);
    doc.setFont("GenShinGothic", "normal");
    doc.setFontSize(6);
    doc.text(
      "PRICE:                                                            税込",
      adjustedX,
      y + 35.25
    );
    doc.setFont("GenShinGothic", "bold");
    doc.setFontSize(10);
    doc.text(
      product.price
        ? "￥" +
            Math.trunc(products[0].price * 1.1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : "未設定",
      adjustedX + 20,
      y + 35.25,
      null,
      null,
      "center"
    );
    doc.setFont("GenShinGothic", "normal");
    doc.setFontSize(6);
    doc.text(
      product.price
        ? "( 本体価格 ￥" +
            products[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            " )"
        : "未設定",
      adjustedX + 20,
      y + 38.25,
      null,
      null,
      "center"
    );
    doc.line(adjustedX, y + 40.25, adjustedX + 41, y + 40.25);
    doc.text("FABRIC:", adjustedX, y + 44.25);
    if (product.fabric) {
      let fabricY = y + 48.25;
      product.fabric.split("\n").forEach((value, index) => {
        switch (value) {
          case "本体":
            doc.setFont("GenShinGothic", "normal");
            doc.setFontSize(6);
            doc.text("本体", adjustedX + 1, fabricY);
            break;
          case "裏地":
            doc.setFont("GenShinGothic", "normal");
            doc.setFontSize(6);
            doc.text("裏地", adjustedX + 1, fabricY);
            break;
          default:
            setFabricItem(value, adjustedX + 2, fabricY);
            break;
        }
        fabricY += 3;
      });
    }
    doc.setFont("GenShinGothic", "normal");
    doc.setFontSize(6);
    doc.text(
      product.country + "製",
      adjustedX + 20,
      y + 65.25,
      null,
      null,
      "center"
    );
    doc.line(adjustedX, y + 68.25, adjustedX + 41, y + 68.25);
    doc.setFont("GenShinGothic", "medium");
    doc.setFontSize(8);
    doc.text(
      "株式会社 Adakust",
      adjustedX + 20,
      y + 72.25,
      null,
      null,
      "center"
    );
    doc.text("0467-33-1399", adjustedX + 20, y + 76.25, null, null, "center");
  };

  const products = [
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
    product,
  ];

  const doc = new jsPDF("landscape");
  doc.addFileToVFS("GenShinGothic-Bold.ttf", fontBold);
  doc.addFileToVFS("GenShinGothic-Medium.ttf", fontMedium);
  doc.addFileToVFS("GenShinGothic-Normal.ttf", fontNormal);
  doc.addFont("GenShinGothic-Bold.ttf", "GenShinGothic", "bold");
  doc.addFont("GenShinGothic-Medium.ttf", "GenShinGothic", "medium");
  doc.addFont("GenShinGothic-Normal.ttf", "GenShinGothic", "normal");
  doc.setLineWidth(0.1);

  // // gird top
  // doc.setDrawColor(0, 0, 0);
  // doc.line(24, 23.75, 71, 23.75);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(71, 23.75, 118, 23.75);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(118, 23.75, 165, 23.75);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(165, 23.75, 212, 23.75);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(212, 23.75, 259, 23.75);

  // doc.line(24, 102.25, 71, 102.25);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(71, 102.25, 118, 102.25);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(118, 102.25, 165, 102.25);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(165, 102.25, 212, 102.25);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(212, 102.25, 259, 102.25);

  // // grid bottom
  // doc.line(24, 107.75, 71, 107.75);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(71, 107.75, 118, 107.75);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(118, 107.75, 165, 107.75);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(165, 107.75, 212, 107.75);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(212, 107.75, 259, 107.75);

  // doc.line(24, 186.25, 71, 186.25);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(71, 186.25, 118, 186.25);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(118, 186.25, 165, 186.25);
  // doc.setDrawColor(255, 0, 0);
  // doc.line(165, 186.25, 212, 186.25);
  // doc.setDrawColor(0, 0, 0);
  // doc.line(212, 186.25, 259, 186.25);

  // content
  products.forEach((product, index) => {
    switch (index) {
      case 0:
        generateSticker(doc, 24, 23.75);
        break;
      case 1:
        generateSticker(doc, 71, 23.75);
        break;
      case 2:
        generateSticker(doc, 118, 23.75);
        break;
      case 3:
        generateSticker(doc, 165, 23.75);
        break;
      case 4:
        generateSticker(doc, 212, 23.75);
        break;
      case 5:
        generateSticker(doc, 24, 107.75);
        break;
      case 6:
        generateSticker(doc, 71, 107.75);
        break;
      case 7:
        generateSticker(doc, 118, 107.75);
        break;
      case 8:
        generateSticker(doc, 165, 107.75);
        break;
      case 9:
        generateSticker(doc, 212, 107.75);
        break;
      default:
        break;
    }
  });
  return doc.output("datauristring");
};

export default generateRakutenPdf;

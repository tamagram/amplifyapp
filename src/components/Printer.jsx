import jsPDF from "jspdf";
import { Container } from "react-bootstrap";

import { myfont } from "../font/mplus";

const doc = new jsPDF("landscape");
doc.addFileToVFS("mplus.ttf", myfont);
doc.addFont("mplus.ttf", "mplus", "normal");

const Printer = () => {
  doc.setFontSize(9);
  
  // gird top
  doc.setDrawColor(0, 0, 0);
  doc.line(24, 23.75, 71, 23.75);
  doc.setDrawColor(255, 0, 0);
  doc.line(71, 23.75, 118, 23.75);
  doc.setDrawColor(0, 0, 0);
  doc.line(118, 23.75, 165, 23.75);
  doc.setDrawColor(255, 0, 0);
  doc.line(165, 23.75, 212, 23.75);
  doc.setDrawColor(0, 0, 0);
  doc.line(212, 23.75, 259, 23.75);

  doc.line(24, 102.25, 71, 102.25);
  doc.setDrawColor(255, 0, 0);
  doc.line(71, 102.25, 118, 102.25);
  doc.setDrawColor(0, 0, 0);
  doc.line(118, 102.25, 165, 102.25);
  doc.setDrawColor(255, 0, 0);
  doc.line(165, 102.25, 212, 102.25);
  doc.setDrawColor(0, 0, 0);
  doc.line(212, 102.25, 259, 102.25);

  // grid bottom
  doc.line(24, 107.75, 71, 107.75);
  doc.setDrawColor(255, 0, 0);
  doc.line(71, 107.75, 118, 107.75);
  doc.setDrawColor(0, 0, 0);
  doc.line(118, 107.75, 165, 107.75);
  doc.setDrawColor(255, 0, 0);
  doc.line(165, 107.75, 212, 107.75);
  doc.setDrawColor(0, 0, 0);
  doc.line(212, 107.75, 259, 107.75);

  doc.line(24, 186.25, 71, 186.25);
  doc.setDrawColor(255, 0, 0);
  doc.line(71, 186.25, 118, 186.25);
  doc.setDrawColor(0, 0, 0);
  doc.line(118, 186.25, 165, 186.25);
  doc.setDrawColor(255, 0, 0);
  doc.line(165, 186.25, 212, 186.25);
  doc.setDrawColor(0, 0, 0);
  doc.line(212, 186.25, 259, 186.25);

  // content

  // Gill Sans Nova
  // Gill Sans Ultra Bold Condensed - Light*
  // Microsoft JhengHei UI - Bold
  // Osaka*
  // 砧 iroha 22momi StdN R
  doc.setFont("mplus", "normal");
  doc.setFontSize(10);
  doc.text("01211322113-500", 47, 28, null, null, "center");
  doc.setLineWidth(0.1);
  doc.line(24, 30, 71, 30);
  doc.text("Wool Mohair Cardigan", 47, 35, null, null, "center");
  doc.line(24, 38, 71, 38);
  doc.setFontSize(7);
  doc.text("FABLIC:", 24, 43);
  doc.setFontSize(10);
  doc.text("F", 47, 43, null, null, "center");
  doc.line(24, 46, 71, 46);
  doc.setFontSize(7);
  doc.text("COLOR:", 24, 51);
  doc.setFontSize(10);
  doc.text("BLACK", 47, 51, null, null, "center");
  doc.line(24, 54, 71, 54);
  doc.setFontSize(7);
  doc.text("PRICE:", 24, 59);
  doc.setFontSize(10);
  doc.text("￥9,300", 47, 59, null, null, "center");
  doc.line(24, 62, 71, 62);
  doc.setFontSize(7);
  doc.text("FABLIC:", 24, 67);
  doc.text("本体", 25, 71);
  doc.text("アクリル : 30%", 26, 75);
  doc.text("モヘア : 10%", 26, 79);
  doc.text("ウール : 60%", 26, 83);
  doc.text("韓国製", 47, 89.5, null, null, "center");
  doc.line(24, 92, 71, 92);
  doc.text("株式会社 Adakust", 47, 96, null, null, "center");
  doc.text("0467-33-1399", 47, 100, null, null, "center");

  const data = doc.output("datauristring");
  const iframe = (
    <iframe
      title="preview"
      width="100%"
      height="600px"
      src={data}
      frameborder="0"
    ></iframe>
  );
  return (
    <>
      <Container className="my-5">
        <div>
          <h1>Printer</h1>
          {iframe}
        </div>
      </Container>
    </>
  );
};

export default Printer;

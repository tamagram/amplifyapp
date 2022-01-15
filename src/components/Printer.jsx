import jsPDF from "jspdf";
import { Container } from "react-bootstrap";

const doc = new jsPDF("landscape");

const Printer = () => {
  doc.setFontSize(9);
  // top
  doc.setFont("courier", "normal");
  doc.text("Wool Mohair Cardigan", 24, 30);
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

  // bottom

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

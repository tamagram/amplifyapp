import jsPDF from "jspdf";
import { Container, Form, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listProducts as listProductsQuery } from "../graphql/queries";

import { myfont } from "../font/mplus";

const generatePdf = (product) => {
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
  doc.addFileToVFS("mplus.ttf", myfont);
  doc.addFont("mplus.ttf", "mplus", "normal");

  doc.setFontSize(9);
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

  // Gill Sans Nova
  // Gill Sans Ultra Bold Condensed - Light*
  // Microsoft JhengHei UI - Bold
  // Osaka*
  // 砧 iroha 22momi StdN R

  products.forEach((product, index) => {
    switch (index) {
      case 0:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 47, 28, null, null, "center");
        doc.line(27, 30, 68, 30);
        doc.text(product.name, 47, 35, null, null, "center");
        doc.line(27, 38, 68, 38);
        doc.setFontSize(7);
        doc.text("SIZE:", 27, 43);
        doc.setFontSize(10);
        doc.text(product.size, 47, 43, null, null, "center");
        doc.line(27, 46, 68, 46);
        doc.setFontSize(7);
        doc.text("COLOR:", 27, 51);
        doc.setFontSize(10);
        doc.text(product.color, 47, 51, null, null, "center");
        doc.line(27, 54, 68, 54);
        doc.setFontSize(7);
        doc.text("PRICE:", 27, 59);
        doc.setFontSize(10);
        doc.text(product.price, 47, 59, null, null, "center");
        doc.line(27, 62, 68, 62);
        doc.setFontSize(7);
        doc.text("FABLIC:", 27, 67);
        doc.text("本体", 28, 71);
        // product.fabric.forEach((value, index) => {
        //   switch (index) {
        //     case 0:
        //       doc.text(value, 29, 75);
        //       break;
        //     case 1:
        //       doc.text(value, 29, 79);
        //       break;
        //     case 2:
        //       doc.text(value, 29, 83);
        //       break;
        //     default:
        //       break;
        //   }
        // });
        doc.text("アクリル : 30%", 29, 75);
        doc.text("モヘア : 10%", 29, 79);
        doc.text("ウール : 60%", 29, 83);
        doc.text("韓国製", 47, 89.5, null, null, "center");
        doc.line(27, 92, 68, 92);
        doc.text("株式会社 Adakust", 47, 96, null, null, "center");
        doc.text("0467-33-1399", 47, 100, null, null, "center");
        break;
      case 1:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 94.5, 28, null, null, "center");
        doc.line(74, 30, 115, 30);
        doc.text(product.name, 94.5, 35, null, null, "center");
        doc.line(74, 38, 115, 38);
        doc.setFontSize(7);
        doc.text("SIZE:", 74, 43);
        doc.setFontSize(10);
        doc.text(product.size, 94.5, 43, null, null, "center");
        doc.line(74, 46, 115, 46);
        doc.setFontSize(7);
        doc.text("COLOR:", 74, 51);
        doc.setFontSize(10);
        doc.text(product.color, 94.5, 51, null, null, "center");
        doc.line(74, 54, 115, 54);
        doc.setFontSize(7);
        doc.text("PRICE:", 74, 59);
        doc.setFontSize(10);
        doc.text(product.price, 94.5, 59, null, null, "center");
        doc.line(74, 62, 115, 62);
        doc.setFontSize(7);
        doc.text("FABLIC:", 74, 67);
        doc.text("本体", 75, 71);
        doc.text("アクリル : 30%", 76, 75);
        doc.text("モヘア : 10%", 76, 79);
        doc.text("ウール : 60%", 76, 83);
        doc.text("韓国製", 94.5, 89.5, null, null, "center");
        doc.line(74, 92, 115, 92);
        doc.text("株式会社 Adakust", 94.5, 96, null, null, "center");
        doc.text("0467-33-1399", 94.5, 100, null, null, "center");
        break;
      case 2:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 141.5, 28, null, null, "center");
        doc.line(121, 30, 162, 30);
        doc.text(product.name, 141.5, 35, null, null, "center");
        doc.line(121, 38, 162, 38);
        doc.setFontSize(7);
        doc.text("SIZE:", 121, 43);
        doc.setFontSize(10);
        doc.text(product.size, 141.5, 43, null, null, "center");
        doc.line(121, 46, 162, 46);
        doc.setFontSize(7);
        doc.text("COLOR:", 121, 51);
        doc.setFontSize(10);
        doc.text(product.color, 141.5, 51, null, null, "center");
        doc.line(121, 54, 162, 54);
        doc.setFontSize(7);
        doc.text("PRICE:", 121, 59);
        doc.setFontSize(10);
        doc.text(product.price, 141.5, 59, null, null, "center");
        doc.line(121, 62, 162, 62);
        doc.setFontSize(7);
        doc.text("FABLIC:", 121, 67);
        doc.text("本体", 122, 71);
        doc.text("アクリル : 30%", 123, 75);
        doc.text("モヘア : 10%", 123, 79);
        doc.text("ウール : 60%", 123, 83);
        doc.text("韓国製", 141.5, 89.5, null, null, "center");
        doc.line(121, 92, 162, 92);
        doc.text("株式会社 Adakust", 141.5, 96, null, null, "center");
        doc.text("0467-33-1399", 141.5, 100, null, null, "center");
        break;
      case 3:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 188.5, 28, null, null, "center");
        doc.line(168, 30, 209, 30);
        doc.text(product.name, 188.5, 35, null, null, "center");
        doc.line(168, 38, 209, 38);
        doc.setFontSize(7);
        doc.text("SIZE:", 168, 43);
        doc.setFontSize(10);
        doc.text(product.size, 188.5, 43, null, null, "center");
        doc.line(168, 46, 209, 46);
        doc.setFontSize(7);
        doc.text("COLOR:", 168, 51);
        doc.setFontSize(10);
        doc.text(product.color, 188.5, 51, null, null, "center");
        doc.line(168, 54, 209, 54);
        doc.setFontSize(7);
        doc.text("PRICE:", 168, 59);
        doc.setFontSize(10);
        doc.text(product.price, 188.5, 59, null, null, "center");
        doc.line(168, 62, 209, 62);
        doc.setFontSize(7);
        doc.text("FABLIC:", 168, 67);
        doc.text("本体", 169, 71);
        doc.text("アクリル : 30%", 170, 75);
        doc.text("モヘア : 10%", 171, 79);
        doc.text("ウール : 60%", 171, 83);
        doc.text("韓国製", 188.5, 89.5, null, null, "center");
        doc.line(168, 92, 209, 92);
        doc.text("株式会社 Adakust", 188.5, 96, null, null, "center");
        doc.text("0467-33-1399", 188.5, 100, null, null, "center");
        break;
      case 4:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 235.5, 28, null, null, "center");
        doc.line(215, 30, 256, 30);
        doc.text(product.name, 235.5, 35, null, null, "center");
        doc.line(215, 38, 256, 38);
        doc.setFontSize(7);
        doc.text("SIZE:", 215, 43);
        doc.setFontSize(10);
        doc.text(product.size, 235.5, 43, null, null, "center");
        doc.line(215, 46, 256, 46);
        doc.setFontSize(7);
        doc.text("COLOR:", 215, 51);
        doc.setFontSize(10);
        doc.text(product.color, 235.5, 51, null, null, "center");
        doc.line(215, 54, 256, 54);
        doc.setFontSize(7);
        doc.text("PRICE:", 215, 59);
        doc.setFontSize(10);
        doc.text(product.price, 235.5, 59, null, null, "center");
        doc.line(215, 62, 256, 62);
        doc.setFontSize(7);
        doc.text("FABLIC:", 215, 67);
        doc.text("本体", 216, 71);
        doc.text("アクリル : 30%", 217, 75);
        doc.text("モヘア : 10%", 217, 79);
        doc.text("ウール : 60%", 217, 83);
        doc.text("韓国製", 235.5, 89.5, null, null, "center");
        doc.line(215, 92, 256, 92);
        doc.text("株式会社 Adakust", 235.5, 96, null, null, "center");
        doc.text("0467-33-1399", 235.5, 100, null, null, "center");
        break;
      case 5:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 47, 112, null, null, "center");
        doc.line(27, 114, 68, 114);
        doc.text(product.name, 47, 119, null, null, "center");
        doc.line(27, 122, 68, 122);
        doc.setFontSize(7);
        doc.text("SIZE:", 27, 127);
        doc.setFontSize(10);
        doc.text(product.size, 47, 127, null, null, "center");
        doc.line(27, 130, 68, 130);
        doc.setFontSize(7);
        doc.text("COLOR:", 27, 135);
        doc.setFontSize(10);
        doc.text(product.color, 47, 135, null, null, "center");
        doc.line(27, 138, 68, 138);
        doc.setFontSize(7);
        doc.text("PRICE:", 27, 143);
        doc.setFontSize(10);
        doc.text(product.price, 47, 143, null, null, "center");
        doc.line(27, 146, 68, 146);
        doc.setFontSize(7);
        doc.text("FABLIC:", 27, 151);
        doc.text("本体", 28, 155);
        doc.text("アクリル : 30%", 29, 159);
        doc.text("モヘア : 10%", 29, 163);
        doc.text("ウール : 60%", 29, 167);
        doc.text("韓国製", 47, 173.5, null, null, "center");
        doc.line(27, 176, 68, 176);
        doc.text("株式会社 Adakust", 47, 180, null, null, "center");
        doc.text("0467-33-1399", 47, 184, null, null, "center");
        break;
      case 6:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 94.5, 112, null, null, "center");
        doc.line(74, 114, 115, 114);
        doc.text(product.name, 94.5, 119, null, null, "center");
        doc.line(74, 122, 115, 122);
        doc.setFontSize(7);
        doc.text("SIZE:", 74, 127);
        doc.setFontSize(10);
        doc.text(product.size, 94.5, 127, null, null, "center");
        doc.line(74, 130, 115, 130);
        doc.setFontSize(7);
        doc.text("COLOR:", 74, 135);
        doc.setFontSize(10);
        doc.text(product.color, 94.5, 135, null, null, "center");
        doc.line(74, 138, 115, 138);
        doc.setFontSize(7);
        doc.text("PRICE:", 74, 143);
        doc.setFontSize(10);
        doc.text(product.price, 94.5, 143, null, null, "center");
        doc.line(74, 146, 115, 146);
        doc.setFontSize(7);
        doc.text("FABLIC:", 74, 151);
        doc.text("本体", 75, 155);
        doc.text("アクリル : 30%", 76, 159);
        doc.text("モヘア : 10%", 76, 163);
        doc.text("ウール : 60%", 76, 167);
        doc.text("韓国製", 94.5, 173.5, null, null, "center");
        doc.line(74, 176, 115, 176);
        doc.text("株式会社 Adakust", 94.5, 180, null, null, "center");
        doc.text("0467-33-1399", 94.5, 184, null, null, "center");
        break;
      case 7:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 141.5, 112, null, null, "center");
        doc.line(121, 114, 162, 114);
        doc.text(product.name, 141.5, 119, null, null, "center");
        doc.line(121, 122, 162, 122);
        doc.setFontSize(7);
        doc.text("SIZE:", 121, 127);
        doc.setFontSize(10);
        doc.text(product.size, 141.5, 127, null, null, "center");
        doc.line(121, 130, 162, 130);
        doc.setFontSize(7);
        doc.text("COLOR:", 121, 135);
        doc.setFontSize(10);
        doc.text(product.color, 141.5, 135, null, null, "center");
        doc.line(121, 138, 162, 138);
        doc.setFontSize(7);
        doc.text("PRICE:", 121, 143);
        doc.setFontSize(10);
        doc.text(product.price, 141.5, 143, null, null, "center");
        doc.line(121, 146, 162, 146);
        doc.setFontSize(7);
        doc.text("FABLIC:", 121, 151);
        doc.text("本体", 122, 155);
        doc.text("アクリル : 30%", 123, 159);
        doc.text("モヘア : 10%", 123, 163);
        doc.text("ウール : 60%", 123, 167);
        doc.text("韓国製", 141.5, 173.5, null, null, "center");
        doc.line(121, 176, 162, 176);
        doc.text("株式会社 Adakust", 141.5, 180, null, null, "center");
        doc.text("0467-33-1399", 141.5, 184, null, null, "center");
        break;
      case 8:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 188.5, 112, null, null, "center");
        doc.line(168, 114, 209, 114);
        doc.text(product.name, 188.5, 119, null, null, "center");
        doc.line(168, 122, 209, 122);
        doc.setFontSize(7);
        doc.text("SIZE:", 168, 127);
        doc.setFontSize(10);
        doc.text(product.size, 188.5, 127, null, null, "center");
        doc.line(168, 130, 209, 130);
        doc.setFontSize(7);
        doc.text("COLOR:", 168, 135);
        doc.setFontSize(10);
        doc.text(product.color, 188.5, 135, null, null, "center");
        doc.line(168, 138, 209, 138);
        doc.setFontSize(7);
        doc.text("PRICE:", 168, 143);
        doc.setFontSize(10);
        doc.text(product.price, 188.5, 143, null, null, "center");
        doc.line(168, 146, 209, 146);
        doc.setFontSize(7);
        doc.text("FABLIC:", 168, 151);
        doc.text("本体", 169, 155);
        doc.text("アクリル : 30%", 170, 159);
        doc.text("モヘア : 10%", 170, 163);
        doc.text("ウール : 60%", 170, 167);
        doc.text("韓国製", 188.5, 173.5, null, null, "center");
        doc.line(168, 176, 209, 176);
        doc.text("株式会社 Adakust", 188.5, 180, null, null, "center");
        doc.text("0467-33-1399", 188.5, 184, null, null, "center");
        break;
      case 9:
        doc.setFont("mplus", "normal");
        doc.setFontSize(10);
        doc.text(product.sku, 235.5, 112, null, null, "center");
        doc.line(215, 114, 256, 114);
        doc.text(product.name, 235.5, 119, null, null, "center");
        doc.line(215, 122, 256, 122);
        doc.setFontSize(7);
        doc.text("SIZE:", 215, 127);
        doc.setFontSize(10);
        doc.text(product.size, 235.5, 127, null, null, "center");
        doc.line(215, 130, 256, 130);
        doc.setFontSize(7);
        doc.text("COLOR:", 215, 135);
        doc.setFontSize(10);
        doc.text(product.color, 235.5, 135, null, null, "center");
        doc.line(215, 138, 256, 138);
        doc.setFontSize(7);
        doc.text("PRICE:", 215, 143);
        doc.setFontSize(10);
        doc.text(product.price, 235.5, 143, null, null, "center");
        doc.line(215, 146, 256, 146);
        doc.setFontSize(7);
        doc.text("FABLIC:", 215, 151);
        doc.text("本体", 216, 155);
        doc.text("アクリル : 114%", 217, 159);
        doc.text("モヘア : 10%", 217, 163);
        doc.text("ウール : 60%", 217, 167);
        doc.text("韓国製", 235.5, 173.5, null, null, "center");
        doc.line(215, 176, 256, 176);
        doc.text("株式会社 Adakust", 235.5, 180, null, null, "center");
        doc.text("0467-33-1399", 235.5, 184, null, null, "center");
        break;
      default:
        break;
    }
  });
  return doc.output("datauristring");
};

const Printer = () => {
  const [sku, setSku] = useState("0000000000-000");
  const [data, setData] = useState(
    new jsPDF("landscape").output("datauristring")
  );

  useEffect(() => {
    const fetchProductsBySku = (sku) => {
      API.graphql({
        query: listProductsQuery,
        variables: {
          filter: {
            sku: {
              eq: sku,
            },
          },
          limit: 1000,
        },
      })
        .then((res) => {
          const products = res.data.listProducts.items;
          if (products.length > 0) {
            const product = {
              sku: products[0].sku,
              name: products[0].name,
              size: products[0].size,
              color: products[0].color,
              price: products[0].price
                ? "￥" +
                  products[0].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "未設定",
            };
            console.log(product);
            setData(generatePdf(product));
          } else {
            console.log("No product found");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchProductsBySku(sku);
  }, [sku]);

  const iframe = (
    <iframe
      title="preview"
      width="100%"
      height="600px"
      src={data}
      frameBorder="0"
    ></iframe>
  );
  return (
    <>
      <Container className="my-5">
        <div>
          <Form.Group className="mb-3" as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="3">
              SKU
            </Form.Label>
            <Col sm="3">
              <Form.Control
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </Col>
          </Form.Group>
          {iframe}
        </div>
      </Container>
    </>
  );
};

export default Printer;

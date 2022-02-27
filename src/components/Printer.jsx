import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listProducts as listProductsQuery } from "../graphql/queries";
import jsPDF from "jspdf";
import { generatePdf } from "../pdf/generatePdf";
import generateRakutenPdf from "../pdf/generateRakutenPdf";

const Printer = () => {
  const [sku, setSku] = useState("0000000000-000");
  const [data, setData] = useState(
    new jsPDF("landscape").output("datauristring")
  );
  const [isRakuten, setIsRakuten] = useState(false);

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
          const items = res.data.listProducts.items;
          if (items.length > 0) {
            const product = {
              sku: items[0].sku,
              name: items[0].name,
              size: items[0].size,
              color: items[0].color,
              price: items[0].price,
              fabric: items[0].fabric,
              country: items[0].country,
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
            console.log(products);
            if (isRakuten) {
              setData(generateRakutenPdf(products));
            } else {
              setData(generatePdf(products));
            }
          } else {
            console.log("No product found");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    fetchProductsBySku(sku);
  }, [sku, isRakuten]);

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
      <Container className="my-5 py-3 border rounded">
        <Row>
          <div>
            <Form.Group
              className="mb-3"
              as={Row}
              controlId="formPlaintextEmail"
            >
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
              <Col sm="3">
                <Button
                  variant="primary"
                  onClick={() => setIsRakuten(!isRakuten)}
                >
                  {isRakuten ? "普通表示にする" : "Rakuten表示にする"}
                </Button>
              </Col>
            </Form.Group>
            {iframe}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Printer;

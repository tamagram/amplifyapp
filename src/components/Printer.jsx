import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listProducts as listProductsQuery } from "../graphql/queries";
import jsPDF from "jspdf";
import { generatePdf } from "../pdf/generatePdf";
import generateRakutenPdf from "../pdf/generateRakutenPdf";

const Printer = () => {
  const [skuList, setSkuList] = useState([
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
    "0000000000-000",
  ]);

  const [data, setData] = useState(
    new jsPDF("landscape").output("datauristring")
  );
  const [isRakuten, setIsRakuten] = useState(false);

  const resetSkuList = () => {
    setSkuList([
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
      "0000000000-000",
    ]);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProductBySku = async (sku) => {
      try {
        const products = await API.graphql({
          query: listProductsQuery,
          variables: {
            filter: {
              sku: {
                eq: sku,
              },
            },
            limit: 1000,
          },
        });
        const items = products.data.listProducts.items;
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
          return product;
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    };

    (async () => {
      const products = await Promise.all(
        skuList.map(async (sku, index) => {
          const product = await fetchProductBySku(sku);
          if (product) {
            return product;
          } else {
            return {
              sku: "",
              name: "",
              size: "",
              color: "",
              price: 0,
              fabric: "",
              country: "　　　　　　　　",
            };
          }
        })
      );
      if (isMounted) {
        if (isRakuten) {
          setData(generateRakutenPdf(products));
        } else {
          setData(generatePdf(products));
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [skuList, isRakuten]);

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
                SKU6
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[5]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 5),
                      e.target.value,
                      ...skuList.slice(6),
                    ])
                  }
                />
              </Col>
              <Form.Label column sm="3">
                SKU1
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[0]}
                  onChange={(e) =>
                    setSkuList([e.target.value, ...skuList.slice(1)])
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="mb-3"
              as={Row}
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                SKU7
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[6]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 6),
                      e.target.value,
                      ...skuList.slice(7),
                    ])
                  }
                />
              </Col>
              <Form.Label column sm="3">
                SKU2
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[1]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 1),
                      e.target.value,
                      ...skuList.slice(2),
                    ])
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="mb-3"
              as={Row}
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                SKU8
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[7]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 7),
                      e.target.value,
                      ...skuList.slice(8),
                    ])
                  }
                />
              </Col>
              <Form.Label column sm="3">
                SKU3
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[2]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 2),
                      e.target.value,
                      ...skuList.slice(3),
                    ])
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="mb-3"
              as={Row}
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                SKU9
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[8]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 8),
                      e.target.value,
                      ...skuList.slice(9),
                    ])
                  }
                />
              </Col>
              <Form.Label column sm="3">
                SKU4
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[3]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 3),
                      e.target.value,
                      ...skuList.slice(4),
                    ])
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="mb-3"
              as={Row}
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3">
                SKU10
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[9]}
                  onChange={(e) =>
                    setSkuList([...skuList.slice(0, 9), e.target.value])
                  }
                />
              </Col>
              <Form.Label column sm="3">
                SKU5
              </Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  value={skuList[4]}
                  onChange={(e) =>
                    setSkuList([
                      ...skuList.slice(0, 4),
                      e.target.value,
                      ...skuList.slice(5),
                    ])
                  }
                />
              </Col>
            </Form.Group>
            <Button
              className="mb-3 mx-2"
              variant="primary"
              onClick={() => setIsRakuten(!isRakuten)}
            >
              {isRakuten ? "普通表示にする" : "Rakuten表示にする"}
            </Button>
            <Button
              className="mb-3 mx-2"
              variant="secondary"
              onClick={() => resetSkuList()}
            >
              クリア
            </Button>
            {iframe}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Printer;

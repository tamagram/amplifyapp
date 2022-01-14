import {
  Table,
  Form,
  Col,
  FloatingLabel,
  Alert,
  Button,
  Card,
  Container,
  Row,
  Stack,
  Modal,
  Pagination,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { API } from "aws-amplify";
import { ProductsContext, ReloadTableContext } from "../App";
import {
  listProducts as listProductsQuery,
  listProductsSortByCreatedAt as listProductsSortByCreatedAtQuery,
} from "../graphql/queries";

import ProductRecord from "./ProductRecord";

const SkuTable = () => {
  const { products, setProducts } = useContext(ProductsContext);
  const { reloadTable, setReloadTable } = useContext(ReloadTableContext);

  const [dbMessage, setDbMessage] = useState("Loading...");
  const [dbConnected, setDbConnected] = useState(false);
  const [queryFilter, setQueryFilter] = useState({});
  const [showCsv, setShowCsv] = useState(false);
  const [page, setPage] = useState(1);

  const [csv, setCsv] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");

  const [brandCode, setBrandCode] = useState("");
  const [year, setYear] = useState("");
  const [season, setSeason] = useState("");
  const [largeCategory, setLargeCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [smallCategory, setSmallCategory] = useState("");
  // -
  const [colorCode, setColorCode] = useState("");

  useEffect(() => {
    if (reloadTable) {
      setReloadTable(false);
    }
    const fetchProducts = () => {
      API.graphql({
        query: listProductsSortByCreatedAtQuery,
        variables: {
          object: "Product",
          sortDirection: "DESC",
          filter: queryFilter,
          limit: 1000,
        },
      })
        .then((apiData) => {
          const gotProducts = apiData.data.listProductsSortByCreatedAt.items;
          setProducts(gotProducts);
          setDbConnected(true);
          setDbMessage(gotProducts.length + "件のデータを取得しました");
        })
        .catch((error) => {
          console.error(error);
          setDbConnected(false);
          setDbMessage("データベースに接続できませんでした。");
        });
    };
    fetchProducts();
  }, [setProducts, queryFilter, reloadTable, setReloadTable]);

  useEffect(() => {
    const generateFilter = () => {
      const filter = {};
      if (name)
        filter.name = {
          contains: name,
        };
      if (price)
        filter.price = {
          eq: price,
        };
      if (size)
        filter.size = {
          eq: size,
        };
      if (brandCode)
        filter.brandCode = {
          eq: brandCode,
        };
      if (year)
        filter.year = {
          eq: year,
        };
      if (season)
        filter.season = {
          eq: season,
        };
      if (largeCategory)
        filter.largeCategory = {
          eq: largeCategory,
        };
      if (mediumCategory)
        filter.mediumCategory = {
          eq: mediumCategory,
        };
      if (smallCategory)
        filter.smallCategory = {
          eq: smallCategory,
        };
      if (colorCode)
        filter.color = {
          eq: colorCode,
        };
      return filter;
    };
    const filter = generateFilter();
    setQueryFilter(filter);
    console.dir(filter);
  }, [
    name,
    price,
    size,
    brandCode,
    year,
    season,
    largeCategory,
    mediumCategory,
    smallCategory,
    colorCode,
  ]);

  const searchProducts = () => {
    API.graphql({
      query: listProductsQuery,
      variables: {
        filter: queryFilter,
      },
    })
      .then((apiData) => {
        const gotProducts = apiData.data.listProducts.items;
        setProducts(gotProducts);
        setDbConnected(true);
        setDbMessage(gotProducts.length + "件のデータを取得しました。");
        alert();
      })
      .catch((error) => {
        setDbConnected(false);
        setDbMessage("データの取得に失敗しました。");
        console.log(error);
      });
  };

  const generateCsv = () => {
    let csvData =
      '"id","__typename","brandCode","color","createdAt","largeCategory","mediumCategory","name","object","price","season","size","sku","smallCategory","updatedAt","year"\n';
    products.forEach((product) => {
      csvData +=
        '"' +
        product.id +
        '","' +
        "Product" +
        '","' +
        product.brandCode +
        '","' +
        product.color +
        '","' +
        product.createdAt +
        '","' +
        product.largeCategory +
        '","' +
        product.mediumCategory +
        '","' +
        product.name +
        '","' +
        "Product" +
        '","' +
        product.price +
        '","' +
        product.season +
        '","' +
        product.size +
        '","' +
        product.sku +
        '","' +
        product.smallCategory +
        '","' +
        product.updatedAt +
        '","' +
        product.year +
        '"\n';
    });
    setCsv(csvData);
  };

  // JSX
  const productsLi = products
    .slice((page - 1) * 10, page * 10)
    .map((product) => <ProductRecord product={product} key={product.id} />);
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Stack gap={2} className="m-3">
                <h5>絞り込み</h5>
                <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    商品名
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="string"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    価格
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="string"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  as={Row}
                  controlId="validationCustom01"
                >
                  <Form.Label column sm="5">
                    サイズ
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="string"
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    ブランドコード
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="string"
                      value={brandCode}
                      onChange={(e) => {
                        setBrandCode(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    年数
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="text"
                      value={year}
                      onChange={(e) => {
                        setYear(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <FloatingLabel controlId="floatingSelect" label="シーズン">
                  <Form.Select
                    aria-label="Floating label select example"
                    value={season}
                    onChange={(e) => {
                      setSeason(e.target.value);
                    }}
                  >
                    <option value="">選択</option>
                    <option value="1">SS : 1</option>
                    <option value="3">AW : 3</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="大カテゴリ">
                  <Form.Select
                    aria-label="Floating label select example"
                    value={largeCategory}
                    onChange={(e) => {
                      setLargeCategory(e.target.value);
                    }}
                  >
                    <option value="">選択</option>
                    <option value="1">トップス : 1</option>
                    <option value="2">ボトムス : 2</option>
                    <option value="3">ワンピース、セットアップ : 3</option>
                    <option value="4">アクセサリー : 4</option>
                    <option value="5">シューズ : 5</option>
                    <option value="6">アウター : 6</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="中カテゴリ">
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) => {
                      setMediumCategory(e.target.value);
                    }}
                  >
                    <option value="">選択</option>
                    <option value="">◆トップス◆</option>
                    <option value="11">Tシャツ : 11</option>
                    <option value="12">シャツ : 12</option>
                    <option value="13">ニット : 13</option>
                    <option value="14">カーディガン : 14</option>
                    <option value="15">ベスト : 15</option>
                    <option value="16">スウェット : 16</option>
                    <option value="17">フーディ : 17</option>
                    <option value="">◆ボトムス◆</option>
                    <option value="21">スラックス : 21</option>
                    <option value="22">パンツ : 22</option>
                    <option value="">◆セットアップ◆</option>
                    <option value="31">セットアップ : 31</option>
                    <option value="32">ジャンプスーツ : 32</option>
                    <option value="">◆アクセサリー◆</option>
                    <option value="41">ベルト : 41</option>
                    <option value="42">バッグ : 42</option>
                    <option value="43">ジュエリー : 43</option>
                    <option value="44">アクセサリー その他 : 44</option>
                    <option value="">◆シューズ◆</option>
                    <option value="51">ブーツ : 51</option>
                    <option value="52">スニーカー : 52</option>
                    <option value="53">シューズ その他 : 53</option>
                    <option value="">◆アウター◆</option>
                    <option value="61">コート : 61</option>
                    <option value="62">ブルゾン : 62</option>
                    <option value="63">ジャケット : 63</option>
                    <option value="64">アウター その他 : 64</option>
                  </Form.Select>
                </FloatingLabel>
                <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    小カテゴリ - フリーコード
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="text"
                      value={smallCategory}
                      onChange={(e) => {
                        setSmallCategory(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <FloatingLabel controlId="floatingSelect" label="カラー番号">
                  <Form.Select
                    aria-label="Floating label select example"
                    value={colorCode}
                    onChange={(e) => {
                      setColorCode(e.target.value);
                    }}
                  >
                    <option value="">選択</option>
                    <option value="100">WHT : 100</option>
                    <option value="001">BLK : 001</option>
                    <option value="200">NVY : 200</option>
                    <option value="300">BGE : 300 (CREAM)</option>
                    <option value="400">KHK : 400</option>
                    <option value="500">GRY : 500</option>
                    <option value="550">L/GRY : 550</option>
                    <option value="600">GRN : 600</option>
                    <option value="700">YLW : 700</option>
                    <option value="800">RED : 800</option>
                    <option value="900">BLU : 900</option>
                    <option value="050">PPL : 050</option>
                    <option value="111">GLD : 111</option>
                    <option value="222">SLV : 222</option>
                    <option value="999">MIX : 999</option>
                    <option value="010">BRN : 010 (B/BLK)</option>
                    <option value="000">DENIM : 000</option>
                  </Form.Select>
                </FloatingLabel>
                <Button variant="primary" onClick={searchProducts}>
                  検索
                </Button>
              </Stack>
            </Card>
          </Col>
          <Col>
            <Row>
              <Col xs="8">
                {dbConnected ? (
                  <Alert variant="success">{dbMessage}</Alert>
                ) : (
                  <Alert variant="danger">{dbMessage}</Alert>
                )}
              </Col>
              <Col>
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => {
                    setShowCsv(true);
                    generateCsv();
                  }}
                >
                  CSV
                </Button>
                <Modal
                  size="lg"
                  show={showCsv}
                  onHide={() => setShowCsv(false)}
                >
                  <Container>
                    <Stack gap={2} className="m-3">
                      <Card>
                        <FloatingLabel
                          controlId="floatingTextarea2"
                          label="取得結果をCSV形式にしています"
                        >
                          <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: "80vh" }}
                            value={csv}
                          />
                        </FloatingLabel>
                      </Card>
                    </Stack>
                  </Container>
                </Modal>
              </Col>
              <Col>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setReloadTable(true)}
                >
                  更新
                </Button>
              </Col>
            </Row>
            <Pagination>
              <Pagination.First onClick={() => setPage(1)} />
              <Pagination.Prev onClick={() => setPage(page - 1)} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={() => setPage(page + 1)} />
              <Pagination.Last
                onClick={() => setPage(Math.ceil(products.length / 10))}
              />
            </Pagination>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>価格</th>
                  <th>サイズ</th>
                  <th>SKU</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{productsLi}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SkuTable;

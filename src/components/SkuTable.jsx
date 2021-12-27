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
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { API } from "aws-amplify";
import { listProducts as listProductsQuery } from "../graphql/queries";
import styles from "./SkuTable.module.css";

const SkuTable = () => {
  const [dbMessage, setDbMessage] = useState("Loading...");
  const [dbConnected, setDbConnected] = useState(false);
  const [queryFilter, setQueryFilter] = useState({});
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");

  const [brandCode, setBrandCode] = useState("");
  const [years, setYears] = useState("");
  const [season, setSeason] = useState("");
  const [largeCategory, setLargeCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [smallCategory, setSmallCategory] = useState("");
  // -
  const [colorNumber, setColorNumber] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filter = {};
    if (name) {
      filter.name = {
        contains: name,
      };
    }
    if (price) {
      filter.price = {
        eq: price,
      };
    }
    if (size) {
      filter.size = {
        eq: size,
      };
    }
    if (brandCode) {
      filter.brandCode = {
        eq: brandCode,
      };
    }
    if (years) {
      filter.year = {
        eq: years,
      };
    }
    if (season) {
      filter.season = {
        eq: season,
      };
    }
    if (largeCategory) {
      filter.largeCategory = {
        eq: largeCategory,
      };
    }
    if (mediumCategory) {
      filter.mediumCategory = {
        eq: mediumCategory,
      };
    }
    if (smallCategory) {
      filter.smallCategory = {
        eq: smallCategory,
      };
    }
    if (colorNumber) {
      filter.color = {
        eq: colorNumber,
      };
    }
    setQueryFilter(filter);
    console.dir(filter);
  }, [
    name,
    price,
    size,
    brandCode,
    years,
    season,
    largeCategory,
    mediumCategory,
    smallCategory,
    colorNumber,
  ]);

  const fetchProducts = async () => {
    API.graphql({ query: listProductsQuery })
      .then((apiData) => {
        setProducts(apiData.data.listProducts.items);
        setDbConnected(true);
        setDbMessage("データベースに接続しました。");
      })
      .catch((error) => {
        setDbConnected(false);
        setDbMessage("データベースに接続できませんでした。");
      });
  };

  const searchProducts = async () => {
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
        setDbMessage(gotProducts.length + "件のデータを検索しました。");
      })
      .catch((error) => {
        setDbConnected(false);
        setDbMessage("データベースに接続できませんでした。");
        console.log(error);
      });
  };

  const productsLi = products.length ? (
    products.map((product) => (
      <tr key={product.sku}>
        <td>{product.name}</td>
        <td>{product.price || "未設定"}</td>
        <td>{product.size || "未設定"}</td>
        <td>{product.brandCode}</td>
        <td>{product.year}</td>
        <td>{product.season}</td>
        <td>{product.largeCategory}</td>
        <td>{product.mediumCategory}</td>
        <td>{product.smallCategory}</td>
        <td>{product.color}</td>
        <td>{product.sku}</td>
      </tr>
    ))
  ) : (
    <Alert variant="danger">データがありません。</Alert>
  );

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>検索</h3>
            <Card>
              <Stack gap={2} className="m-3">
                {dbConnected ? (
                  <Alert variant="success">{dbMessage}</Alert>
                ) : (
                  <Alert variant="danger">{dbMessage}</Alert>
                )}

                <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    ブランドコード
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="string"
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
                      onChange={(e) => {
                        setYears(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <FloatingLabel controlId="floatingSelect" label="シーズン">
                  <Form.Select
                    aria-label="Floating label select example"
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
                    onChange={(e) => {
                      setColorNumber(e.target.value);
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
                    <option value="660">GRN : 600</option>
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
            <Button
              className="mb-2"
              variant="secondary"
              onClick={fetchProducts}
            >
              更新
            </Button>{" "}
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>商品名</th>
                  <th>価格</th>
                  <th>サイズ</th>
                  <th>ブランド</th>
                  <th>年数</th>
                  <th>シーズン</th>
                  <th>大カテゴリ</th>
                  <th>中カテゴリ</th>
                  <th>小カテゴリ</th>
                  <th>カラー</th>
                  <th>SKU</th>
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

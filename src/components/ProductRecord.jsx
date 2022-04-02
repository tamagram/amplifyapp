import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Card,
  Stack,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { API } from "aws-amplify";
import {
  updateProduct as updateProductMutation,
  deleteProduct as deleteProductMutation,
} from "../graphql/mutations";
import { ReloadTableContext } from "../App";
import sizeToCode from "../conversion/size";

const ProductRecord = (props) => {
  const [product, setProduct] = useState(props.product);
  const [show, setShow] = useState(false);
  const { setReloadTable } = useContext(ReloadTableContext);

  const [id, _] = useState(product.id);
  const [sku, setSku] = useState(product.sku);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [size, setSize] = useState(product.size);

  const [brandCode, setBrandCode] = useState(product.brandCode);
  const [year, setYear] = useState(product.year);
  const [season, setSeason] = useState(product.season);
  const [largeCategory, setLargeCategory] = useState(product.largeCategory);
  const [mediumCategory, setMediumCategory] = useState(product.mediumCategory);
  const [smallCategory, setSmallCategory] = useState(product.smallCategory);
  const [color, setColor] = useState(product.color);
  const [fabric, setFabric] = useState(product.fabric);
  const [country, setCountry] = useState(product.country);

  const updateProduct = () => {
    API.graphql({
      query: updateProductMutation,
      variables: {
        input: product,
      },
    })
      .then(() => {
        setShow(false);
        alert("更新しました");
      })
      .catch((error) => {
        console.error(error);
        alert("更新に失敗しました");
      });
  };

  const deleteProduct = () => {
    API.graphql({
      query: deleteProductMutation,
      variables: {
        input: {
          id: product.id,
        },
      },
    })
      .then(() => {
        setShow(false);
        alert("削除しました");
        setReloadTable(true);
      })
      .catch((error) => {
        console.error(error);
        alert("削除に失敗しました");
      });
  };

  useEffect(() => {
    let newVersion = false;
    if (smallCategory.length === 3) {
      newVersion = true;
    }
    if (newVersion) {
      setSku(
        brandCode +
          year +
          season +
          largeCategory +
          mediumCategory +
          smallCategory +
          "-" +
          sizeToCode(size) +
          "-" +
          color
      );
    } else {
      setSku(
        brandCode +
          year +
          season +
          largeCategory +
          mediumCategory +
          smallCategory +
          "-" +
          color
      );
    }
    setProduct({
      id: id,
      name: name,
      size: size,
      color: color,
      price: price,
      fabric: fabric,
      country: country,
      brandCode: brandCode,
      year: year,
      season: season,
      largeCategory: largeCategory,
      mediumCategory: mediumCategory,
      smallCategory: smallCategory,
      sku: sku,
    });
  }, [
    sku,
    id,
    name,
    price,
    size,
    brandCode,
    year,
    season,
    largeCategory,
    mediumCategory,
    smallCategory,
    color,
    fabric,
    country,
  ]);

  // JSX
  return (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>
        {product.price
          ? "￥" +
            product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : ""}
      </td>
      <td>{product.size || ""}</td>
      <td>{product.sku}</td>
      <td>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setShow(true);
          }}
        >
          編集
        </Button>
        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Container>
            <Row>
              <Col>
                <Card className="my-3">
                  <Stack gap={2} className="m-3">
                    <Form.Group as={Row} controlId="validationCustom01">
                      <Form.Label column sm="5">
                        ブランドコード
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="string"
                          value={product.brandCode}
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
                          value={product.year}
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
                        value={product.season}
                        onChange={(e) => {
                          setSeason(e.target.value);
                        }}
                      >
                        <option>選択</option>
                        <option value="1">SS : 1</option>
                        <option value="3">AW : 3</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="大カテゴリ"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        value={product.largeCategory}
                        onChange={(e) => {
                          setLargeCategory(e.target.value);
                        }}
                      >
                        <option>選択</option>
                        <option value="1">トップス : 1</option>
                        <option value="2">ボトムス : 2</option>
                        <option value="3">ワンピース、セットアップ : 3</option>
                        <option value="4">アクセサリー : 4</option>
                        <option value="5">シューズ : 5</option>
                        <option value="6">アウター : 6</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="中カテゴリ"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        value={product.mediumCategory}
                        onChange={(e) => {
                          setMediumCategory(e.target.value);
                        }}
                      >
                        <option>選択</option>
                        <option>◆トップス◆</option>
                        <option value="11">Tシャツ : 11</option>
                        <option value="12">シャツ : 12</option>
                        <option value="13">ニット : 13</option>
                        <option value="14">カーディガン : 14</option>
                        <option value="15">ベスト : 15</option>
                        <option value="16">スウェット : 16</option>
                        <option value="17">フーディ : 17</option>
                        <option>◆ボトムス◆</option>
                        <option value="21">スラックス : 21</option>
                        <option value="22">パンツ : 22</option>
                        <option>◆セットアップ◆</option>
                        <option value="31">セットアップ : 31</option>
                        <option value="32">ジャンプスーツ : 32</option>
                        <option>◆アクセサリー◆</option>
                        <option value="41">ベルト : 41</option>
                        <option value="42">バッグ : 42</option>
                        <option value="43">ジュエリー : 43</option>
                        <option value="44">アクセサリー その他 : 44</option>
                        <option>◆シューズ◆</option>
                        <option value="51">ブーツ : 51</option>
                        <option value="52">スニーカー : 52</option>
                        <option value="53">シューズ その他 : 53</option>
                        <option>◆アウター◆</option>
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
                          value={product.smallCategory}
                          onChange={(e) => {
                            setSmallCategory(e.target.value);
                          }}
                        />
                      </Col>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    -
                    <FloatingLabel controlId="floatingSelect" label="サイズ">
                      <Form.Select
                        aria-label="Floating label select example"
                        value={size}
                        onChange={(e) => {
                          setSize(e.target.value);
                        }}
                      >
                        {/* サイズ番号　XS0 S1 M2 L3 XL4 F5 */}
                        <option value="x">選択</option>
                        <option value="XS">XS : 0</option>
                        <option value="S">S : 1</option>
                        <option value="M">M : 2</option>
                        <option value="L">L : 3</option>
                        <option value="XL">XL : 4</option>
                        <option value="F">F : 5</option>
                      </Form.Select>
                    </FloatingLabel>
                    -
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="カラー番号"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        value={product.color}
                        onChange={(e) => {
                          setColor(e.target.value);
                        }}
                      >
                        <option>選択</option>
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
                        <option value="850">ORG : 850</option>
                        <option value="900">BLU : 900</option>
                        <option value="050">PPL : 050</option>
                        <option value="111">GLD : 111</option>
                        <option value="222">SLV : 222</option>
                        <option value="999">MIX : 999</option>
                        <option value="010">BRN : 010 (B/BLK)</option>
                        <option value="000">DENIM : 000</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Stack>
                </Card>
              </Col>
              <Col>
                <Stack gap={2} className="m-3">
                  <Form.Group as={Row} controlId="validationCustom01">
                    <Form.Label column sm="5">
                      商品名
                    </Form.Label>
                    <Col>
                      <Form.Control
                        required
                        type="text"
                        value={product.name}
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
                        type="number"
                        value={product.price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </Col>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Row} controlId="validationCustom01">
                    <Form.Label column sm="5">
                      ファブリック
                    </Form.Label>
                    <Col>
                      <Form.Control
                        required
                        as="textarea"
                        value={fabric}
                        style={{ height: "90px" }}
                        onChange={(e) => {
                          setFabric(e.target.value);
                        }}
                      />
                    </Col>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Row} controlId="validationCustom01">
                    <Form.Label column sm="5">
                      製造国
                    </Form.Label>
                    <Col>
                      <Form.Control
                        required
                        type="text"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </Col>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="5">
                      SKU
                    </Form.Label>
                    <Col>
                      <Form.Control type="text" readOnly value={product.sku} />
                    </Col>
                  </Form.Group>
                  <Button
                    md="8"
                    variant="primary"
                    onClick={() => {
                      if (window.confirm("更新しますか？")) {
                        console.dir(product);
                        updateProduct();
                      }
                    }}
                  >
                    更新
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (window.confirm("本当に削除しますか？")) {
                        console.dir(product);
                        deleteProduct();
                      }
                    }}
                  >
                    削除
                  </Button>
                </Stack>
              </Col>
            </Row>
          </Container>
        </Modal>
      </td>
    </tr>
  );
};

export default ProductRecord;

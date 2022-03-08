import { useState, useContext, useEffect } from "react";
import { API } from "aws-amplify";
import { listProducts as listProductsQuery } from "../graphql/queries";
import { createProduct as createProductMutation } from "../graphql/mutations";
import {
  Form,
  FloatingLabel,
  Button,
  Col,
  Row,
  Card,
  Container,
  Stack,
  Modal,
  Alert,
} from "react-bootstrap";
import { SkuContext, ReloadTableContext } from "../App";

const Editor = () => {
  const { sku, setSku } = useContext(SkuContext);
  const { setReloadTable } = useContext(ReloadTableContext);

  const [csv, setCsv] = useState("");
  const [showImportCsv, setShowImportCsv] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [fabric, setFabric] = useState("");
  const [country, setCountry] = useState("");
  
  const [brandCode, setBrandCode] = useState("01");
  const [years, setYears] = useState("21");
  const [season, setSeason] = useState("x");
  const [largeCategory, setLargeCategory] = useState("x");
  const [mediumCategory, setMediumCategory] = useState("xx");
  const [smallCategory, setSmallCategory] = useState("xxx");
  // -
  const [size, setSize] = useState("x");
  // -
  const [colorCode, setColorCode] = useState("xxx");

  const [smallCategoryMessage, setSmallCategoryMessage] = useState(
    "ブランドコード、年数、シーズン、大カテゴリ、中カテゴリ、カラー番号が埋まっているときに下のボタンを押すと、自動的に小カテゴリに候補が表示されます。"
  );

  useEffect(() => {
    let newSku =
      brandCode +
      years +
      season +
      largeCategory +
      mediumCategory +
      smallCategory +
      "-" +
      size +
      "-" +
      colorCode;
    setSku(newSku);
  }, [
    setSku,
    brandCode,
    years,
    season,
    largeCategory,
    mediumCategory,
    smallCategory,
    size,
    colorCode,
  ]);

  const createProduct = () => {
    const validate = () => {
      if (sku.length !== 17 || sku.match(/(x|選択)/)) {
        alert("SKUが正しくありません。");
        return;
      }
      if (!name) {
        alert("商品名が未入力です。");
        return;
      }
      if (price === "") {
        alert("価格が未入力です。");
        return;
      }
    };
    validate();
    API.graphql({
      query: listProductsQuery,
      variables: {
        filter: {
          sku: {
            eq: sku,
          },
        },
      },
    })
      .then((value) => {
        if (value.data.listProducts.items.length > 0) {
          alert("既に登録されているSKUです。");
          return;
        }
        API.graphql({
          query: createProductMutation,
          variables: {
            input: {
              sku: sku,
              name: name,
              size: size,
              color: colorCode,
              price: price,
              fabric: fabric,
              country: country,
              brandCode: brandCode,
              year: years,
              season: season,
              largeCategory: largeCategory,
              mediumCategory: mediumCategory,
              smallCategory: smallCategory,
              object: "Product",
            },
          },
        })
          .then(() => {
            alert("登録しました。");
            setReloadTable(true);
          })
          .catch((err) => {
            alert("登録に失敗しました。");
            console.error(err);
          });
      })
      .catch((err) => {
        alert("検証に失敗しました。");
        console.error(err);
      });
  };

  const assignSmallCategory = async () => {
    const validate = () => {
      if (brandCode === "") {
        setSmallCategoryMessage("ブランドコードが未入力です。");
        return;
      }
      if (years === "") {
        setSmallCategoryMessage("年数が未入力です。");
        return;
      }
      if (season === "x") {
        setSmallCategoryMessage("シーズンが未入力です。");
        return;
      }
      if (largeCategory === "x") {
        setSmallCategoryMessage("大カテゴリが未入力です。");
        return;
      }
      if (mediumCategory === "xx") {
        setSmallCategoryMessage("中カテゴリが未入力です。");
        return;
      }
      if (colorCode === "xxx") {
        setSmallCategoryMessage("カラー番号が未入力です。");
        return;
      }
    };
    validate();
    API.graphql({
      query: listProductsQuery,
      variables: {
        filter: {
          brandCode: {
            eq: brandCode,
          },
          year: {
            eq: years,
          },
          season: {
            eq: season,
          },
          largeCategory: {
            eq: largeCategory,
          },
          mediumCategory: {
            eq: mediumCategory,
          },
          color: {
            eq: colorCode,
          },
        },
      },
    })
      .then((value) => {
        if (value.data.listProducts.items.length === 0) {
          setSmallCategoryMessage(
            "ほかのサイズが存在しないため、小カテゴリに01を設定しました。"
          );
          setSmallCategory("01");
          return;
        }
        let chSmallCategory = "00";
        const smallCategories = value.data.listProducts.items.map((item) => {
          if (chSmallCategory < item.smallCategory)
            chSmallCategory = item.smallCategory;
          return item.smallCategory + "(" + item.size + ")";
        });
        if (chSmallCategory === "99") {
          setSmallCategoryMessage("これ以上小カテゴリを追加できません。");
          return;
        }
        let message = smallCategories.join(", ");
        message += "がすでに存在しています。\n";
        message += chSmallCategory + " +1 を設定しました。";
        setSmallCategory(("0" + (parseInt(chSmallCategory) + 1)).slice(-2));
        setSmallCategoryMessage(message);
      })
      .catch((err) => {
        alert("検証に失敗しました。");
        console.error(err);
      });
  };

  const createProductsFromCsv = () => {
    const parseCsv = (csv) => {
      const csvProductKeys = csv
        .split("\n")
        .slice(0, 1)[0]
        .replace(/"/g, "")
        .split(",");
      const csvProductsValues = csv.split("\n").slice(1);
      const products = csvProductsValues
        .filter((csvProduct) => {
          return csvProduct.length > 0;
        })
        .map((csvProduct) => {
          const productValues = csvProduct.replace(/"/g, "").split(",");
          let product = {};
          product["object"] = "Product";
          csvProductKeys.forEach((key, index) => {
            if (
              key === "id" ||
              key === "name" ||
              key === "price" ||
              key === "size" ||
              key === "brandCode" ||
              key === "year" ||
              key === "season" ||
              key === "largeCategory" ||
              key === "mediumCategory" ||
              key === "smallCategory" ||
              key === "color" ||
              key === "sku"
            ) {
              product[key] = productValues[index];
            }
          });
          return product;
        });
      return products;
    };
    const createProducts = (products) => {
      products.forEach((product) => {
        API.graphql({
          query: listProductsQuery,
          variables: {
            filter: {
              sku: {
                eq: product.sku,
              },
            },
          },
        })
          .then((res) => {
            if (res.data.listProducts.items.length === 0) {
              API.graphql({
                query: createProductMutation,
                variables: {
                  input: product,
                },
              })
                .then(() => {
                  console.log(product.sku + "を登録しました。");
                })
                .catch((err) => {
                  console.log(product.sku + "の登録に失敗しました。");
                  console.error(err);
                });
            } else {
              console.log(product.sku + "はすでに存在しています。");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      });
    };
    try {
      const products = parseCsv(csv);
      console.dir(products);
      createProducts(products);
    } catch (err) {
      console.error(err);
      alert("CSV形式が正しくありません。");
    }
  };

  // JSX
  return (
    <>
      <Container>
        <Card className="my-3">
          <Row>
            <Col>
              <Stack gap={2} className="m-3">
                <h5>商品追加</h5>
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
                      value={years}
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
                    value={season}
                    onChange={(e) => {
                      setSeason(e.target.value);
                    }}
                  >
                    <option value="x">選択</option>
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
                    <option value="x">選択</option>
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
                    value={mediumCategory}
                    onChange={(e) => {
                      setMediumCategory(e.target.value);
                    }}
                  >
                    <option value="xx">選択</option>
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
                      value={smallCategory}
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
                    <option value="0">XS : 0</option>
                    <option value="1">S : 1</option>
                    <option value="2">M : 2</option>
                    <option value="3">L : 3</option>
                    <option value="4">XL : 4</option>
                    <option value="5">F : 5</option>
                  </Form.Select>
                </FloatingLabel>
                -
                <FloatingLabel controlId="floatingSelect" label="カラー番号">
                  <Form.Select
                    aria-label="Floating label select example"
                    value={colorCode}
                    onChange={(e) => {
                      setColorCode(e.target.value);
                    }}
                  >
                    <option value="xxx">選択</option>
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
              </Stack>
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
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    サイズ
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="text"
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                    />
                  </Col>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group as={Row} controlId="validationCustom01">
                  <Form.Label column sm="5">
                    価格
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      type="number"
                      value={price}
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
                      placeholder={`例\nアクリル : 30%`}
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
                    <Form.Control type="text" readOnly value={sku} />
                  </Col>
                </Form.Group>

                <Alert className="mt-2" variant="secondary">
                  {smallCategoryMessage}
                  <br />
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={assignSmallCategory}
                  >
                    小カテゴリ割り当て
                  </Button>
                </Alert>
                <Button variant="primary" onClick={createProduct}>
                  リストに追加
                </Button>
                <Button
                  className="mt-2"
                  variant="success"
                  disabled={true}
                  onClick={() => {
                    setShowImportCsv(true);
                  }}
                >
                  CSVインポート
                </Button>
                <Modal
                  size="lg"
                  show={showImportCsv}
                  onHide={() => setShowImportCsv(false)}
                >
                  <Container>
                    <Card className="my-3">
                      <Stack gap={2} className="m-3">
                        <Button
                          variant="primary"
                          onClick={createProductsFromCsv}
                        >
                          取り込み
                        </Button>
                        <FloatingLabel
                          controlId="floatingTextarea2"
                          label="CSVを入力してください"
                        >
                          <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: "80vh" }}
                            value={csv}
                            onChange={(e) => {
                              setCsv(e.target.value);
                            }}
                          />
                        </FloatingLabel>
                      </Stack>
                    </Card>
                  </Container>
                </Modal>
              </Stack>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Editor;

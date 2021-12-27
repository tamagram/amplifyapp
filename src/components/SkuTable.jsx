import {
  Table,
  Form,
  Col,
  FloatingLabel,
  Alert,
  Button,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { API } from "aws-amplify";
import { listProducts } from "../graphql/queries";
import styles from "./SkuTable.module.css";

const SkuTable = () => {
  const [name, setName] = useState("");
  const [largeCategory, setLargeCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [dbConnected, setDbConnected] = useState(false);
  const [dbMessage, setDbMessage] = useState("Loading...");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    API.graphql({ query: listProducts })
      .then((apiData) => {
        setProducts(apiData.data.listProducts.items);
        setDbConnected(true);
        setDbMessage("データベースに接続しました。");
      })
      .catch((error) => {
        setDbConnected(false);
        setDbMessage("データベースに接続できませんでした。");
      });

    // setProducts(apiData.data.listProducts.items);
    // console.log(apiData.data.listProducts.items);
  };

  const productsLi = products.map((product) => (
    <tr key={product.sku}>
      <td>{product.name}</td>
      <td>{product.sku}</td>
      <td>{product.price || "未設定"}</td>
    </tr>
  ));

  return (
    <div class={styles.container}>
      <h3>検索</h3>
      {dbConnected ? (
        <Alert variant="success">{dbMessage}</Alert>
      ) : (
        <Alert variant="danger">{dbMessage}</Alert>
      )}
      <Button variant="secondary" onClick={fetchProducts}>
        更新
      </Button>{" "}
      <Form.Group as={Col} md="1" controlId="validationCustom01">
        <Form.Label>商品名</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="例 : 01"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <span>絞り込み</span>
      <div class={styles.search_by_category}>
        <FloatingLabel controlId="floatingSelect" label="大カテゴリ">
          <Form.Select
            aria-label="Floating label select example"
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
        <FloatingLabel controlId="floatingSelect" label="中カテゴリ">
          <Form.Select
            aria-label="Floating label select example"
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
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>商品名</th>
            <th>SKU</th>
            <th>価格</th>
          </tr>
        </thead>
        <tbody>{productsLi}</tbody>
      </Table>
    </div>
  );
};

export default SkuTable;

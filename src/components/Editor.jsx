import { useState, useContext, useEffect } from "react";
import { Form, FloatingLabel, Col } from "react-bootstrap";
import { SkuContext } from "../App";

const Editor = () => {
  const { sku, setSku } = useContext(SkuContext);

  const [brandCode, setBrandCode] = useState("01");
  const [years, setYears] = useState("21");
  const [season, setSeason] = useState("x");
  const [largeCategory, setLargeCategory] = useState("x");
  const [mediumCategory, setMediumCategory] = useState("xx");
  const [smallCategory, setSmallCategory] = useState("xx");
  // -
  const [colorNumber, setColorNumber] = useState("xxx");

  useEffect(() => {
    let newSku =
      brandCode +
      years +
      season +
      largeCategory +
      mediumCategory +
      smallCategory +
      "-" +
      colorNumber;
    setSku(newSku);
  }, [
    setSku,
    brandCode,
    years,
    season,
    largeCategory,
    mediumCategory,
    smallCategory,
    colorNumber,
  ]);

  return (
    <div className="App-editor">
      <Form.Group as={Col} md="1" controlId="validationCustom01">
        <Form.Label>ブランドコード</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="01"
          defaultValue="01"
          onChange={(e) => {
            setBrandCode(e.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="1" controlId="validationCustom01">
        <Form.Label>年数</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="21"
          defaultValue="21"
          onChange={(e) => {
            setYears(e.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <FloatingLabel controlId="floatingSelect" label="シーズン">
        <Form.Select
          aria-label="Floating label select example"
          onChange={(e) => {
            setSeason(e.target.value);
          }}
        >
          <option>選択</option>
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
      <Form.Group as={Col} md="1" controlId="validationCustom01">
        <Form.Label>小カテゴリ - サイズ</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="00"
          defaultValue="xx"
          onChange={(e) => {
            setSmallCategory(e.target.value);
          }}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <FloatingLabel controlId="floatingSelect" label="カラー番号">
        <Form.Select
          aria-label="Floating label select example"
          onChange={(e) => {
            setColorNumber(e.target.value);
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
    </div>
  );
};

export default Editor;
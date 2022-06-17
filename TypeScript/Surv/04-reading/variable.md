## const は可変オブジェクトを保護しない

- const は再代入不可なだけであり、**オブジェクト（配列）への変更は可能**
- TS でオブジェクトを不変にするには、プロパティを読み取り専用にしたり、const アサーションを使用する必要がある

## 変数宣言の型注釈

- 変数名の右に型をかく

```
const num: number = 123;
```

## 変数宣言の型推論

- コンパイラが型を自動で判別する機能
- 型注釈を省略できるので、記述量を減らすことができる
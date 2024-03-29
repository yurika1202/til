## プリミティブ型

- string
- number
- boolean
- symbol
- bigint
- null
- undefined

## リテラル型

プリミティブ型を細分化したもので、文字列と数値と真偽値のリテラル型がある。  
限定的な名前の型を作成できるということであり、`'foo'`という型の場合は`'foo'`という文字列しか許可されない。

### 型推論

const での宣言時に型注釈を省略した場合は、リテラル型の型推論が働く。  
let での宣言時にはプリミティブ型での型推論が働く。（省略せず型注釈をつければリテラル型を持たせることが可能）

## オブジェクト型

`{}`のなかにプロパティ名とその型を列挙する。

### interface

TS 独自構文であり、オブジェクト型に名前を付けることができる。  
型注釈は省略可能。
順序が違ったり余計なプロパティが存在するオブジェクトへ型注釈を付けることが可能だが、プロパティが不足するまたは型が異なる場合はエラーとなる。  
オブジェクトとクラスの型だけ定義できる。  
型定義の拡張ができる＝コードが不透明になる可能性がある＝ type の方がいい…？

### 構造的部分型

スーパークラスに対してサブクラスがスーパークラスの要件を満たしている場合は代入ができる。  
サブクラスはスーパークラスの部分型であるという。  
ただしスーパークラスへ余計なプロパティがあるオブジェクトリテラルを代入はできないので、どうしてもそれを行いたい場合は一度変数へ代入してやる必要がある。

## 配列型

`[]`または`Array<>`を用いる。

## 関数型

- 関数宣言/関数式：`function 関数名(引数: 型): 戻り値の型`
- アロー関数：`(引数: 型, 引数: 型) => 戻り値の型`

### 構造的部分型

オブジェクト型の時と同様に部分型関係がある。  
ただし関数を呼び出す側で余計な引数を付けて呼び出すことはできない。

### 可変長引数

`...bar`と表し、それ以降の引数がすべて入った配列が bar へ渡される。  
型注釈は配列型で行う。

## void 型

主に関数の返り値の型として使われ、「何も返さない（＝ return がない、return に返り値が存在しない）」ことを表す。

## any 型

なんでもありな型であり、TS の恩恵がまるでない。

## クラスの型

TS ではクラスを定義すると、同時に同名の型を定義してくれる。  
[参考：【TypeScript】class で型を使う - JavaScript との書き方の違いとは？](https://yumegori.com/typesccript-class)

## ジェネリクス

抽象的な型引数を使って、その型が実際に利用されるまで型が確定しないクラスや関数、インターフェイスに使用する。  
[参考：【TypeScript】Generics(ジェネリックス)を理解する](https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4)

## タプル型

配列をタプルとして使用しているので、配列のメソッドで操作ができる。が、それは型システムに反してしまう場合がある。（コンパイルエラーは起きない）  
オプショナル(?)をつけたタプル宣言も可能だが、オプショナルでない要素より後にくるように。

### 可変長引数

タプル型で関数の可変長引数の型を表すことが可能。

```
type Args = [string, ...number[]];
```

[あとで読む：TypeScript 4.0 で導入される Variadic Tuple Types をさっそく使いこなす](https://qiita.com/uhyo/items/7e31bbd93a80ce9cec84)

### ジェネリクスへの応用

[再読する](https://qiita.com/uhyo/items/e2fdef2d3236b9bfe74a#%E3%82%BF%E3%83%97%E3%83%AB%E5%9E%8B%E3%81%A8%E5%8F%AF%E5%A4%89%E9%95%B7%E5%BC%95%E6%95%B0%E3%81%A8%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AA%E3%82%AF%E3%82%B9)

## union 型

複数の型のどれかに当てはまる型を表すときに`|`を用いて記述する。

### 絞り込み

オブジェクトで union 型を用いた場合、無い可能性のあるプロパティを参照することはできない。（すべてのオブジェクト型に含まれているプロパティのみ参照可能）  
**in 演算子を使う**  
in 演算子を使って if 文で条件分岐することで変数の型を絞り込むことが可能。  
ただしいろいろと注意が必要そう…  
**typeof 演算子を使う**  
プリミティブ型の絞り込みなら断然 typeof 演算子がよき。  
与えられた値の型を文字列で返してくれる。  
[参考：【TypeScript】Union 型の型ガード・型の絞り込み方法まとめ](https://nishinatoshiharu.com/type-guard-methods/)  
**タグ付き union 型**  
オブジェクトでも union 型を使いたい！という時は、リテラル型と union 型を組み合わせてタグ付き union を再現する方法が推奨されている。  
[参考：判別可能なユニオン型](https://typescriptbook.jp/reference/values-types-variables/discriminated-union)  
[参考：TypeScript 4.6 で起こるタグ付きユニオンのさらなる進化](https://zenn.dev/uhyo/articles/ts-4-6-destructing-unions)

### null チェック

`string | null`として絞り込みを行うと、null かもしれないという前提があるのでプロパティの参照などが行えない。  
対して「null でない時だけ処理を実行する」などを記述するときは、`value != null`という条件式を使用する。

### never 型

属する値が存在しない型で、部分型関係の一番下にある型。  
どんな値も never 型の変数に入れることはできないが、never 型の値はどんな型にも入れることができる。

### intersection 型

union 型と対の関係にあるもので、`&`を用いて記述する。

## 省略可能なプロパティ

`?`をつけて宣言されているプロパティは省略可能。  
自動的に undefine 型との union 型になるため、undefined チェックを行う必要がある。
?修飾子よりも undefine との union 型を使用することを推奨。

## readonly

再代入できないプロパティを作成するときに使用する修飾子。（const のプロパティ版）

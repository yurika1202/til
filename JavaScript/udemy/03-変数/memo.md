### 暗黙的な型変換

- 変数が呼ばれた状況によって型が自動的に変換されること
- JS ＝動的型付け言語

### 等価性の違い

- 厳格な等価性：===（型の比較あり）
- 抽象的な等価性：==

```
(ex.)
const a = 1;
const b = true;
console.log(a === b); // false
console.log(a == b); // true
```

- b を数値に変換（`Number(b)`）すると b は 1 になるので、抽象的な等価性の場合は暗黙的な型変換により`true`が返ってくる

### AND 条件と OR 条件

- 値の初期値を if 文で設定する場合

```
if(!name) {
    name = 'Tom';
}
```

上記を OR 条件を使って簡略化すると…

```
name = name || 'Tom';
```

ただし ES6 からは引数にデフォ値を設定できるので必要なし！

- 変数があれば実行させたい場合

```
if(name) {
    hello(name);
}
```

上記を AND 条件を使って簡略化すると…

```
name && hello(name);
```

### プリミティブ型とオブジェクト

**プリミティブ型**

- 変数には値が格納される
- その値を変更することはできない（＝ immutable）
- 再代入は値の参照が切り替わっているだけなので、値を変更しているということではない

**オブジェクト**

- 変数には参照が格納される
- 値を変更することができる（＝ mutable）
- 参照を名前付きで管理している入れ物

### 参照とコピー

**プリミティブ型**

- 参照先の値がコピーされる

**オブジェクト**

- オブジェクトへの参照がコピーされる
- オブジェクトをコピー後にプロパティの値を変更すると、同じオブジェクトを参照しているコピー元の値も変更される
- オブジェクトのコピー後に新たなオブジェクトを作成し場合は、オブジェクトの参照が切り替わるため、プロパティを変更・追加してもコピー元は変わらない

### 参照と const

**プリミティブ型**

- 値への参照はロックされているので、再代入不可
  **オブジェクト**
- オブジェクトへの参照がロックされているので、新たなオブジェクトの参照は不可
- プロパティへの参照はロックされていないので、値の再代入が可能

### 参照と分割代入

- 分割代入：オブジェクトから特定のプロパティを抽出して宣言を行う

```
let {a, b} = object;
```

```
const a = {
    prop: 'hello'
}
let { prop } = a;
prop = 'bye';
```

- プロパティの参照先がコピーされて、再代入した場合にはそこに新しい参照先が作成される＝コピー元には影響でない
- 関数と絡めたメモは [0301 参照](0301/main.js)

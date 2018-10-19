# Use FLOCSS

## 命名規則

### MindBEMding

```
.block {} // 親要素
.block__element {} // 子要素
.block--modifier {} // 親要素のバージョン違い
.block__element--modifier {} // 子要素のバージョン違い
```

### プレフィックス

```
layout - l-*
component - c-*
project - p-*
utility - u-*
```

## 構成

```
scss/
	├── foundation/
	├── layout/
	├── object/
	│   ├── component/
	│   ├── project/
	│   └── utility/
	└── style.scss
```

- foundation -- reset.cssなどベースとなるCSS群
- layout -- header, sidebar, footerなどのレイアウト用CSS群
- object
	- component -- 再利用できる小さなコンポーネントCSS群
	- project -- プロジェクト固有のコンポーネントCSS群
- utility -- ユーティリティクラスを定義するCSS群
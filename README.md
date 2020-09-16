# masspa-ecart

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/masspa-ecart.svg)](https://www.npmjs.com/package/masspa-ecart) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save masspa-ecart
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'masspa-ecart'
import 'masspa-ecart/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```
## Properties

Prop | description 
--- | --- 
sale_price | title of product
customButtonStyle | customButtonStyle
styleSubmitButton | styleSubmitButton
styleAgreeButton | styleAgreeButton
customStyleContainerCart | customStyleContainerCart
customStyleContainerOrder | customStyleContainerOrder
fontFamily | fontFamily
backgroundColor | backgroundColor
currencyUnit | currency unit
VAT | Has include VAT or not. JSON type, default: {hasVAT: false, valueVAT: 0}
tempPrice | temp price. Number type
totalPrice | total price. Number type
text | texts use in component. JSON type
submitOrder | action of submit order
actionClickOnTitle | action click on title
deleteProduct | action click to delete product
changeData | function change array of items
changePrice | function change temp price and total price
selectCoupon | action click to select a coupon

## License

 © [thinktodo-dev](https://github.com/thinktodo-dev)

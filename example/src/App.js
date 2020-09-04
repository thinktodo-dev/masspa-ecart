import React from 'react'

import  ExampleComponent  from 'masspa-ecart'
import 'masspa-ecart/dist/index.css'
 
// const App = () => {
//   return <ExampleComponent data = {data} tempPrice = {100000} finalPrice= {300000}/>
// }
// export default App

export default class ECartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      // tempPrice: 0,
      // finalPrice: 0,
      data : [
        {
          id: 1,
          name: "Nước Giặt Ariel Đậm Đặc Dạng Túi 3.6kg",
          provider: "Kim Spa",
          price: 200000,
          sale_price: 100000,
          quantity: 1
        },
        {
         id: 2,
         name: "Điện Thoại iPhone 7 Plus 128GB - Chính Hãng Mã VN/A - Black",
          provider: "Kim Spa",
          price: 300000,
          sale_price: 100000,
          quantity: 1
         },
         {
          id: 3,
          name: "Điện Thoại iPhone 6 Plus 128GB - Chính Hãng Mã VN/A - Black",
           provider: "Kim Spa",
          sale_price: 100000,
          price: 300000,
           quantity: 23
          }
        ],
        text : {
          shopping_cart: "GIỎ HÀNG",
          provider: "Cung cấp bởi",
          delete: "Xoá",
          delete: "Xoá",
          buy_later: "Mua sau",
          temp_price: "Tạm tính",
          total_price: "Thành tiền",
          proceed_to_order: "Tiến hành đặt hàng",
          empty_cart: "Không có sản phẩm nào trong giỏ hàng của bạn",
          product: "Sản phẩm",
          includedVAT: "Đã bao gồm VAT nếu có"
        }
    }
  }

  submitOrder = (data) => {
     console.log(data)
  }
  render() {
    console.log(this.state.text)
    return (<ExampleComponent 
      customStyleContainerCart = {{backgroundColor: "#f9f9f9"}} 
      customStyleContainerOrder = {{padding: "20px", backgroundColor: "#f9f9f9"}} data = {this.state.data} 
      // tempPrice = {100000} 
      // finalPrice= {300000} 
      changeInputQuantity = {this.changeInputQuantity} 
      // submitOrder = {this.submitOrder} 
      text = {this.state.text}
      />)
  }
} 

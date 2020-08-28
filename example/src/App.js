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
      tempPrice: 0,
      finalPrice: 0,
      data : [
        {
          id: 1,
          name: "Nước Giặt Ariel Đậm Đặc Dạng Túi 3.6kg",
          provider: "Kim Spa",
          price: 200000,
          quantity: 1
        },
        {
         id: 2,
         name: "Điện Thoại iPhone 7 Plus 128GB - Chính Hãng Mã VN/A - Black",
          provider: "Kim Spa",
          price: 300000,
          quantity: 1
         },
         {
          id: 3,
          name: "Điện Thoại iPhone 6 Plus 128GB - Chính Hãng Mã VN/A - Black",
           provider: "Kim Spa",
           price: 300000,
           quantity: 23
          }
        ]
    }
  }
  submitOrder = (data) => {
     console.log(data)
  }
  render() {
    return (<ExampleComponent data = {this.state.data} tempPrice = {100000} finalPrice= {300000} changeInputQuantity = {this.changeInputQuantity} submitOrder = {this.submitOrder} />)
  }
} 

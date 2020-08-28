import React from 'react'
import styles from './styles.module.css' 

 
export default class ECartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      tempPrice: 0,
      finalPrice: 0,
      data: []
    }
  } 
  componentDidMount() {
    this.setState({data: this.props.data})
  }
  changeQuantity = (id, newValue) => {
   
    if(this.changeInputQuantity) {
      // this.setState({quantity: newValue})
      this.changeInputQuantity(id,newValue >= 0 ? newValue : 0)
    }

  }
  changeInputQuantity = (id,value) => {
    if(this.changeInputQuantity) {
      // this.setState({quantity: value})
      this.changeInputQuantity(id,value)
    }
  }
  selectCoupon = (value) => {
    if(this.props.selectCoupon) { 
      this.props.selectCoupon(value)
    }
  }
  changeInputQuantity = (id, value) => {
    let data = this.state.data
    let findIndex = data.findIndex((e) => e.id == id)
    console.log(id)
    console.log(findIndex)
    console.log(value)
    if(findIndex !== -1) data[findIndex].quantity = value
    this.setState({data: data})
  }
  deleteProduct = (id) => {
    let data = this.state.data
    let findIndex = data.findIndex((e) => e.id == id)
    data.splice(findIndex, 1)
    this.setState({data: data})
  }
  submitOrder = (data) => {
    if(this.props.submitOrder) this.props.submitOrder(data)
  }
  render() {
  let {customButtomStyle,styleSubmitButton, styleAgreeButton, customStyleContainerCart, customStyleContainerOrder, fontFamily} = this.props
  let {quantity, data} = this.state 
  let tempPrice = 0
  data.forEach((e) => {
    tempPrice += e.price*e.quantity
  })
  return  (
   <div style = {{backgroundColor: "aliceblue", height:"100vh", fontFamily: fontFamily}}> 
    <div className = {styles.header}>GIỎ HÀNG <span className = {styles.headerSubTitle}>({data.length} SẢN PHẨM)</span> </div>
    <div style = {customButtomStyle} className={styles.container}>
      <ul style = {customStyleContainerCart} className={styles.containerCart}>
        {data.map((item, index) => {
          return (
            <li key = {index} className={styles.root}>
                <img  className={styles.imgProduct} src = "https://images.unsplash.com/photo-1532029118404-c94b27247e34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"></img>
                <div className={styles.productContent}>
                  <div  className={styles.infoProduct}>
                    <div className={styles.title}>{item.name}</div>
                    <div className={styles.provider}>{`Cung cấp bởi: `}<a className={styles.providerName} href= "#">{item.provider}</a></div>
                    <div className={styles.action}>
                      <a onClick = {() => this.deleteProduct(item.id)} href="#"  className={styles.actionDelete}>Xoá</a>
                      <a onClick = {() => this.deleteProduct(item.id)} href="#" className={styles.actionBuyLater}>Mua sau</a>
                    </div>
                  </div>
                  <div  className={styles.infoRight}>
                    <div className={styles.price}>{item.price}d</div>
                      <button className={styles.quantity} onClick = {() => this.changeQuantity(item.id, item.quantity -1)}>-</button>
                      <input  className={styles.inputQuantity} value={item.quantity} onChange = {(event) => this.changeInputQuantity(item.id, event.target.value)}/>
                      <button className={styles.quantity} onClick = {() => this.changeQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div> 
            </li>
          )
        })} 
      </ul>
      <div style = {customStyleContainerOrder} className={styles.containerOrder}>
        <div  className={styles.cartPrice}>
      <div className={styles.tempPrice}>Tạm tính:<span  className={styles.tempValue}>{tempPrice}</span></div>
      <div className={styles.tempPrice}>Thành tiền: <span className = {styles.priceValueFinal}>{tempPrice}</span></div>
        </div>
        <div >
          <button style = {styleSubmitButton} onClick = {() => this.submitOrder(data)} className={styles.btnSubmit}>TIẾN HÀNH ĐẶT HÀNG</button>
        </div>
        <div  className={styles.cartPrice}>
          <div className={styles.tempPrice}>Mã giảm giá / Quà tặng</div>
          <div className={styles.inputPromoContainer}><input className={styles.inputPromo} placeholder = "Nhập ở đây"></input><button style = {styleAgreeButton} onClick = {(event) => this.selectCoupon(event.target.value)} className = {styles.btnPromo}>Đồng ý</button></div> 
          <div className={styles.note}>Mã giảm giá đã lưu <a className={styles.linkCoupon} href = "#">Xem tại đây</a></div>
        </div>
      </div>
    </div>
    </div>
  )
}
}
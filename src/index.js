import React from 'react'
import styles from './styles.module.css' 
import NumberFormat from "react-number-format";
import NoneImage from 'noneImage.svg'
 
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
  selectCoupon = (value) => {
    if(this.props.selectCoupon) { 
      this.props.selectCoupon(value)
    }
  }
  changeInputQuantity = (id, value) => {
    let data = this.state.data
    let findIndex = data.findIndex((e) => e.id == id)
    if(findIndex !== -1) data[findIndex].quantity = value
    this.setState({data: data})
    if(this.props.changeData) this.props.changeData(data)
  }
  deleteProduct = (id) => {
    let data = this.state.data
    let findIndex = data.findIndex((e) => e.id == id)
    data.splice(findIndex, 1)
    this.setState({data: data})
    if(this.props.deleteProduct) this.props.deleteProduct(id)
  }
  submitOrder = (data) => {
    if(this.props.submitOrder) this.props.submitOrder(data)
  }
  formatNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  actionClickOnTitle= (id) => { 
    if(this.props.actionClickOnTitle) this.props.actionClickOnTitle(id)
  }
  render() {
  let {customButtomStyle,styleSubmitButton, styleAgreeButton, customStyleContainerCart, customStyleContainerOrder, fontFamily, backgroundColor, currencyUnit = "đ"} = this.props
  let {quantity, data} = this.state 
  let tempPrice = 0
  data.forEach((e) => {
    if(e.price) tempPrice += e.price*e.quantity
  })
  return  (
   <div style = {{backgroundColor: backgroundColor || "#f0f8ff00", fontFamily: fontFamily, height: "100%", width: "100%"}}> 
    <div className = {styles.header}>GIỎ HÀNG <span className = {styles.headerSubTitle}>({data.map((e) => e.quantity).reduce((a, b) => a + b)} SẢN PHẨM)</span> </div>
    <div style = {customButtomStyle} className={styles.ecart_container}>
      <ul style = {customStyleContainerCart} className={styles.containerCart}>
        {data.length ? data.map((item, index) => {
          return (
            <li key = {index} className={styles.root}>
                <img  className={styles.imgProduct} src = {item.images && Array.isArray(item.images) ? item.images[0] : NoneImage}></img>
                <div className={styles.ecart_productContent}>
                  <div  className={styles.infoProduct}>
                    <div className={styles.ecart_title} onClick = {() => this.actionClickOnTitle(item.id)}>{item.name}</div>
                    <div className={styles.provider}>{`Cung cấp bởi: `}<a className={styles.providerName} href= "#">{item.provider}</a></div>
                    <div className={styles.action}>
                      <a onClick = {() => this.deleteProduct(item.id)} href="#"  className={styles.actionDelete}>Xoá</a>
                      <a onClick = {() => this.deleteProduct(item.id)} href="#" className={styles.actionBuyLater}>Mua sau</a>
                    </div>
                  </div>
                  <div  className={styles.infoRight}>
                    <div className={styles.ecart_price}> {this.formatNumber(item.price)}{currencyUnit}</div>
                      <div className={styles.quanlityInput}> 
                        <button className={styles.quantity} onClick = {() => this.changeQuantity(item.id, item.quantity -1)}>-</button>
                        <input  className={styles.inputQuantity} value={item.quantity} onChange = {(event) => this.changeInputQuantity(item.id, event.target.value)}/>
                        <button className={styles.quantity} onClick = {() => this.changeQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                  </div>
                </div> 
            </li>
          )
        })
      : <div className = {styles.emptyCart}>Không có sản phẩm nào trong giỏ hàng của bạn</div>} 
      </ul>
      <div style = {customStyleContainerOrder} className={styles.containerOrder}>
        <div  className={styles.cartPrice}>
      <div className={styles.tempPrice}>Tạm tính:<span  className={styles.tempValue}>{this.formatNumber(tempPrice)}{currencyUnit}</span></div>
      <div className={styles.tempPrice}>Thành tiền: <span className = {styles.priceValueFinal}>{this.formatNumber(tempPrice)}{currencyUnit}<i className = {styles.ecart_vat}>(Đã bao gồm VAT nếu có)</i></span></div>
        </div>
        <div >
          <button style = {styleSubmitButton} onClick = {() => this.submitOrder(data)} className={styles.btnSubmit}>Tiến hành đặt hàng</button>
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
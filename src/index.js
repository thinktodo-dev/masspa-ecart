import React from 'react'
import styles from './styles.module.css' 
import NumberFormat from "react-number-format";
import NoneImage from 'noneImage.svg'
//  const text = {
//   shopping_cart: "GIỎ HÀNG",
//   provider: "Cung cấp bởi",
//   delete: "Xoá",
//   delete: "Xoá",
//   buy_later: "Mua sau",
//   temp_price: "Tạm tính",
//   total_price: "Thành tiền",
//   proceed_to_order: "Tiến hành đặt hàng",
//   empty_cart: "Không có sản phẩm nào trong giỏ hàng của bạn",
//   product: "Sản phẩm",
// }
export default class ECartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      tempPrice: 0,
      finalPrice: 0,
      data: [],
      // text: this.props.text ||  
    }
  } 
  componentDidMount() {
    this.setState({data: this.props.data})
  }
  // componentWillReceiveProps(nextProps) {
     
  // }
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
  getNumberOnString(text) {
    let result = text.toString().match(/\d+/g);
    return result ? result.join("") : "";
  }
  changeInputQuantity = (id, value) => {
    value = Number(this.getNumberOnString(value))
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
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0
  }
  actionClickOnTitle= (id) => { 
    if(this.props.actionClickOnTitle) this.props.actionClickOnTitle(id)
  }
  render() {
  let {sale_price, customButtomStyle,styleSubmitButton, styleAgreeButton, customStyleContainerCart, customStyleContainerOrder, fontFamily, backgroundColor, currencyUnit = "đ", tempPrice  , totalPrice , VAT = {hasVAT: true, valueVAT: 10} , text = {}} = this.props
  let {quantity, data} = this.state 
  let tempPriceValue = tempPrice  || 0
  if(!tempPriceValue) 
  data.forEach((e) => {
    if(e.price) tempPriceValue += e.price*e.quantity
  })
  let totalPriceValue = totalPrice ? totalPrice : tempPriceValue
  if(VAT && VAT.hasVAT && VAT.valueVAT) totalPriceValue = totalPriceValue + totalPriceValue * VAT.valueVAT/100

  return  (
   <div style = {{backgroundColor: backgroundColor || "#f0f8ff00", fontFamily: fontFamily, height: "100%", width: "100%"}}> 
    <div className = {styles.header}>{text.shopping_cart || "CART"} <span className = {styles.headerSubTitle}>({data.length ? data.map((e) => e.quantity).reduce((a, b) => a + b) : 0} {text.product || "Products"})</span> </div>
    <div style = {customButtomStyle} className={styles.ecart_container}>
      <ul style = {customStyleContainerCart} className={styles.containerCart}>
        {data.length ? data.map((item, index) => {
          return (
            <li key = {index} className={styles.root}>
                <img  className={styles.imgProduct} src = {item.images && Array.isArray(item.images) ? item.images[0] : NoneImage}></img>
                <div className={styles.ecart_productContent}>
                  <div  className={styles.infoProduct}>
                    <div className={styles.ecart_title} onClick = {() => this.actionClickOnTitle(item.id)}>{item.name}</div>
                    <div className={styles.provider}>{`${text.provider || "Provider by"}: `}<a className={styles.providerName} href= "#">{item.provider}</a></div>
                    <div className={styles.action}>
                      <a onClick = {() => this.deleteProduct(item.id)} href="#"  className={styles.actionDelete}>{text.delete || "Delete"}</a>
                      <a onClick = {() => this.deleteProduct(item.id)} href="#" className={styles.actionBuyLater}>{text.buy_later || "Buy later"}</a>
                    </div>
                  </div>
                  <div  className={styles.infoRight}>
                      <div className={styles.ecart_price}> <div>{this.formatNumber(item.sale_price)}{currencyUnit}</div> <div><span className={styles.discountPrice}>{this.formatNumber(item.price)}{currencyUnit} </span><span className={styles.percentDiscount}>-{Math.ceil(item.price/item.sale_price) * 10}%</span></div></div>
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
      : <div className = {styles.emptyCart}>{text.empty_cart || "Your cart is empty"}</div>} 
      </ul>
      <div style = {customStyleContainerOrder} className={styles.containerOrder}>
        <div  className={styles.cartPrice}>
      <div className={styles.tempPrice}>{text.temp_price || "Temp price"}:<span  className={styles.tempValue}>{this.formatNumber(tempPriceValue)}{currencyUnit}</span></div>
      <div className={styles.tempPrice}>{text.total_price || "Total price"}: <span className = {styles.priceValueFinal}>{this.formatNumber(totalPriceValue)}{currencyUnit}<i className = {styles.ecart_vat}>({text.includedVAT || "Included VAT"})</i></span></div>
        </div>
        <div >
      <button style = {styleSubmitButton} onClick = {() => this.submitOrder(data)} className={styles.btnSubmit}>{text.proceed_to_order || "Order"}</button>
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
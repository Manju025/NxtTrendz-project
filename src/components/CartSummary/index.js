// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0)
      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )

      return (
        <div className="cart-summary">
          <h1 className="order-total">
            Order Total: <span className="total-price">Rs {totalPrice}/-</span>
          </h1>
          <p className="items-count">{totalItems} Items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

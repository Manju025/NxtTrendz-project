import {useState, useContext} from 'react'
import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)

  const [isCodSelected, setIsCodSelected] = useState(false)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const totalItems = cartList.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  )

  const onSelectCod = () => {
    setIsCodSelected(true)
  }

  const onConfirmOrder = () => {
    setIsOrderPlaced(true)
  }

  return (
    <div className="cart-summary">
      <h1 className="order-total">
        Order Total: <span className="total-price">Rs {totalPrice}/-</span>
      </h1>
      <p className="items-count">{totalItems} Items in cart</p>

      <Popup
        trigger={
          <button type="button" className="checkout-button button">
            Checkout
          </button>
        }
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" type="button" onClick={close}>
              &times;
            </button>
            <div className="header">Payment Method</div>
            <div className="payment-options">
              <div className="option">
                <input type="radio" id="card" name="payment" disabled />
                <label htmlFor="card">Credit / Debit Card</label>
              </div>

              <div className="option">
                <input type="radio" id="netBanking" name="payment" disabled />
                <label htmlFor="netBanking">Net Banking</label>
              </div>

              <div className="option">
                <input type="radio" id="upi" name="payment" disabled />
                <label htmlFor="upi">UPI</label>
              </div>

              <div className="option">
                <input type="radio" id="wallet" name="payment" disabled />
                <label htmlFor="wallet">Wallet</label>
              </div>

              <div className="option">
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  onChange={onSelectCod}
                />
                <label htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>

            <div className="summary">
              <p className="summary-text">
                Items: <span>{totalItems}</span>
              </p>
              <p className="summary-text">
                Total Price: <span>Rs {totalPrice}/-</span>
              </p>
            </div>

            <button
              className="confirm-btn"
              type="button"
              disabled={!isCodSelected}
              onClick={onConfirmOrder}
            >
              Confirm Order
            </button>

            <button
              className="close-btn"
              type="button"
              onClick={() => {
                close()
              }}
            >
              Close
            </button>

            {isOrderPlaced && (
              <p className="success-message">
                Your order has been placed successfully
              </p>
            )}
          </div>
        )}
      </Popup>
    </div>
  )
}

export default CartSummary

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CartContext } from '../../config/Cartprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/Cart.css'; // Importa o arquivo CSS que você criou
import { FormattedMessage } from 'react-intl';
export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  const notifyRemovedFromCart = (item) =>
    toast.error(`${item.nome} removed from cart!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        backgroundColor: '#000',
        color: '#fff'
      }
    });
  const confirmpayment=()=>{
    window.location.href="/pagamento"
  }
  const notifyCartCleared = () =>
    toast.error(`Cart cleared!`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
      style: {
        backgroundColor: '#000',
        color: '#fff'
      }
    });

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };

  return (
    showModal && (
      <div className="cart-container">
        <ToastContainer />

        <div className="cart-header">
          <h1 className="cart-title"><FormattedMessage id='cart'></FormattedMessage></h1>
          <button className="close-btn" onClick={toggle}>
            <FormattedMessage id='fecharmodal'></FormattedMessage>
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cart-item" key={item.idproduto}>
                <div className="item-details">
                  <div>
                    <h3 className="item-name">{item.nome}</h3>
                    <p className="item-price">${item.preco}</p>
                  </div>
                </div>

                <div className="item-actions">
                  <button
                    className="quantity-btn"
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="quantity-btn"
                    onClick={() => {
                      const cartItem = cartItems.find((product) => product.idproduto === item.idproduto);
                      if (cartItem.quantity === 1) {
                        handleRemoveFromCart(item);
                      } else {
                        removeFromCart(item);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 className="empty-cart"><FormattedMessage id='Carrinhovazio'></FormattedMessage></h1>
          )}

          {cartItems.length > 0 && (
            <div className="total-section">
              <h1 className="total-title">Total: <FormattedMessage id='money'></FormattedMessage>{getCartTotal()}</h1>
              <button className="cart-payment" onClick={() => { confirmpayment() }}>
                <FormattedMessage id="Confirmar_pedido"></FormattedMessage>
              </button>
              <button className="clear-btn" onClick={() => { clearCart(); notifyCartCleared(); }}>
                <FormattedMessage id="limparcarrinho"></FormattedMessage>
              </button>
            </div>
          )}
        </div>
      </div>
    )
  );
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func
};

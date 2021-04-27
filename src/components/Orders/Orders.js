import React from 'react';
import PropTypes from 'prop-types';
import './Orders.css';

const Orders = props => {
  const orderEls = props.orders.map((order, i) => {
    return (
      <div className="order" key={i} >
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, i) => {
            return <li key={i}>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section id="allOrders">
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;

Orders.propTypes = {
  orders: PropTypes.array
}

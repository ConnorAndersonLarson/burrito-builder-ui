import React, { Component } from 'react';
import './App.css';
import {getOrders, setOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error: ''
    }
  }

  componentDidMount() {
    getOrders()
      .then(res => this.setState({orders: res.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  createOrder = (newOrder) => {
    setOrder(newOrder)
      .then(res => {
        if (res.id) {
          this.setState({ orders: [...this.state.orders, res], error: '' })
        } else {
          this.setState({ error: 'Something went wrong, please try again'})
        }
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm createOrder={this.createOrder}/>
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;

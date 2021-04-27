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
      .catch(err => this.setState({error: err}));
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
        { !!this.state.orders && <Orders orders={this.state.orders} />}
        { this.state.orders.length === 0 && !!this.state.error && <h2 id="err">Our Burritos have gone rogue!</h2> }
      </main>
    );
  }
}


export default App;

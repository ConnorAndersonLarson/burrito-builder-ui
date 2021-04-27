import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (!!this.state.name && this.state.ingredients.length !== 0 ) {
      this.props.createOrder({name: this.state.name, ingredients: this.state.ingredients})
      this.clearInputs();
    } else {
      this.setState({ error: 'Please enter a name and at least one ingredient' })
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], error: ''});
  }

  handleNameChange = event => {
      this.setState({ [event.target.name]: event.target.value});
  }

  handleIngredientChange = event => {
    event.preventDefault()
    this.setState({ ingredients: [...this.state.ingredients, event.target.name]})
  }

  getButtons = () => {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    return possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { this.getButtons() }

        <p id="userIng">Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button id="submitOrder" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
        {!!this.state.error && <h3>{this.state.error}</h3>}
      </form>
    )
  }
}

export default OrderForm;

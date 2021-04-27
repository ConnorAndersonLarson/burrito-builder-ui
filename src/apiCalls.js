const baseURL = 'http://localhost:3001/api/v1/orders'

export const getOrders = () => {
  return fetch(baseURL)
      .then(response => response.json())
}

export const setOrder = (newOrder) => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newOrder)
  })
    .then(response => response.json())
}

import $ from 'jquery';


export function shoppingCart(data) {
  return {
    type: 'shopping-cart',
    payload: data
  }
}


export function pageError(resp){
  let error = (resp && resp.responseJSON && resp.responseJSON.message) || 'Help!';
  return {
    type: 'page_error',
    error: error
  };
}

export function getShoppingCart(token) {
  console.log('token': token);
  return (dispatch) => {
    $.get('http://localhost:4000/api/shopping_cart', { token: token })
      .then(data => {
        dispatch({
          type: 'shopping-cart',
          data: data
        });
      })
      .catch(resp => {
        let error = resp.responseJSON && resp.responseJSON.message || 'Something went wrong';
        dispatch({
          type: 'shopping-cart-error',
          error: error
        });
      });
  };
}


export function deleteItem(id, customer_id) {
  let asyncAction = function(dispatch) {
    $.ajax({
      method: 'DELETE',
      url: 'http://localhost:4000/api/shopping_cart/',
      data: JSON.stringify({
        product_id: id,
        customer_id: customer_id
      }),
      contentType: 'application/json'
    })
      .then(data => dispatch({ type: 'deleteItem', payload: data}))
      .catch(resp => dispatch(pageError(resp)))
  }
  return asyncAction
}

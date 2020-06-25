export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        value: product
    }
}

export const removeToCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        value: productId
    }
}
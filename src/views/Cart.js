import React from "react";
import '../css/customCartStyles.css';

const Cart = (props) => {
    // different ways to modify cart from here
    // remove all -> clear the entire cart
    const clearCart = () => {
        props.setCart({
            total: 0,
            size: 0,
            items: {}
        })
    }
    // plus button -> increase quantity by one
    const increaseQuantity = (player) => {
        let mutatingCart = {...props.cart}
        // increase the size of the cart
        mutatingCart.size++;
        // increase the total in the cart
        mutatingCart.total += Number(player.transfer_cost.slice(1, player.transfer_cost.length-1));
        //change quantity
        mutatingCart.items[player.id].quantity++;
        // mutate state through setCart
        props.setCart(mutatingCart);
    }

    // minus button - decrease the quantity by one or remove the player if the quantity is one
    const decreaseQuantity = (player) => {
        let mutatingCart = {...props.cart};
        // decrease the size of the cart
        mutatingCart.size--;
        // decrease the total in the cart
        mutatingCart.total -= Number(player.transfer_cost.slice(1, player.transfer_cost.length-1));
        // change the quantity - if the quantity is 1, we want to fully remove this player
        mutatingCart.items[player.id].quantity > 1 ? mutatingCart.items[player.id].quantity-- : delete mutatingCart.items[player.id];
        // mutate state
        props.setCart(mutatingCart);
    }

    // trash can -> remove all of a player
    const removePlayer = (player) => {
        let mutatingCart = {...props.cart};
        // decrease cart size by quantity of player
        mutatingCart.size -= mutatingCart.items[player.id].quantity;
        // decrease cart total by cost of player * quantity of player
        mutatingCart.total -= Number(player.transfer_cost.slice(1, player.transfer_cost.length-1))*mutatingCart.items[player.id].quantity;
        // remove the player from the cart
        delete mutatingCart.items[player.id];
        // mutate state
        props.setCart(mutatingCart);
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-8">
                    <div className="p-2">
                        <h4>Players to Purchase:</h4>
                    </div>
                    { // one of these for each item
                        // map through the values of the props.cart.items object
                        Object.values(props.cart.items).map((item) => {
                            return (
                                <div key={item.player.id} className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                                    <div className="mr-1"><img className="rounded" alt={item.player.first_name} src={item.player.image} width="70" /></div>
                                    <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">{item.player.first_name} {item.player.last_name}</span>
                                        <div className="d-flex flex-row product-desc">
                                            <div className="size mr-1"><span className="font-weight-bold">&nbsp;{item.player.number} | {item.player.postion}</span></div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center qty">
                                        <i className="fa fa-minus text-danger" onClick={() => decreaseQuantity(item.player)}></i>
                                        <h5 className="text-grey mt-1 mr-1 ml-1">{item.quantity}</h5>
                                        <i className="fa fa-plus text-success" onClick={() => increaseQuantity(item.player)}></i>
                                    </div>
                                    <div>
                                        <h5 className="text-grey">{item.player.transfer_cost} ea.</h5>
                                    </div>
                                    <div className="d-flex align-items-center"><i className="fa fa-trash mb-1 text-danger" onClick={() => removePlayer(item.player)}></i></div>
                                </div>
                            )
                        })
                    }
                    <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                        <div className="d-flex flex-column align-items-center product-details"><span className="font-weight-bold">Total:</span>
                        </div>
                        <div>
                            <h4 className="text-grey">${props.cart.total}m</h4>
                        </div>
                        <div className="d-flex align-items-center"><button className="btn btn-sm btn-danger" onClick={clearCart}>Remove All</button></div>
                    </div>
                    <div className="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><a href="/" className="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button">Proceed to Pay</a></div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
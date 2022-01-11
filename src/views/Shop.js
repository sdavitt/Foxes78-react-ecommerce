import React, { useEffect, useState } from "react";
import axios from "axios";

const Shop = props => {

    useEffect(() => { console.log('Shop component rendered or rerendered!') });

    /* Build an API call in order to get our player data from our API */
    const getPlayerData = async () => {
        let response = await axios.get('https://foxes78api.herokuapp.com/api/players');
        // if you do not control the API or you are preparing this for a production environment
        // you should build error handling into this api call
        // aka check if you get a 200 response code and have a backup plan if you don't
        // because we control this api and are still developing this react app, i'm keeping this api call simple
        // and ignoring error handling/headers/messages, etc. other stuff we might need in a production environment
        return response.data
    }

    // using the api data as a state variable
    // where do we call this?
    // side note: don't start a normal function's name with 'use' like usePlayerData in react
    // react will assume any function starting with use is a hook and will therefore treat it differently
    const loadPlayerData = async () => {
        let data = await getPlayerData();
        console.log(data, typeof data);
        setPlayers(data);
    }

    // new state variable for the shop component
    const [players, setPlayers] = useState(() => loadPlayerData());

    // add to cart function
    const addToCart = (player) => {
        // access the current cart state (props.cart) and make a copy that we can mutate
        let mutatingCart = {...props.cart}
        // increase the size of the cart
        mutatingCart.size++;
        // increase the total in the cart
        mutatingCart.total += Number(player.transfer_cost.slice(1, player.transfer_cost.length-1));
        // check if the player is already in the cart
        // if so, change quantity
        // if not, add player to cart with quantity one
        if (mutatingCart.items[player.id]){
            mutatingCart.items[player.id].quantity++;
        } else {
            mutatingCart.items[player.id] = {
                'player': player,
                'quantity': 1
            }
        }
        // mutate state through setCart
        props.setCart(mutatingCart);
    }
    
    return (
        <div className='shop'>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <h1>Foxes Transfer Market</h1>
                </div>
                <div className='row justify-content-center'>
                    {/* to summarize - if no player data, show a loading thing - if player data, show player cards */}
                    {   typeof players == 'object' // initial condition - players don't exist?
                        ? // ternary operator
                        Object.values(players).map((player, index) => {
                            return <div key={index} className="card m-3" style={{ width: 18 + 'rem' }}>
                                <img src={player.image} className="card-img-top" alt={`${player.first_name} ${player.last_name}`} />
                                <div className="card-body">
                                    <h5 className="card-title">{`${player.first_name} ${player.last_name}`}</h5>
                                    <p className="card-text">{`${player.number} ${player.postion} ${player.team} ${player.nationality}`}</p>
                                    <button className="btn btn-block btn-primary" onClick={() => addToCart(player)}>{`${player.transfer_cost}`}</button>
                                </div>
                            </div>
                        })
                        : // ternary operator - else 
                        <h1>Loading players...</h1>
                    }
                </div>
            </div>
        </div>
    )
};

export default Shop;
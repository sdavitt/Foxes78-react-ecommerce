import React, { useEffect, useState } from "react";

const Shop = props => {

    useEffect(() => { console.log('Shop component rendered or rerendered!') });

    // new state variable for the shop component
    const [players, setPlayers] = useState(['Joao Cancelo', 'Phil Foden', 'Riyad Mahrez', 'Ederson']);

    // function to run when 'Go somewhere' button is clicked
    // mutates players state
    const modifyPlayers = () => {
        let newPlayers = [...players];
        newPlayers.splice(0, 1);
        newPlayers.push(players[0]);
        setPlayers(newPlayers);
    }
    
    return (
        <div className='shop'>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <h1>This will be the shop.</h1>
                </div>
                <div className='row justify-content-center'>
                    {
                        players.map((player, index) => {
                            return <div key={index} className="card m-3" style={{ width: 18 + 'rem' }}>
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{player}</h5>
                                    <p className="card-text">This content is created from the players state of the Shop component.</p>
                                    <button className="btn btn-primary" onClick={modifyPlayers}>modifyPlayers</button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
};

export default Shop;
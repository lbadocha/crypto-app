import React from 'react';

const CryptoList = props =>{

    let rateList = props.rateData.map(rate=>{
        return <li key={rate.currency}>Last rate: <span className={rate.cssClass}>{rate.lastPrice}</span> {rate.currency} {rate.symbol}</li>
    })

    return (
        <ul className="crypto-list">
            {rateList}
        </ul>
    )
}

export default CryptoList;
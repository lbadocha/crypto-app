import React, {Component} from 'react';
import Cryptolist from './CryptoList';
import axios from 'axios';

class Crypto extends Component {

    constructor(){
        super();
        this.state = {
            crypto:[],
            filetedCrypto: []
        }
    }



    getData = () => {
        axios.get('https://blockchain.info/pl/ticker')
        .then(resp=>{
            const cryptoData = resp.data;
            let cryptoArray = [];
            let i = 0;

       
            for(let key in cryptoData){

                let newCryptoObj = {};

                newCryptoObj.lastPrice = cryptoData[key].last;
                newCryptoObj.symbol = cryptoData[key].symbol;
                newCryptoObj.currency = key;


                if(this.state.crypto[i] !== undefined){
                    if(cryptoData[key].last > this.state.crypto[i].lastPrice){
                        newCryptoObj.cssClass = 'color-green';
                    }else if(cryptoData[key].last < this.state.crypto[i].lastPrice){
                        newCryptoObj.cssClass = 'color-red';
                    }else{
                        newCryptoObj.cssClass = 'color-blue';
                    }
                } else{
                    newCryptoObj.cssClass = 'color-blue';
                }
                

                cryptoArray.push(newCryptoObj);
                i++
            }
            console.log(cryptoArray);
            this.setState({ 
                crypto: cryptoArray,
                filetedCrypto: cryptoArray
            })
        });
    }


    fileterCrypto = (event) => {
        
        let filteredCrypto = this.state.crypto.filter(crypto=>{
            return crypto.currency.toUpperCase().includes(event.target.value.toUpperCase());
        });

        this.setState({filetedCrypto: filteredCrypto})
    }

    componentDidMount(){
        this.getData();
        setInterval(this.getData,5000)
    }


    render(){
        return (
            <div className ="crypto">
                <input type="text" placeholder="filtruj" onChange={this.fileterCrypto} />
                <Cryptolist rateData={this.state.filetedCrypto}/>
            </div>
        )
    }


}

export default Crypto;
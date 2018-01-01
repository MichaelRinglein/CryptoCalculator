import React from 'react';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const row = {
  margin: '20px 10px 10px 10px',
}

const gradientButton = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: '10px 10px 10px 10px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
};

const styleInput = {
  width: '150px',
  margin: '10px 10px 10px 10px',
}

const urlForCurrency = value =>
`https://api.coinmarketcap.com/v1/ticker/${value}/`

export default class TabInput extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      requestFailed: false,
      amount: '',
      result: 0,
      //counter: '',
    }
  };

  change = (e) => {
    this.setState ({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    var urlAPI = (`https://api.coinmarketcap.com/v1/ticker/` + this.props.value + `/`);
    console.log(urlAPI);
    var xhr = new XMLHttpRequest();
    xhr.open ("GET", urlAPI, false)
    xhr.send();
    var data = JSON.parse(xhr.responseText);
    var exchangeRate = data[0].price_usd;
    var amountInput = (this.state.amount);
    const resultCalc = (parseFloat(exchangeRate) * parseFloat(amountInput));
    this.setState ({
      result: resultCalc,
    });
  };

  render() {
    return (
      <div>
        <Input
          type="number"
          name="amount"
          placeholder='Enter your amount'
          value={this.state.amount}
          onChange={e => this.change(e)}
          style={styleInput}/>
        <Button onClick={e => this.onSubmit(e)} style={gradientButton}>Calculate</Button>
        <Typography type="title" id="exchangeRate" style={row} gutterBottom>
          Your {this.props.value} are worth {this.state.result} USD
        </Typography>
      </div>
    );
  }
}

import React, {Component} from 'react';
import Typography from 'material-ui/Typography';
import TabInput from './tabInput';

const calculator = {
  margin: '20px 0 0 0',
};

const urlForCurrency = currency =>
`https://api.coinmarketcap.com/v1/ticker/${currency}/`

class SingleTab extends Component {
  constructor(props){
    super(props);
    this.state = {
      requestFailed: false,
    };
  }

  componentDidMount() {
    fetch(urlForCurrency(this.props.currency))
    .then(d => d.json())
    .then(d => {
      this.setState({
        priceData: d
      })
    })
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    if(!this.state.priceData) return <p>Loading...</p>
    return (
      <div>
        {this.state.priceData.map(function(pricePrint){
          return (
            <div>
              <Typography type="title" id="exchangeRate" gutterBottom>
                {pricePrint.price_usd} USD
              </Typography>
              <Typography type="subheading" gutterBottom>
                {pricePrint.price_btc} BTC
              </Typography>
              <Typography type="body2" gutterBottom>
                 {pricePrint.percent_change_1h} % (last hour)
              </Typography>
              <Typography type="body2" gutterBottom>
                 {pricePrint.percent_change_24h} % (last day)
              </Typography>
              <Typography type="body2" gutterBottom>
                 {pricePrint.percent_change_7d} % (last week)
              </Typography>
              <Typography type="title" style={calculator} gutterBottom>
                How much are my {pricePrint.name} worth in Dollars?
              </Typography>
              <TabInput value={pricePrint.name} />
            </div>
          );
        })}
      </div>
    )
  }
}

export default SingleTab;

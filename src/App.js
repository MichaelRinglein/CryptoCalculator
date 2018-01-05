import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import SingleTab from './components/singleTab';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    //marginTop: theme.spacing.unit * 3,
  },
  singleTab: {
    textAlign: 'center',
  },
});

const gradientAppBar = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
};

const styleCenter = {
  textAlign: 'center',
};

class BasicTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div className={classes.root} style={styleCenter}>
          <AppBar position="static" style={gradientAppBar}>
            <Tabs value={value} onChange={this.handleChange} centered>
              <Tab label="BTC" href="#BTC" />
              <Tab label="IOTA" href="#IOTA"/>
              <Tab label="DRGN" href="#DRGN" />
              <Tab label="SUB" href="#SUB"/>
              <Tab label="ETH" href="#ETH" />
            </Tabs>
          </AppBar>
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12}>
              {value === 0 && <TabContainer className={classes.singleTab}><SingleTab currency="bitcoin" /></TabContainer>}
              {value === 1 && <TabContainer className={classes.singleTab}><SingleTab currency="iota" /></TabContainer>}
              {value === 2 && <TabContainer className={classes.singleTab}><SingleTab currency="dragonchain" /></TabContainer>}
              {value === 3 && <TabContainer className={classes.singleTab}><SingleTab currency="ethereum" /></TabContainer>}
              {value === 4 && <TabContainer className={classes.singleTab}><SingleTab currency="substratum" /></TabContainer>}
            </Grid>
          </Grid>
        </div>
    );
  }
}

BasicTabs.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BasicTabs);

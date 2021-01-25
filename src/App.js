import React, { Component } from 'react';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: []
    }
  }


  componentDidMount() {
    Auth.fetchOffers().then((response) => {
      console.log('response:', response);
      this.setState({ offers: response})
    });
   }
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    const offers = this.state.offers;
    console.log('offers:', offers)
    return (
      <div className="App">
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">Todays Offers for {Auth.getUser()}</h5>
            </div>
            <div className="offer-container">
            {
            offers.map((o, i) => {
              return <div key={i} className="box">
                <b>Offer ID: </b>{o.offerID}<br />
                <b>Name: </b>{o.name}<br />
                <b>Expiry: </b>{o.offerExpiry}<br />
                <b>Details: </b>{o.details}
              </div>
            })}            
            </div>
      </div>
        <p className="App-intro">
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </p>
      </div>
    );
  }
}

export default withAuth(App);

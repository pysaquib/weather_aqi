import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import ReactSpeedometer from 'react-d3-speedometer';
// import TextField from '@material-ui/core/TextField';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      city : null,
      citySearched : null,
      aqi : null,
      render : false,
      renderNothing : false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = e => {
    e.preventDefault()
    this.setState({
      city : e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    this.setState({
      render : true,
      citySearched : this.state.city
    })
    var request = {
      method : "GET"
    }
    const res = await fetch(`https://api.waqi.info/feed/${this.state.city}/?token=1d58f819c0fca4b883949d58334c3b4adc6889db`, request)
    const data = await res.json()
    if(data.status!=='error'){
      this.setState({
        aqi : data.data.aqi,
        renderNothing : false
      })
    }
    else{
      this.setState({
        renderNothing : !this.state.renderNothing
      })
    }

  }


  render() {

    let display;

    const h1Style = {
      margin : '20px',
      border : '3px solid pink'
    }

    const divStyle = {
      margin : '10px',
      padding : '10px'
    }

    if(this.state.render){
      display = <h1 style={h1Style}>{this.state.aqi}</h1>
    }
    if(this.state.renderNothing){
      display = <h1 style={h1Style}>Sorry no data available for {this.state.citySearched}</h1>
    }
    return (
      <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form>
            <b><i>City</i></b> &nbsp;&nbsp;
            <input type="text" value={this.state.city || ""} onChange={this.handleChange} />&nbsp;&nbsp;
            <button type="submit" value="Search" onClick={this.handleSubmit}>Search</button>
          </form>
          {display}
          <div style={divStyle}>
            <ReactSpeedometer
            maxValue={400}
            startColor="green"
            value={this.state.aqi}
            segments={5}
            endColor="red"
            />
          </div>

      </div>
    );
  }
}

export default App;

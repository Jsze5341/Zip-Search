import React from 'react';
import "./index.css";
import ReactDOM from 'react-dom';
  
class City extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: this.props.data.City,
      state: this.props.data.State,
      location: this.props.data.Location,
      population: this.props.data.EstimatedPopulation,
      wages: this.props.data.TotalWages,
    };
  }


  render() {
    return(
      <table>
        <tr><td>City: {this.state.city}</td></tr>
        <tr><td>State: {this.state.state}</td></tr>
        <tr><td>Location: {this.state.location}</td></tr>
        <tr><td>Population: {this.state.population}</td></tr>
        <tr><td>Wages: {this.state.wages}</td></tr>
      </table>
    );
  }
}

class Zip extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorCheck: false,
      zipCode: [],
      array: [],
    };

    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleZipSubmit = this.handleZipSubmit.bind(this);
  }

  returnData()
  {
    var temp = this.state.array;
    var datatemp = [];

    if(this.state.errorCheck === false)
    {
      for(let i = 0; i < temp.length; i++)
        datatemp.push(<City data={temp[i]}/>)

      return datatemp;
    }

    else{
      return <div>Invalid Input</div>
    }

  }

  handleZipChange(zip){
    this.setState({
      zipCode: zip.target.value,
    });
    console.log(this.state.zipCode);
    console.log(this.state.array);
  }

  handleZipSubmit(zip){
    zip.preventDefault();
    fetch("https://ctp-zip-api.herokuapp.com/zip/" + this.state.zipCode)
    .then((response) => response.json())
    .then(data => {
      this.setState({
        errorCheck: false,
        array: data
    })
    console.log(data)
    console.log(this.state.errorCheck)
    })
    .catch((error) => {
      this.setState({
        errorCheck: true
      });
    }

  )
  }

  render(){
    return(
      <div>
      <form onSubmit={this.handleZipSubmit}>
        <label>
          Enter Zip:
          <textarea value={this.state.value} onChange={this.handleZipChange} />        
        </label>
        <input type="submit" value="Submit" />
        </form>
        {this.returnData()}
      </div>
    );
  }
}

export default Zip;

ReactDOM.render(
  <Zip />,
  document.getElementById('root')
);

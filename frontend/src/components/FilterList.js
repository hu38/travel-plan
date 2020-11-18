import React, {Component} from 'react';


class FilterList extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: 'Restaurant'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (e) {
        e.preventDefault();
    };

    handleChange = e => {
        this.setState({value: e.target.value});
    }

    handleOnClick = () => {
        fetch(`api/place/find-recommended-places?type=${this.state.value}&city=Los Angeles`,{
            method: 'GET',
            redirect: 'follow'
          }
          ).then(response => response.json())
          .then(result => {
              const length = this.props.recomendCityList.length;
              this.props.recomendCityList.splice(0,length);
              for(let i = 0; i < result.body.results.length; i++){
                this.props.updateRecomendCityList(this.props.recomendCityList.concat(result.body.results[i]));
              }
              console.log(this.props.recomendCityList);
          }
          )
          .catch(error => console.log('error', error));

    }

    render(){
          
        
        return (
            
            <form onSubmit = {this.handleSubmit}>
                <label>
                Recommendation Filter:
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value = 'Restaurant'>Restaurant</option>
                    <option value = 'Tourist Attraction'>Tourist Attraction</option>
                    <option value = 'Hotel'>Hotel</option>
                    <option value = 'Bus Station'>Bus Station</option>
                    <option value = 'Subway'>Subway</option>
                    <option value = 'Shopping Mall'>Shopping Mall</option>
                </select>
                </label>
                <input type="submit" value="Submit" onClick={this.handleOnClick}/>
            </form>

        )
    }

    


}

export default FilterList;
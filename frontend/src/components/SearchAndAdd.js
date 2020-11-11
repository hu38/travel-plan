import { Button } from 'antd';
import React, { Component } from 'react';
import '../styles/SearchAndAdd.css';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import PlaceList from "./PlaceList";


export default class SearchAndAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {},
            address: '',
            data: null
        }

        this._dragStart = this._dragStart.bind(this);
        this._dragging = this._dragging.bind(this);
        this._dragEnd = this._dragEnd.bind(this);
    }

    
    _dragStart(e) {
        this.setState({
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        });
    }

    _dragging(e) {

        if(this.state.dragging) {
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;
    
            this.setState({
                styles: {
                    left: left,
                    top: top
                }
            });
        }
    }    

    _dragEnd() {
        this.setState({
            dragging: false
        });
    }

    handleChange = address => {
        this.setState({ address });
      };

    handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => console.log('Success', latLng))
          .catch(error => console.error('Error', error));
    };

   
   findSearchAndAddResult=() =>{
       /*
       const {address} = this.state;
       const updatedSelected = this.props.selected.concat({address}); 
       this.props.updateSelected(updatedSelected);
      */
     console.log(this.state.address)
     
    fetch(`api/place/find-place?query=${this.state.address}`
    ).then(res => {console.log(res.body)}) 
    /*.then(
        data=>{
          if (data.statusCode===200)
          {
            console.log(data);
            const updatedSelected = this.props.selected.push(data); 
            this.props.updateSelected(updatedSelected);
          }
        }
      )*/
    
    }
    

    render() {
        
        return (
            <div className='SearchAndAdd' style={this.state.styles} onMouseDown={this._dragStart} onMouseMove={this._dragging} onMouseUp={this._dragEnd}>
                <div className='DialogTitle'>Search And Add</div>
                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                      <input
                        {...getInputProps({
                           placeholder: 'Search Places ...',
                           className: 'location-search-input',
                        })}
                      />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                    const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                          })}
                        >
                         <span>{suggestion.description}</span>
                       </div>
                        );
                    })}
                   </div>
                   </div>
                  )}  
                </PlacesAutocomplete>
                
                <Button className='AddButton' onClick={this.findSearchAndAddResult}>
                    Add
                </Button> 
            </div>
        );
    }
}
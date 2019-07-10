import React from 'react';
import PropTypes from 'prop-types';

export default class CountrySelect extends React.Component {
    constructor(props) {
        super(props);

        if (!CountrySelect.Countries) {
            CountrySelect.Countries = fetch('https://restcountries.eu/rest/v2/all')
              .then(res => res.json());
          }
      
          CountrySelect.Countries
            .then(countries => this.setState({ countries }))
            .catch(error => this.setState({ error }))
        
        this.state = {
            selectedCode: props.defaultCountry,
            countries: [],
            error: false,
        };
    }
    onClick(code) {
        this.setState({ selectedCode: code });
    }
    render() {
        if (this.state.error) {
          return <div>{this.state.error.toString()}</div>
        }
    
        return (
          <div className="country" style={{ maxHeight: `${this.props.maxHeight}px` }}>
            {this.state.countries.map((country, key) => (
              <div
                key={key}
                onClick={this.onClick.bind(this, country.alpha2Code)}
                style={{                  
                  backgroundColor: this.state.selectedCode === country.alpha2Code
                    ? !this.props.disabled ? 'lightblue' : ''
                    : ''
                }}
              >
                {country.name} - {country.alpha2Code}<img src={country.flag}></img>
              </div>
            ))}
          </div>
        );
    }
}

CountrySelect.defaultProps = {
    maxHeight: 200,
    defaultCountry: '',
  };
  
  
  CountrySelect.propTypes = {
    maxHeight: PropTypes.number.isRequired,
    defaultCountry: PropTypes.string,
  };
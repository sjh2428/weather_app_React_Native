import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from "./Weather";

const API_KEY = "7800c3174588f2312451d2a36812fb53";

export default class App extends React.Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null,
    localName: null,
    nation: null
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this._getWeather(position.coords.latitude, position.coords.longitude);
    },
    error=> {
      this.setState({
        error: error
      });
    });
  }
  _getWeather = (lat, long) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: json.main.temp,
        name: json.weather[0].main,
        isLoaded: true,
        localName: json.name,
        nation: json.sys.country
      });
    });
  }
  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar hidder={true} />
        {isLoaded ? (
          <Weather 
            weatherName={this.state.name} 
            temp={Math.ceil(this.state.temperature - 273.15)}
            localName={this.state.localName}
            nation={this.state.nation}
          />
          ) : (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Getting the weather</Text>
            {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    marginBottom: 40
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  loadingText: {
    fontSize:38,
    marginBottom: 24,
  }
});

import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

class Api extends Component {
  state = {
    details: [],
  };

  componentDidMount() {
    let data;
    axios
      .get('http://localhost:8000/api/monmodele/')
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Data Generated From Django</Text>
        <View>
          {this.state.details.map((output, id) => (
            <View key={id}>
              <Text style={styles.nom}>{output.nom}</Text>
              <Text style={styles.description}>{output.description}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  nom: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  description: {
    fontStyle: 'italic',
  }

});
  

export default Api;

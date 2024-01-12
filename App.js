import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

class Api extends Component {
  state = {
    details: [],
    selectedItemId: null,
    editedNom: '',
    editedDescription: '',
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:8000/api/monmodele/')
      .then((res) => {
        this.setState({
          details: res.data,
        });
      })
      .catch((err) => {});
  };

  handleEditPress = (itemId) => {
    // Récupérer les détails de l'élément sélectionné
    const selectedItem = this.state.details.find((item) => item.id === itemId);

    // Mettre à jour l'état pour refléter les détails de l'élément sélectionné
    this.setState({
      selectedItemId: itemId,
      editedNom: selectedItem.nom,
      editedDescription: selectedItem.description,
    });
  };

  handleSaveEdit = () => {
    // Effectuer une requête PUT pour mettre à jour l'élément dans la base de données
    axios
      .put(`http://localhost:8000/api/monmodele/${this.state.selectedItemId}/`, {
        nom: this.state.editedNom,
        description: this.state.editedDescription,
      })
      .then(() => {
        // Réinitialiser l'état après la mise à jour réussie
        this.setState({
          selectedItemId: null,
          editedNom: '',
          editedDescription: '',
        });

        // Rafraîchir les données après l'édition
        this.fetchData();
      })
      .catch((err) => {
        // Gérer les erreurs, si nécessaire
        console.error(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Data Generated From Django</Text>
        <View>
          {this.state.details.map((output, id) => (
            <View key={id}>
              {this.state.selectedItemId === output.id ? (
                // Afficher les champs d'édition si un élément est sélectionné
                <View>
                  <TextInput
                    value={this.state.editedNom}
                    onChangeText={(text) => this.setState({ editedNom: text })}
                    placeholder="Nom"
                  />
                  <TextInput
                    value={this.state.editedDescription}
                    onChangeText={(text) => this.setState({ editedDescription: text })}
                    placeholder="Description"
                  />
                  <TouchableOpacity onPress={this.handleSaveEdit}>
                    <Text>Enregistrer</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                // Afficher les détails normaux si aucun élément n'est sélectionné
                <View>
                  <Text style={styles.nom}>{output.nom}</Text>
                  <Text style={styles.description}>{output.description}</Text>
                  <TouchableOpacity onPress={() => this.handleEditPress(output.id)}>
                    <Text>Éditer</Text>
                  </TouchableOpacity>
                </View>
              )}
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

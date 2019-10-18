import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import api from './../services/moviesService'

export default class Home extends React.Component {
  static navigationOptions = {
      title: 'TARGET FLIX',
      headerStyle: {
        backgroundColor: '#141414'
      },
      headerTintColor: "#F00"
  }

  state = {
    movieList: []
  }

  componentDidMount () {
    //this.fetchAllMovies()
    api.get('/filmes').then(response => {
      this.setState({
        movieList: response.data
      })
    })
  }

  // fetchAllMovies = () => {
  //   const response = api.get('/filmes')

  //   this.setState({
  //     moviesList: response.data
  //   })
  // }

  renderCard = ({ item }) => {
    return <View style={styles.movieCard}>
      <Text style={styles.movieTitle}>{item.titulo}</Text>
      <Text style={styles.movieDescription}>{item.sinopse}</Text>
      <Button onPress={() => {
        this.props.navigation.navigate('Details', {movieId: item.id})
      }} title="Ver detalhes" />
    </View>
  }

  render () {
    return <View style={styles.body}>
        <View style={styles.moviesList}>
          <FlatList
            data={this.state.movieList}
            keyExtractor={item => item.id.toString()}
            renderItem={this.renderCard} />
        </View>
      </View>
  }
};

const styles = StyleSheet.create({  
  body: {
    backgroundColor: '#141414',
  },
  header: {
    padding: 20
  },
  headerTitle: {
    color: '#f00',
    fontWeight: 'bold',
    fontSize: 36,
    letterSpacing: 3
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  movieList: {
    padding: 20,
  },
  movieCard: {
    backgroundColor: Colors.lighter,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 24
  },
  movieDescription: {
    color: '#a2a2a2'
  }
});
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {ADD_COIN} from '../../redux/actions';

export default function index() {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  //Funcion que busca y despacha
  const handleSearch = () => {
    let url = `https://data.messari.io/api/v1/assets/${search.toLocaleLowerCase()}/metrics`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let {
          id,
          name,
          symbol,
          market_data: {price_usd, percent_change_usd_last_1_hour},
        } = data.data;
        dispatch({
          type: ADD_COIN,
          payload: {
            id,
            name,
            symbol,
            price_usd,
            percent_change_usd_last_1_hour,
          },
        });
        navigation.navigate('home');
      })
      .catch(err => Alert.alert('Crypto not found', 'Try again.'));
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 20,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 20, left: 20}}>
        <Text style={{fontWeight: '300', color: '#2544E0', fontSize: 16}}>
          {'< Back to list'}
        </Text>
      </TouchableOpacity>
      <View style={{width: '100%'}}>
        <Text style={styles.title}>Add a Cryptocurrency</Text>
        <TextInput
          placeholder="Use a name or ticker symbol..."
          style={focus ? styles.inputFocus : styles.input}
          onFocus={() => setFocus(true)}
          onChangeText={value => setSearch(value)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableHighlight onPress={handleSearch} style={styles.btn}>
            <Text style={styles.btnText}>Add</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#FFBD39',
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#020D42',
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  inputFocus: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#FFBD39',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: 'bold',
    color: '#020D42',
    fontSize: 22,
    marginBottom: 30,
  },
});

import { useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import { useSelector} from 'react-redux';
import Coin from '../../components/Coin';

export default function index() {
  const navigation = useNavigation();
  const coins = useSelector(state => state.coins);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      {coins?.map(item => (
        <Coin key={item.id} data={item} />
      ))}

      <TouchableOpacity
        onPress={() => navigation.navigate('add_crypto')}
        style={styles.containerText}>
        <Text style={styles.textAdd}>+ Add a Cryptocurrency</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  textAdd: {
    fontSize: 18,
    color: '#e55000',
    fontWeight: '400',
  },
});

import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import DownIcon from '../assets/icons/DownIcon';
import TrashIcon from '../assets/icons/TrashIcon';
import UpIcon from '../assets/icons/UpIcon';
import {REMOVE_COIN} from '../redux/actions';

function Coin({data}) {
  const [state, setstate] = useState(data);
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(()=>{
      updatePrice()
    },10000)
  }, []);

  //Funcion que se ejecuta cada 10 seg para actualizar el precio

  const updatePrice = async() => {
    try {
      let url = `https://data.messari.io/api/v1/assets/${data.symbol.toLocaleLowerCase()}/metrics`;
      let res = await fetch(url)
      let dataRes = await res.json()
      let {
        id,
        name,
        symbol,
        market_data: {price_usd, percent_change_usd_last_1_hour},
      } = dataRes.data;
      setstate({id,name,symbol,price_usd,percent_change_usd_last_1_hour})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.cointainer}>
      <View>
        <Text style={styles.title}>{state.name}</Text>
        <Text>{state.symbol}</Text>
      </View>

      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.title}>{`$ ${
          state?.price_usd > 1
            ? state.price_usd.toFixed(2)
            : state.price_usd.toFixed(8)
        }`}</Text>

        {state?.percent_change_usd_last_1_hour > 0 ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <UpIcon />
            <Text>{`${state.percent_change_usd_last_1_hour.toFixed(2)}%`}</Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <DownIcon />
            <Text>{`${state.percent_change_usd_last_1_hour.toFixed(2)}%`}</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => dispatch({type: REMOVE_COIN, payload: state})}>
          <TrashIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cointainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#c2c2c2',
  },
  title: {
    color: '#0e0208',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default Coin;

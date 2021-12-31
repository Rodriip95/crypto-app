import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import Home from '../screens/home';
import AddCrypto from '../screens/addCrypto';
import {NavigationContainer} from '@react-navigation/native';
import {Image, Text, View} from 'react-native';

const MainNavigation = createNativeStackNavigator();

function index() {
  return (
    <NavigationContainer>
      <MainNavigation.Navigator>
        <MainNavigation.Screen
          options={{
            title: 'CryptoTracker Pro',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#e34000',
            },
            headerRight: () => (
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={{uri: 'https://img.icons8.com/color/480/avatar.png'}}
                />
              </View>
            ),
          }}
          name="home"
          component={Home}
        />
        <MainNavigation.Screen options={{
            headerShown: false
        }} name="add_crypto" component={AddCrypto} />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
}

export default index;

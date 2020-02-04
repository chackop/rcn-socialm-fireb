import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { fireB, auth, storage, FBappID } from './config/config';
import * as Facebook from 'expo-facebook';

export const registerUser = (email, passw) => {
  console.log(email, passw)
  auth.createUserWithEmailAndPassword(email, passw)
    .then((user) => console.log(email, passw, user))
    .catch(err => console.log("Error", err))
}

const loginWithFB = async () => {
  try {
    console.log('appID', FBappID)
    await Facebook.initializeAsync(FBappID);
    console.log('initializeAsync Success');

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FBappID,
      {
        permissions: ['public_profile']
      });


    if (type === 'success') {
      const setPersistence = await fireB.auth().setPersistence(fireB.auth.Auth.Persistence.LOCAL);  // Set persistent auth state
      console.log('setPersistence', setPersistence)

      const credentials = await fireB.auth.FacebookAuthProvider.credential(token);
      console.log('credential done', credentials)

      const facebookProfileData = await fireB.auth().signInAndRetrieveDataWithCredential(credentials);  // Sign in with Facebook credential

      console.log('facebookProfileData', facebookProfileData)


      // const signInWithCredential = await fireB.auth().signInWithCredential(credentials);

      // console.log(signInWithCredential);
    }

  } catch (error) {
    console.log('Error in login', error)
  }
}



export default function App() {

  useEffect(() => {
    // registerUser('dimpchax@gmail.com', 'fakepass')

    // auth.signOut()
    //   .then((logout) => {
    //     console.log('logout', logout)
    //   })
    //   .catch((err) => {
    //     console.log('Error Sign', err)
    //   }
    //   );

    fireB.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user loggged', user)
      } else {
        console.log('not logged in')
      }
    }
    )
  }, [])

  return (
    <View style={styles.container}>
      <Text>Social Media App</Text>
      <TouchableHighlight
        onPress={loginWithFB}
        style={styles.button}>
        <Text style={styles.button}>Login with FB</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'green'
  },
  buttonText: {
    color: 'white'
  }
});

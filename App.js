import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { fireB, auth, storage, appID } from './config/config';
import * as Facebook from 'expo-facebook';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase'

export const registerUser = (email, passw) => {
  console.log(email, passw)
  auth.createUserWithEmailAndPassword(email, passw)
    .then((user) => console.log(email, passw, user))
    .catch(err => console.log("Error", err))
}

const loginWithFB = async () => {
  try {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      // handle this however suites the flow of your app
      throw new Error('User cancelled request');
    }

    console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

    // get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      // handle this however suites the flow of your app
      throw new Error('Something went wrong obtaining the users access token');
    }

    // create a new firebase credential with the token
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

    // login with credential
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()))
  } catch (e) {
    console.error(e);
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

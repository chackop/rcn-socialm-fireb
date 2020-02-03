import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fireB, auth, storage } from './config/config'

export const registerUser = (email, passw) => {
  console.log(email, passw)
  auth.createUserWithEmailAndPassword(email, passw)
    .then((user) => console.log(email, passw, user))
    .catch(err => console.log("Error", err))
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
});

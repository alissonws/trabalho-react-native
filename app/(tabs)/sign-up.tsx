
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterForm from '../../components/RegisterForm';

const SignUpPage = () => {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default SignUpPage;

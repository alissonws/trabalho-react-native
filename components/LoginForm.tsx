import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { loginUser } from '../store/reducers/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [btnMessage, setBtnMessage] = useState('Login');
  const { isLoggedIn } = useAuth();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    setBtnMessage('Logging in...');
    dispatch(loginUser({ identifier, password })).then((response) => {
      setBtnMessage('Logged: ' + JSON.stringify(response));
    }).catch(() => {
      setBtnMessage('Error');
    });
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Email or Username"
        value={identifier}
        onChangeText={setIdentifier}
        style={{ color: 'white' }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ color: 'white' }}
      />
      <Button title={btnMessage} onPress={handleLogin} />
      <Text style={{ padding: 10, textAlign: 'center' }}>
        Não tem uma conta? <Link href="/sign-up">Cadastre-se</Link>
      </Text>
    </SafeAreaView>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { loginUser } from '../store/reducers/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { ThemedText } from './ThemedText';
import { Link } from 'expo-router';

const LoginForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(loginUser({ identifier, password }));
  };

  return (
    <View>
      <TextInput
        placeholder="Email or Username"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <ThemedText>
        Não tem uma conta? <Link href="/sign-up">Cadastre-se</Link>
      </ThemedText>
    </View>
  );
};

export default LoginForm;

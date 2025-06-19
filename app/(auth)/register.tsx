import { stylesRegister } from '@/styles/register';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';



export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { registerUser } = useAuthStore();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Alerta', 'Por favor, completa todos los campos');
      return;
    }
    if(password !== confirmPassword){
      Alert.alert('Alerta','Las contraseñas deben ser iguales ')
    }
    try {
      const response = await registerUser(email, password)
      console.log('response', response)
      if (response !== 201 ) {
        Alert.alert('Error', 'Credenciales incorrectas');
        return;
      }
      Alert.alert('Éxito', 'Ingresa tus credenciales para iniciar sesión');
      setEmail('');
      setPassword('');
      router.push('/(auth)/login')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={stylesRegister.container}>
      <Text
        style={stylesRegister.title}
        accessibilityRole="header"
        accessibilityLabel="Pantalla de Registro"
        accessibilityHint="Pantalla para crear una nueva cuenta"
      >Registro</Text>
      <TextInput
        style={stylesRegister.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Campo de Email"
      />
      <TextInput
        style={stylesRegister.input}
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Campo de Contraseña"
      />
      <TextInput

        style={stylesRegister.input}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        accessibilityLabel="Campo de Confirmar Contraseña"
      />
      <TouchableOpacity
        style={stylesRegister.button}
        onPress={() => handleRegister()}>
        <Text
          style={stylesRegister.buttonText}
        >Registrarse</Text>
      </TouchableOpacity>
      <Text style={stylesRegister.registerLink}
        onPress={() => router.push('/(auth)/login')}
      >¿Ya tienes una cuenta?</Text>

    </View>
  );
}
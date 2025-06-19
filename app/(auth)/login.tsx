import { stylesLogin } from '@/styles/login';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser, isLoading, user } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Alerta', 'Por favor, ingresa tu usuario y contraseña');
      return;
    }
    try {
      const response = await loginUser(email.toLowerCase(), password);
      if (response !== 200) {
        Alert.alert('Error', 'Credenciales incorrectas');
        return;
      }
      Alert.alert('Éxito', 'Has iniciado sesión correctamente');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login failed', error);
    }
  };


  useEffect(() => {
    if (user) {
      router.replace('/(tabs)'); // o la ruta que corresponda
    }
  }, [user]);

  if (isLoading) {
    return (
      <View style={stylesLogin.container}>
        <Text style={stylesLogin.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={stylesLogin.container}>
      <Text style={stylesLogin.title}>Iniciar Sesión</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="email@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"  // 👈 desactiva mayúscula automática
        keyboardType="email-address" // 👈 teclado para email
      />
      <TextInput
        style={stylesLogin.input}
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        keyboardType="default" // 👈 teclado para texto
      />

      <TouchableOpacity
        disabled={isLoading}
        style={stylesLogin.button}
        onPress={handleLogin} >
        <Text style={stylesLogin.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => Alert.alert('Google Login', 'Funcionalidad no implementada aún')}>
          <Image source={require('../../assets/images/google-icon.png')} style={{ width: 34, height: 34 }} />
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 20 }}>

        <Text style={stylesLogin.registerLink} onPress={() => router.push('/(auth)/register')}>
          ¿No tienes cuenta?  Regístrate
        </Text>
        <Text style={stylesLogin.registerLink} onPress={() => router.push('/(auth)/forgotPassword')}>
          Recupera tu cuenta
        </Text>
      </View>
    </View>


  );
}

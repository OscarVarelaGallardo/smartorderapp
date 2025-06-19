import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="email@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"  // 👈 desactiva mayúscula automática
        keyboardType="email-address" // 👈 teclado para email
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        keyboardType="default" // 👈 teclado para texto
      />
      <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => Alert.alert('Google Login', 'Funcionalidad no implementada aún')}>
          <Image source={require('../../assets/images/google-icon.png')} style={{ width: 34, height: 34 }} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={isLoading}
        style={styles.button}
        onPress={handleLogin} >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      
     
      <Text style={styles.registerLink} onPress={() => router.push('/(auth)/register')}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  registerLink: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
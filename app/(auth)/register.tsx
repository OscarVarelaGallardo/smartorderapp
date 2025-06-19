import { router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}
        accessibilityRole="header"
        accessibilityLabel="Pantalla de Registro"
        accessibilityHint="Pantalla para crear una nueva cuenta"
      >Pantalla de Registro</Text>
      <TextInput
        style={{
          height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20,
          borderRadius: 5,
          paddingHorizontal: 10
        }}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={{
          height: 40,
          borderRadius: 5,
          borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10
        }}
        placeholder="Contraseña"
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput

        style={{
          height: 40,
          borderRadius: 5,
          borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10
        }}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={{ backgroundColor: '#007bff', padding: 10, borderRadius: 5, width: '80%', alignItems: 'center' }}
        onPress={() => console.log('Registro realizado')}>
        <Text
          style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
        >Registrarse</Text>
      </TouchableOpacity>
     
      
        <Text style={{ color: 'blue', 
          textDecorationLine: 'underline',  marginTop: 20,
          textAlign: 'center' }}
          onPress={() => router.push('/(auth)/login')}
          >¿Ya tienes una cuenta?</Text>
   
     
    </View>
  );
}
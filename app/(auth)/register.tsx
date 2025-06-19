import { router } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function RegisterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de Registro</Text>
      <Button title="Ir a Login" onPress={() => router.push('/(auth)/login')} />
    </View>
  );
}
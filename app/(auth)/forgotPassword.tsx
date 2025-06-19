import { router } from 'expo-router';

import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { stylesLogin } from '../../styles/login';


export default function ForgotPassword() {
  const [email, setEmail] = useState('')  
  const [isLoading, setIsLoading] = useState(false)

  const handleRecover = async () => {
    if (!email) {
      Alert.alert('Alerta', 'Por favor, ingresa tu email');
      return;
    }

    setIsLoading(true);
    //TODO: Aquí deberías llamar a tu API de recuperación de contraseña
    Alert.alert('Éxito', 'Se ha enviado un enlace de recuperación a tu email');
    setEmail('');
    setIsLoading(false);
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        style={stylesLogin.title}
        accessibilityRole="header"
        accessibilityLabel="Pantalla de Recuperación de Contraseña"
        accessibilityHint="Pantalla para recuperar la contraseña de tu cuenta"
      >Recuperar Contraseña</Text>

      <TextInput
        style={{ ...stylesLogin.input, width: '80%' }}
        placeholder="email@ejemplo.com"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // 👈 teclado para email
        accessibilityLabel="Campo de Email"
      />

      <TouchableOpacity
        disabled={isLoading}
        style={stylesLogin.button}
        onPress={handleRecover} >
        <Text style={stylesLogin.buttonText}>Recuperar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => router.push('/(auth)/login')}>
        <Text style={{ color: 'blue' }}>Volver a inicio de sesión</Text>
      </TouchableOpacity>

    </View>
  )
}

import { StyleSheet } from "react-native";


export const stylesLogin = StyleSheet.create({
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


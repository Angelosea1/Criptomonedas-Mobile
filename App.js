
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Formulario from './src/components/Formulario';

export default function App() {
  return (
    <View style={styles.container}>
      <Formulario />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});



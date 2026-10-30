
import { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView
} from 'react-native';

const Formulario = () => {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [tipoSelector, setTipoSelector] = useState('');

  const monedas = [
    { label: 'Dólar USD', value: 'USD' },
    { label: 'Peso Mexicano MXN', value: 'MXN' },
    { label: 'Euro EUR', value: 'EUR' },
    { label: 'Libra Esterlina GBP', value: 'GBP' }
  ];

  const criptomonedas = [
    { label: 'Bitcoin BTC', value: 'BTC' },
    { label: 'Ethereum ETH', value: 'ETH' },
    { label: 'Tether USDT', value: 'USDT' },
    { label: 'Solana SOL', value: 'SOL' }
  ];

  const abrirModal = (tipo) => {
    setTipoSelector(tipo);
    setModalVisible(true);
    setMostrarMensaje(false);
  };

  const seleccionarOpcion = (valor) => {
    if (tipoSelector === 'moneda') {
      setMoneda(valor);
    } else {
      setCriptomoneda(valor);
    }

    setModalVisible(false);
  };

  const obtenerOpciones = () => {
    return tipoSelector === 'moneda'
      ? monedas
      : criptomonedas;
  };

  const obtenerTexto = (valor, opciones) => {
    const opcion = opciones.find(item => item.value === valor);
    return opcion ? opcion.label : 'Seleccione';
  };

  const cotizar = () => {
    if (moneda === '' || criptomoneda === '') {
      setMostrarMensaje(false);
      return;
    }

    setMostrarMensaje(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.formulario}>

        <Text style={styles.titulo}>Cotizador Cripto</Text>

        {/* MONEDA */}

        <Text style={styles.label}>Moneda</Text>

        <TouchableOpacity
          style={styles.select}
          onPress={() => abrirModal('moneda')}
        >
          <Text style={styles.selectTexto}>
            {obtenerTexto(moneda, monedas)}
          </Text>

          <Text style={styles.flecha}>▼</Text>
        </TouchableOpacity>

        {/* CRIPTOMONEDA */}

        <Text style={styles.label}>Criptomoneda</Text>

        <TouchableOpacity
          style={styles.select}
          onPress={() => abrirModal('criptomoneda')}
        >
          <Text style={styles.selectTexto}>
            {obtenerTexto(criptomoneda, criptomonedas)}
          </Text>

          <Text style={styles.flecha}>▼</Text>
        </TouchableOpacity>

        {/* BOTÓN COTIZAR */}

        <TouchableOpacity
          style={styles.btnCotizar}
          onPress={cotizar}
        >
          <Text style={styles.textCotizar}>
            Cotizar
          </Text>
        </TouchableOpacity>

        {mostrarMensaje && (
          <Text style={styles.mensaje}>
            Formulario creado
          </Text>
        )}

      </View>

      {/* POPUP */}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >

        <Pressable
          style={styles.fondoModal}
          onPress={() => setModalVisible(false)}
        >

          <Pressable
            style={styles.popup}
            onPress={(event) => event.stopPropagation()}
          >

            <Text style={styles.tituloPopup}>
              Selecciona {tipoSelector === 'moneda'
                ? 'una moneda'
                : 'una criptomoneda'}
            </Text>

            {obtenerOpciones().map((opcion) => (

              <TouchableOpacity
                key={opcion.value}
                style={styles.opcion}
                onPress={() => seleccionarOpcion(opcion.value)}
              >

                <Text style={styles.textOpcion}>
                  {opcion.label}
                </Text>

              </TouchableOpacity>

            ))}

            <TouchableOpacity
              style={styles.btnCerrar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textCerrar}>
                Cancelar
              </Text>
            </TouchableOpacity>

          </Pressable>

        </Pressable>

      </Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5'
  },

  formulario: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5E49E2',
    textAlign: 'center',
    marginBottom: 20
  },

  label: {
    textTransform: 'uppercase',
    color: '#5E49E2',
    fontWeight: '700',
    fontSize: 22,
    marginVertical: 20
  },

  select: {
    height: 55,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  selectTexto: {
    fontSize: 16,
    color: '#333333'
  },

  flecha: {
    color: '#5E49E2',
    fontSize: 16
  },

  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 10
  },

  textCotizar: {
    color: '#FFFFFF',
    fontSize: 18,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  mensaje: {
    color: '#5E49E2',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },

  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },

  popup: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    elevation: 10
  },

  tituloPopup: {
    color: '#5E49E2',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },

  opcion: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE'
  },

  textOpcion: {
    fontSize: 17,
    color: '#333333',
    textAlign: 'center'
  },

  btnCerrar: {
    backgroundColor: '#EEEEEE',
    padding: 12,
    borderRadius: 8,
    marginTop: 15
  },

  textCerrar: {
    color: '#555555',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }

});

export default Formulario;


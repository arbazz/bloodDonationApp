import { StyleSheet, } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#454957',
      // alignItems: 'center',
      alignItems: "flex-start",
      paddingLeft: '10%',
      marginTop: 20
    },
    textInput: {
      width: '90%',
      borderBottomColor: 'blue',
      borderBottomWidth: 1,
      height: '10%'
    },
    text: {
      marginTop: '4%',
      color: '#454957',
      fontSize: 13,
      paddingBottom: 1
    },
    multiline:{
      height: '30%',
      borderColor: '#454957',
      borderWidth: 1,
      borderBottomColor: '#454957',
      padding: '2%'
    },
    btn: {
      width: '90%',
      backgroundColor: '#454957',
      marginTop: 20,
      height: 40,
      justifyContent: "center"
    },
    textWhite: {
      color: 'white',
      textAlign: 'center',
    }
  });

  export default styles;
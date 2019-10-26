import { StyleSheet, } from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewContainer:{
    alignContent: 'center',
    width: '90%',
    backgroundColor: '#f7f6f6',
    marginLeft: '5%',
    flexDirection: 'column',
    marginTop: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  name:{
    fontSize: 18,
    marginLeft: 10,
    padding: 5,
  },
  required:{
    fontSize: 16,
    marginLeft: 10,
  },
  otherText:{
    fontSize: 14,
    marginLeft: 10,
    marginTop: 6
  },
  seprator:{
    backgroundColor: 'blue',
    width: '100%',
    height: 1,
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.3
  },
  row:{
    flexDirection: 'row',
    padding: 2,
    justifyContent: 'center'
    
  },
  com:{
    marginLeft: '8%',
    paddingLeft: 20,
    paddingBottom: 5
  },
  vol:{
    marginRight: '8%',
    paddingRight: 20,
    paddingBottom: 5
  },
  textButton:{
    color: 'blue'
  }

});

export default Styles;
import { StyleSheet, } from 'react-native';
import { red } from 'ansi-colors';

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
    paddingRight: 20
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
  },
  IconContainer:{
    marginLeft: '70%'
  },
  VolCont:{
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    borderBottomColor: 'blue',
    borderBottomWidth: 1,
    width: '70%',
    marginLeft: '15%',
    marginRight: '15%',
    padding: 10
  },
  row1:{
    flexDirection: 'row',
  },
  Icon2:{
    padding: 5,
  },
  comm:{
    padding: 9,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: 'grey',
    borderWidth: 1
  },
  row3:{
    flexDirection: 'row',
    marginTop: 10
  },
  textInput:{
    borderColor: 'grey',
    borderWidth: 1,
    width: '80%',
    padding: 9,
    marginLeft: '3%'
  },
  postContainer:{
    backgroundColor: 'red',
    padding: 15,
  },
  postText:{
    color: 'white'
  },
  donatedBtn:{
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 4,
    marginTop: 5
  },
  bluBtn:{
    paddingHorizontal: 30,
    borderWidth: 1,
    paddingVertical: 4,
    marginTop: 5,
    backgroundColor: 'blue',
  }

});

export default Styles;
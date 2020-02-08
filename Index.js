import * as React from 'react';
import { View, StyleSheet,Image,SafeAreaView,Animated} from 'react-native';
import Constants from 'expo-constants';



export default class App extends React.Component {
  state = {
    rotateValue: new Animated.Value(0),
  };


  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 6000);
  }

  render() {
   
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.gif}>
       <Image
            style={{width:'100%',height:400}}
            source={{uri:'https://thumbs.gfycat.com/EnragedMinorGalapagosmockingbird-size_restricted.gif'}}
          />
       </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor:'#000000',
  },


  gif:{
flex:1.5,
justifyContent:'center',
alignItems:'center',
backgroundColor:'#000000'
  },

});


import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from 'expo-constants';



export default class App extends React.Component {

    constructor(props) {


        super(props);

        const { navigation } = this.props;

        var data = navigation.getParam("infodata");

        this.state = {
            data: data,


        }

    }


    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.txt}>Bilgilendirme</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.top}>
                        <View style={styles.topleft}>
                            <Image
                                style={styles.img}
                                source={{ uri: this.state.data.images["Poster Art"].url }}
                            />
                        </View>
                        <View style={styles.topright}>
                            <Text style={styles.txt}>Title : {this.state.data.title}</Text>
                            <Text style={styles.txt}>ProgramType : {this.state.data.programType}</Text>
                            <Text style={styles.txt}>ReleaseYear : {this.state.data.releaseYear}</Text>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.descheader}>Description</Text>
                        <Text style={styles.txt}>{this.state.data.description}</Text>
                    </View>

                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon style={{marginLeft:10}}
                            name="keyboard-backspace"
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000000',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    body: {
        flex: 8
    },
    footer: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
    },
    top: {
        flex: 4,
        flexDirection: 'row'
    },
    bottom: {
        flex: 4,
        padding: 10
    },
    topleft: {
        flex: 4,
        justifyContent:'center',
        alignItems:'center'
    },
    topright: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 180,
        height: 250,
        borderWidth: 1,
        borderColor:'red',
        borderRadius:20
    },
    descheader: {
        color: 'red'
    },
    txt: {
        color: '#fff'
    }




});

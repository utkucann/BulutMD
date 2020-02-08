import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from 'expo-constants';



export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],

        }

    }

  


    componentDidMount() {
        return fetch('https://gist.githubusercontent.com/erkanerturk/d7f4f4f0ed205c2aa1b26a7cc6e8461d/raw/ef374acb5b052895fbac0de199d857ff87b490b1/sample.json')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson.entries,
                },
                    function () {

                    });

            })



            .catch((error) => {
                console.error(error);
            });



    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }


        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.header}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Movie',
                        {
                            data: this.state.dataSource.filter(x => x.programType === 'movie')
                        })}>
                        <Text style={styles.bannerText}>Movies</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Series',
                        {
                            data: this.state.dataSource.filter(x => x.programType === 'series')
                        })}>
                        <Text style={styles.bannerText}>Series</Text>
                    </TouchableOpacity>

                </View>


                <View style={styles.body}>
                    <Text style={styles.dashheader}>Vizyondakiler</Text>
                    <View style={styles.list}>
                        <FlatList
                            data={this.state.dataSource}
                            numColumns={3}
                            renderItem={({ item }) =>
                                <View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Info', {
                                        infodata: item
                                    })}>
                                        <View style={styles.subdashboardview}>
                                            <Image
                                                style={styles.dashboardimg}
                                                source={{ uri: item.images["Poster Art"].url }}
                                            />
                                            <Text style={styles.dashboardtitletxt}>{item.title.substring(0, 10)}</Text>
                                        </View>

                                    </TouchableOpacity>

                                </View>

                            }
                            keyExtractor={({ id }, index) => id}
                        />
                    </View>


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
        flexDirection: 'row',
        backgroundColor: '#000000',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },


    body: {
        flex: 10,
        backgroundColor: '#000000',

    },
   
    list:{
      alignItems:'center'
    },

    dashboardimg: {
        width: 100,
        height: 150,
        borderRadius: 15,
        marginLeft:2
     

    },
    dashboardtitletxt: {
        color: '#fff'
    },
    bannerText: {
        fontSize: 20,
        marginTop: 10,
        alignSelf: 'center',
        color: 'yellow'

    },
    dashheader: {
        color: '#fff',
        fontSize: 20,
        alignSelf: "center"

    },

    subdashboardview: {
        alignItems: 'center',
        marginTop: '15%',
    },




});


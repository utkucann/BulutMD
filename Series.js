import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, Button, TextInput, FlatList, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from 'expo-constants'; import ActionSheet from 'react-native-actionsheet';



export default class App extends React.Component {
    constructor(props) {


        super(props);

        const { navigation } = this.props;//navigation parametresi ile gelen datayi karsilioruz

        var data = navigation.getParam("data");//Home sayfasindan gelen data parametresi

        this.state = {
            data: data,//gelen datayi data degiskenine atiyoruz
            search: [],//search icin bos bir state olusturuyoruz
            searchviewvisible: false,//search bar in gorunurlugunu boolean deger olarak false yapiyoruz.
            data2: data.slice(0, 18),//data parametresinin ilk 18 objesini data2 degiskenine atiyoruz

        }

    }

    //Filtreleme Fonksiyonlari
    onRandom = () => {
        var l = [];
        var Random = this.state.data[this.GenerateRandomNumber()];
        l.push(Random);
        return l;//data parametresinin random degeri
    }
    onDesc = () => {
        var desc = this.state.data.sort((a, b) => (a.releaseYear - b.releaseYear));
        return desc;//data parametresinin buyukten kucuge siralanmasi
    }

    onAsc = () => {
        var asc = this.state.data.sort((a, b) => (b.releaseYear - a.releaseYear));
        return asc;//data parametresinin kucukten buyuge siralanmasi
    }


    //Random sayi ureten fonksiyonumuz
    GenerateRandomNumber = () => {
        var RandomNumber = Math.floor(Math.random() * 10) + 1;
        return RandomNumber;
    }


    searchData = (keyword) => {
        var searchedData = [];
        var Alldata = this.state.data;

        for (var i = 0; i < Alldata.length; i++) {
            if (Alldata[i].title.toLowerCase().includes(keyword.toLowerCase())) {
                searchedData.push(Alldata[i])
            }
        }


    }

    showActionSheet = () => {
        this.ActionSheet.show();
    };


    render() {
        var optionArray = [
            'Yeniye Göre Sirala',
            'Eskiye Göre Sirala',
            'Rastgele Sirala',
            'Iptal',
        ];

        return (
            <SafeAreaView style={styles.container}>
                <ActionSheet //Siralama icin menü
                    ref={o => (this.ActionSheet = o)}
                    title={'Sirala'}
                    options={optionArray}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                        // siralama fonksiyonlarimizi setstate yapiyoruz.
                        if (index == 0) {
                            var a = this.onAsc();
                            this.setState({
                                data2: a
                            });
                        }
                        else if (index == 1) {
                            var b = this.onDesc();
                            this.setState({
                                data2: b
                            });
                        }

                        else if (index == 2) {
                            var d = this.onRandom();
                            this.setState({
                                data2: []
                            }, () => {
                                this.setState({
                                    data2: d
                                });
                            });
                            console.log(d)
                        }

                    }}

                />

                <View style={styles.header}>
                    <Text style={styles.headertext}>Series</Text>
                </View>
                {this.state.searchviewvisible ? (
                    <View style={styles.searchview}>
                        <TextInput onChangeText={(value) => { this.searchData(value) }} ref={ref => this.searchRef = ref} style={styles.searchBar} placeholder={"Film / Dizi / Oyuncu Ara..."} placeholderTextColor={'#000000'} />
                    </View>
                ) : undefined}


                <View style={styles.body}>

                    <FlatList  //Flat list ile data2 yi kullanarak datanin ilk 18 objesinin icinde donuyoruz.
                        data={this.state.data2}
                        numColumns={2} // sayfayi ikiye bolerek sagli sollu olarak data2 yi renderliyoruz.
                        extraData={this.state.refresh}
                        renderItem={({ item }) => //data2 icinden single objemizi aliyoruz.

                            <View style={styles.subdashboardview}>
                                <Image
                                    style={styles.dashboardimg}
                                    source={{ uri: item.images["Poster Art"].url }}
                                />
                                <Text style={styles.dashboardtitletxt}>{item.title.substring(0, 15)}</Text>
                                <Text style={styles.dashboardtitletxt}>ReleaseYear : {item.releaseYear}</Text>
                                <Button
                                    title="Information"
                                    // onPress metodu ile info sayfamiza gecis yapip, single data bilgisini sayfaya gonderiyoruz.
                                    onPress={() => this.props.navigation.navigate('Info', {
                                        infodata: item
                                    })}
                                />
                            </View>

                        }
                        keyExtractor={({ id }, index) => id}
                    />

                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                        <Icon style={{}}
                            name="home-outline"
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ searchviewvisible: !this.state.searchviewvisible })}>
                        <Icon style={{}}
                            name="search-web"
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.showActionSheet}>
                        <Icon style={{}}
                            name="filter-outline"
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
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'


    },
    body: {
        flex: 8,
        backgroundColor: '#000000',
        alignItems: 'center'


    },
    footer: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    headertext: {
        color: '#fff',
        fontSize: 25,
    },


    filmbanner: {
        width: 180,
        height: 150,
        borderWidth: 1,
        borderRadius: 15,
    },
    bannerText: {
        fontWeight: 'bold',
        fontSize: 20,

    },


    dashboardimg: {
        width: 140,
        height: 200,
        borderRadius: 15,

    },
    subdashboardview: {
        alignItems: 'center',
        margin: 20,
    },
    dashboardtitletxt: {
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10,
        color: '#fff'
    },
    searchBar: {
        width: '90%',
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: '#fff',
        color: "black",
        paddingTop: Platform.OS === 'ios' ? 13 : 0,
        paddingBottom: Platform.OS === 'ios' ? 13 : 0,
        borderRadius: 5,
        margin: 20,
    },
    searchview: {
        flex: 1,
        backgroundColor: '#000000'
    },


    txtview: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    txt: {
        fontSize: 20,
    }




});

import React from 'react';
import {Image, StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import SvgUri from 'react-native-svg-uri';


const axios = require('axios');

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null
        };

        this.getData();
    }

    async getData() {

        const response = await axios({
            method: 'get',
            url: 'https://www.balldontlie.io/api/v1/teams',
        });

        console.log(response.data.data)

        this.setState({
            data: response.data.data
        })
    }

    renderItem(item) {
      return (
            <View>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri:'https://watch.global.nba.com/media/img/teams/00/logos/'+item.abbreviation+'_logo.png'}}
                />
                <Text
                    style={{color: 'black', fontSize: 20}}
                >
                    {item.full_name}
                </Text>
            </View>
        )
    }

    render() {
        return !this.state.data ? null : (

            <FlatList
  data={this.state.data}
  renderItem={({item}) => this.renderItem(item)}
/>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
});
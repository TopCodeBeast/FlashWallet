import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../styles';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';

const Header = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: colors.grey24,
        paddingTop: 44,
        paddingHorizontal: 16,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{...fonts.title2, color: 'white'}}>Swap</Text>
      <View style={{position: 'absolute', right: 20, top: 50}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesome
            style={{paddingLeft: 8, fontSize: 16, color: 'white'}}
            icon={SolidIcons.times}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

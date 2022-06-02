import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {fonts, colors} from '../../../../styles';
import {PrimaryButton, TextButton} from '../../../../components/Buttons';
import CustomTextInput from '../../../../components/CustomTextInput';
import AntIcon from 'react-native-vector-icons/AntDesign';

const SearchToken = ({onCancel}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={{flex: 1, marginHorizontal: 24, height: '100%'}}>
      <View style={{marginTop: 24}}>
        <CustomTextInput
          leftElement={
            <AntIcon
              name="search1"
              size={24}
              color="white"
              style={{marginLeft: 12}}
            />
          }
          rightElement={
            searchText.length > 0 && (
              <AntIcon
                style={{marginRight: 12}}
                name="close"
                size={24}
                color="white"
                onPress={() => {
                  setSearchText('');
                }}
              />
            )
          }
          onChangeText={value => {
            setSearchText(value);
          }}
          value={searchText}
          placeholder="Token name or address"
        />
      </View>
      <View style={{marginTop: 24}}>
        <Text style={{...fonts.para_semibold, color: colors.grey9}}>
          Select Token
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: 0, left: 0}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 40,
            width: '100%',
          }}>
          <TextButton text="Cancel" style={{width: 160}} onPress={onCancel} />
          <PrimaryButton text="Add Token" style={{width: 160}} />
        </View>
      </View>
    </View>
  );
};

export default SearchToken;

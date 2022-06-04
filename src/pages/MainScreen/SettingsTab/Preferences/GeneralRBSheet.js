import React, {useState, useRef} from 'react';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {colors, fonts} from '../../../../styles';
import FontAwesome, {RegularIcons, SolidIcons} from 'react-native-fontawesome';
import ComboBox from '../../../../components/ComboBox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import RBSheet from 'react-native-raw-bottom-sheet';

const currencyConversionProps = require('../../../../constants').default
  .currencyConversionProps;

const GeneralRBSheet = ({onPressClose}) => {
  const [baseCurrency, setBaseCurrency] = useState({
    label: 'United States Dollar',
    value: 'USD',
  });
  const [privateCurrency, setPrivateCurrency] = useState('native');
  const refRBBaseCurrencySheet = useRef(null);

  const radio_props = [
    {label: 'Native', value: 'native'},
    {label: 'Fiat', value: 'fiat'},
  ];

  const renderBaseCurrencyRBSheet = () => {
    return (
      <RBSheet
        height={500}
        ref={refRBBaseCurrencySheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <ScrollView style={{height: '100%', marginBottom: 24}}>
          <View style={{marginTop: 12}}>
            <Text
              style={{...fonts.title2, color: 'white', textAlign: 'center'}}>
              Base Currency
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            {currencyConversionProps.map(currency => {
              return (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  key={'generalRBSheet_' + currency.value}>
                  <Text style={{...fonts.para_regular, color: 'white'}}>
                    {currency.value + ' - ' + currency.label}
                  </Text>
                  {currency.value === baseCurrency.value && (
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                      <FontAwesome
                        style={{fontSize: 16, color: colors.green5}}
                        icon={RegularIcons.checkCircle}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </RBSheet>
    );
  };

  return (
    <View style={{marginHorizontal: 24}}>
      {renderBaseCurrencyRBSheet()}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onPressClose}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.chevronLeft}
          />
        </TouchableOpacity>
        <Text
          style={{
            ...fonts.title2,
            color: 'white',
            textAlign: 'center',
            flex: 1,
          }}>
          General
        </Text>
        <TouchableOpacity
          onPress={onPressClose}
          style={{flexDirection: 'row-reverse'}}>
          <FontAwesome
            style={{
              fontSize: 16,
              color: 'white',
            }}
            icon={SolidIcons.times}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          marginTop: 40,
          marginBottom: 120,
        }}>
        <View style={{marginTop: 40}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              Currency Conversion
            </Text>
            <Text
              style={{
                ...fonts.para_regular,
                color: colors.grey9,
                marginTop: 8,
              }}>
              Display fiat values in using o specific currency throughout the
              application
            </Text>
          </View>
          <View style={{marginTop: 24}}>
            <ComboBox
              onPress={() => {
                refRBBaseCurrencySheet.current.open();
              }}>
              <Text style={{...fonts.para_semibold, color: 'white'}}>
                USD-United State Dollar
              </Text>
            </ComboBox>
          </View>
        </View>
        <View style={{marginTop: 40}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>
              Privacy Currency
            </Text>
            <Text
              style={{
                ...fonts.para_regular,
                color: colors.grey9,
                marginTop: 8,
              }}>
              Select Native to prioritize displaying values in the native
              currency of the chain (e.g. ETH). Select Fiat to prioritize
              displaying values in your selected fiat currency
            </Text>
          </View>
          <View style={{marginTop: 40, flexDirection: 'row'}}>
            <RadioForm formHorizontal={true} animation={true}>
              {/* To create radio buttons, loop through your array of options */}
              {radio_props.map((obj, i) => (
                <RadioButton
                  labelHorizontal={true}
                  key={i}
                  wrapStyle={{marginRight: 50}}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={obj.value === privateCurrency}
                    onPress={() => {
                      setPrivateCurrency(obj.value);
                    }}
                    borderWidth={2}
                    buttonSize={15}
                    buttonOuterSize={30}
                    buttonInnerColor={colors.green5}
                    buttonOuterColor={
                      obj.value === privateCurrency
                        ? colors.green5
                        : colors.grey9
                    }
                    buttonStyle={{}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() => {
                      setPrivateCurrency(obj.value);
                    }}
                    labelStyle={{color: 'white', ...fonts.para_regular}}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <View style={{marginTop: 40}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Current Language
            </Text>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              Translate the application to a different supported language
            </Text>
            <View style={{marginTop: 12}}>
              <ComboBox>
                <Text style={{...fonts.para_semibold, color: 'white'}}>
                  English
                </Text>
              </ComboBox>
            </View>
          </View>
          <View style={{marginTop: 40, paddingBottom: 20}}>
            <Text style={{...fonts.title2, color: 'white'}}>Search Engine</Text>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              Change the default search engine used when entering search terms
              in the URL bar
            </Text>
            <View style={{marginTop: 12}}>
              <ComboBox>
                <Text style={{...fonts.para_semibold, color: 'white'}}>
                  DuckDuckGo
                </Text>
              </ComboBox>
            </View>
          </View>
          <View style={{marginTop: 40}}>
            <Text style={{...fonts.title2, color: 'white'}}>
              Account Identicon
            </Text>
            <Text style={{...fonts.para_regular, color: colors.grey9}}>
              You can customize your account
            </Text>
            <View style={{marginTop: 12}}>
              <ComboBox>
                <Text style={{...fonts.para_semibold, color: 'white'}}>
                  Custom Account
                </Text>
              </ComboBox>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GeneralRBSheet;

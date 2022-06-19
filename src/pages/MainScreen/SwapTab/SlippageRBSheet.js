import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {PrimaryButton, SecondaryButton} from '../../../components/Buttons';
import {colors, fonts} from '../../../styles';

const SlippageRBSheet = props => {
  const {onSaveSlippage} = props;
  const [slippage, setSlippage] = useState(props.slippage.toString());
  const [customSlippage, setCustomSlippage] = useState(
    parseFloat(props.slippage.toString()) !== 1 &&
      parseFloat(props.slippage.toString()) !== 2
      ? props.slippage.toString()
      : '',
  );
  return (
    <>
      <Text
        style={{
          marginTop: 12,
          color: 'white',
          ...fonts.title2,
          textAlign: 'center',
        }}>
        Slippage Tolerance
      </Text>
      <Text
        style={{
          marginTop: 40,
          color: colors.grey9,
          ...fonts.para_regular,
          marginHorizontal: 24,
        }}>
        If the price changes between the time your order is placed and confirmed
        it&apos;s called &lquot;slippage&rquot;. Your swap will automatically
        cancel if slippage exceeds your &lquot;max slippage&rquot; setting.
      </Text>
      <View
        style={{
          marginTop: 24,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 24,
        }}>
        {Number(slippage) === 1 && customSlippage.toString().length == 0 ? (
          <PrimaryButton text={'1%'} />
        ) : (
          <SecondaryButton
            text="1%"
            onPress={() => {
              setSlippage('1');
              setCustomSlippage('');
            }}
          />
        )}
        {Number(slippage) === 2 && customSlippage.toString().length == 0 ? (
          <PrimaryButton style={{marginLeft: 12}} text={'2%'} />
        ) : (
          <SecondaryButton
            style={{marginLeft: 12}}
            text="2%"
            onPress={() => {
              setSlippage('2');
              setCustomSlippage('');
            }}
          />
        )}
        <TextInput
          style={{
            color: 'white',
            height: 48,
            paddingHorizontal: 12,
            borderColor: colors.grey9,
            borderWidth: 1,
            borderRadius: 8,
            flex: 1,
            marginLeft: 12,
          }}
          onChangeText={value => setCustomSlippage(value)}
          value={customSlippage}
          placeholder={'Custom'}
          placeholderTextColor={colors.grey12}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          marginHorizontal: 24,
          marginBottom: 40,
        }}>
        <PrimaryButton
          text="Save"
          onPress={() => {
            onSaveSlippage(
              customSlippage.toString().length > 0
                ? customSlippage.toString()
                : slippage,
            );
          }}
          enableFlag={
            customSlippage.toString().length > 0
              ? Number(customSlippage.toString()) ===
                  parseFloat(customSlippage.toString()) &&
                parseFloat(customSlippage.toString()) <= 5
              : true
          }
        />
      </View>
    </>
  );
};

export default SlippageRBSheet;

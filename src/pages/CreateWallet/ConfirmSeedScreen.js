import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {Text, View, TouchableOpacity} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import {colors, fonts} from '../../styles';

import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

import confirmSeedTitleSvgXml from './confirmSeedTitleSVG';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const testNumbers = [
  1 + Math.floor(Math.random() * 4),
  5 + Math.floor(Math.random() * 4),
  9 + Math.floor(Math.random() * 4),
];

const getNearNumbers = num => {
  let t = [],
    res = [];
  if (num < 5) {
    t.push(
      1,
      2,
      3,
      4,
      5 + Math.floor(Math.random() * 4),
      9 + Math.floor(Math.random() * 4),
    );
  } else if (num < 9) {
    t.push(
      5,
      6,
      7,
      8,
      9 + Math.floor(Math.random() * 4),
      1 + Math.floor(Math.random() * 4),
    );
  } else if (num < 13) {
    t.push(
      9,
      10,
      11,
      12,
      1 + Math.floor(Math.random() * 4),
      5 + Math.floor(Math.random() * 4),
    );
  }
  while (t.length) {
    let idx = Math.floor(Math.random() * t.length);
    res.push(t[idx]);
    t.splice(idx, 1);
  }
  return res;
};

const testNumbersCandidates = [
  getNearNumbers(testNumbers[0]),
  getNearNumbers(testNumbers[1]),
  getNearNumbers(testNumbers[2]),
];

const ConfirmSeedScreen = ({navigation, successCallback, mnemonic}) => {
  const [step, setStep] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [curAns, setCurAns] = useState('');

  return (
    <View
      style={{
        width: '100%',
        paddingTop: 40,
        height: '100%',
        flexDirection: 'column',
      }}>
      <View>
        <View style={{paddingHorizontal: 24, alignItems: 'center'}}>
          <SvgXml xml={confirmSeedTitleSvgXml} />
        </View>
        <View style={{paddingHorizontal: 24, marginTop: 16}}>
          <Text
            style={{
              textAlign: 'center',
              ...fonts.para_regular,
              color: 'white',
            }}>
            Select each word in the order it was presented to you
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {curAns ? (
            <MaskedView
              maskElement={
                <Text style={{...fonts.big_type1}}>
                  {testNumbers[step] + '. ' + curAns}
                </Text>
              }>
              <LinearGradient colors={colors.gradient8}>
                <Text style={{...fonts.big_type1, opacity: 0}}>
                  {testNumbers[step] + '. ' + curAns}
                </Text>
              </LinearGradient>
            </MaskedView>
          ) : (
            <Text style={{color: colors.grey12, ...fonts.big_type1}}>
              {testNumbers[step] + '.'}
            </Text>
          )}
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 40,
              height: 8,
              borderRadius: 8,
              backgroundColor:
                step === 1 || step === 2 ? colors.green5 : colors.grey23,
              marginRight: 8,
            }}></View>
          <View
            style={{
              width: 40,
              height: 8,
              borderRadius: 8,
              backgroundColor: step === 2 ? colors.green5 : colors.grey23,
              marginRight: 8,
            }}></View>
          <View
            style={{
              width: 40,
              height: 8,
              borderRadius: 8,
              backgroundColor: colors.grey23,
              marginRight: 8,
            }}></View>
        </View>
        <View
          style={{
            marginHorizontal: 24,
            marginTop: 40,
            borderRadius: 8,
            borderColor: colors.grey22,
            borderWidth: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {testNumbersCandidates[step].map((item, index) => {
            return (
              <TouchableOpacity
                key={'confirm_seed' + index}
                onPress={() => {
                  setCurAns(mnemonic[item - 1]);
                  if (item === testNumbers[step]) {
                    setIsCorrect(true);
                  } else {
                    setIsCorrect(false);
                  }
                }}
                style={{
                  backgroundColor: colors.grey22,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  margin: 8,
                  borderRadius: 8,
                }}>
                <Text style={{...fonts.para_regular, color: 'white'}}>
                  {mnemonic[item - 1]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          marginBottom: 80,
          marginHorizontal: 24,
        }}>
        <PrimaryButton
          onPress={() => {
            if (step === 2) {
              successCallback();
            } else {
              setIsCorrect(false);
              setCurAns('');
              setStep(step + 1);
            }
          }}
          text="Next"
          enableFlag={isCorrect}
        />
      </View>
    </View>
  );
};

export default ConfirmSeedScreen;

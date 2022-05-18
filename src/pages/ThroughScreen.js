import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
  Pressable,
} from 'react-native';
import Dots from 'react-native-dots-pagination';

import {colors, commonStyles} from '../styles';

//import images

const imageList = [
  require('../assets/images/through/image1.png'),
  require('../assets/images/through/image2.png'),
  require('../assets/images/through/image3.png'),
  require('../assets/images/through/image4.png'),
];

const titleImageList = [
  require('../assets/images/through/title1.png'),
  require('../assets/images/through/title2.png'),
  require('../assets/images/through/title3.png'),
  require('../assets/images/through/title4.png'),
];

const ThroughScreen = ({navigation}) => {
  const [current, setCurrent] = useState(0);

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            top: '16%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
          }}>
          <Image source={imageList[current]} />
        </View>
        <View
          style={{width: '80%', position: 'absolute', top: '60%', left: '10%'}}>
          <Image source={titleImageList[current]} />
        </View>
        {current <= 2 && (
          <>
            <View style={{width: '100%', bottom: '15%', position: 'absolute'}}>
              <Dots
                style={{bottom: '80%'}}
                length={3}
                active={current}
                passiveDotWidth={8}
                activeDotWidth={10}
                passiveColor={'#4C516B'}
                activeColor={'#FEBF32'}
              />
            </View>
            <View
              style={{
                width: '90%',
                bottom: '6%',
                position: 'absolute',
                left: '5%',
              }}>
              <Pressable
                style={commonStyles.secondaryButton}
                onPress={() => {
                  setCurrent((current + 1) % 4);
                }}>
                <Text style={commonStyles.secondaryButtonText}>
                  {current < 2 ? 'Next' : 'Get Start'}
                </Text>
              </Pressable>
            </View>
          </>
        )}
        {current == 3 && (
          <>
            <View
              style={{
                width: '90%',
                bottom: '6%',
                position: 'absolute',
                left: '5%',
              }}>
              <Pressable
                style={commonStyles.secondaryButton}
                onPress={() => {}}>
                <Text style={commonStyles.secondaryButtonText}>
                  Import Using Seed Phrase
                </Text>
              </Pressable>
              <View style={{height: 15}}></View>
              <Pressable style={commonStyles.primaryButton} onPress={() => {}}>
                <Text style={commonStyles.primaryButtonText}>
                  Create a New Wallet
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ThroughScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome, {SolidIcons} from 'react-native-fontawesome';
import {fonts, colors} from '../../../../styles';
import {TabView, SceneMap} from 'react-native-tab-view';
import {useColorModeValue} from 'native-base';
import {PrimaryButton} from '../../../../components/Buttons';
import FloatLabelInput from '../../../../components/FloatLabelInput';

//actions

const NetworkFeeRBSheet = ({onSave}) => {
  const [curTabIndex, setCurTabIndex] = useState(0);
  const [tabRoutes] = useState([
    {
      key: 'first',
      title: 'Basic',
    },
    {
      key: 'second',
      title: 'Advanced',
    },
  ]);

  const [gasLimit, setGasLimit] = useState('21000');
  const [gasPrice, setGasPrice] = useState('');

  const BasicRoute = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.grey9,
            borderRadius: 8,
            marginTop: 24,
          }}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.grey9,
              padding: 16,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '35%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>Slow</Text>
              </View>
              <View style={{width: '65%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>0.08</Text>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  $ 19.23
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.grey9,
              padding: 16,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '35%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>Average</Text>
              </View>
              <View style={{width: '65%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>0.08</Text>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  $ 19.23
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: 16,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '35%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>Fast</Text>
              </View>
              <View style={{width: '65%'}}>
                <Text style={{...fonts.title2, color: 'white'}}>0.08</Text>
                <Text
                  style={{
                    ...fonts.caption_small12_18_regular,
                    color: colors.grey9,
                  }}>
                  $ 19.23
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 24}}>
          <Text style={{...fonts.para_regular, color: colors.grey9}}>
            The network fee covers the cost of processing your transaction on
            the Ethereum network.
          </Text>
        </View>
      </View>
    );
  };

  const AdvancedRoute = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 24}}>
          <View>
            <Text style={{...fonts.title2, color: 'white'}}>Total</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
            }}>
            <Text
              style={{
                ...fonts.title2,
                color: 'white',
              }}>
              0.0001241 ETH
            </Text>
          </View>
        </View>
        <View style={{marginTop: 16}}>
          <FloatLabelInput
            value={gasLimit}
            label="Gas Limit"
            onChangeText={value => setGasLimit(value)}
          />
        </View>
        <View style={{marginTop: 16}}>
          <FloatLabelInput
            value={gasPrice}
            label="Gas Price:(GWEI)"
            onChangeText={value => setGasPrice(value)}
          />
        </View>
      </View>
    );
  };

  const initialLayout = {
    width: Dimensions.get('window').width,
  };
  const renderScene = SceneMap({
    first: BasicRoute,
    second: AdvancedRoute,
  });

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={{flexDirection: 'row'}}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });
          const color =
            curTabIndex === i
              ? useColorModeValue('white', colors.grey12)
              : useColorModeValue(colors.grey12, colors.grey12);

          return (
            <View
              key={'networkfeerbsheet' + i}
              style={{
                marginHorizontal: 24,
                borderBottomWidth: curTabIndex === i ? 3 : 0,
                borderColor: 'white',
                flex: 1,
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setCurTabIndex(i);
                }}>
                <Animated.Text
                  style={{
                    color,
                  }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <>
      <View style={{marginTop: 12}}>
        <Text style={{textAlign: 'center', color: 'white', ...fonts.title2}}>
          Edit Network Fee
        </Text>
      </View>
      <TabView
        style={{marginTop: 40, marginHorizontal: 24, marginBottom: '10%'}}
        navigationState={{index: curTabIndex, routes: tabRoutes}}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setCurTabIndex}
        initialLayout={initialLayout}
      />
      <View style={{padding: 24, marginBottom: 20}}>
        <PrimaryButton onPress={() => {}} text="Save" />
      </View>
    </>
  );
};

export default NetworkFeeRBSheet;

import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import {
  Block,
  Button,
  Icon,
  Text,
  theme,
} from 'galio-framework';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';
import HTMLView from 'react-native-htmlview';
import { Dropdown } from 'react-native-material-dropdown';
import { colors, commonStyles } from '../styles';

import {
  CallClassFunction,
  CallController,
} from '../redux/actions';
import { TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { hostname } from '../constant';

const { width, height } = Dimensions.get('screen');

class CharterJoinScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      makePaymenting: false,
      totalZbucks: 0,
      actualTotalZbucks: 0,
      isDepositModal: false,
      ProductDatas: []
    }
  }

  componentDidMount = () => {
    this.props.fetchTotalZbucks(
      'Account',
      'totalZbucks',
      [],
      (totalZbucks) => this.setState({ totalZbucks }),
      (msg) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    this.props.fetchActualTotalZbucks(
      'Account',
      'actualTotalZbucks',
      [],
      (actualTotalZbucks) => this.setState({ actualTotalZbucks }),
      (msg) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    this.props.fetchAllCategoryProducts(
      'Products',
      'allCategoryProducts',
      [9],
      (zbuck_pack_ids) => {
        if (zbuck_pack_ids)
          zbuck_pack_ids.map(id =>
            this.props.fetchProductData(
              '/Chatter/App/fetchProduct.php',
              { id },
              (ProductData) => this.setState({
                ProductDatas: [...this.state.ProductDatas,
                {
                  value: ProductData.id,
                  label: ProductData.cost_term_text,
                }
                ]
              }),
              (msg) => {
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error',
                  text2: msg + ' 😥'
                });
              },
              true
            )
          );
      },
      (msg) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'Congratulations',
      text2: "You're Becoming An Official Zortt Charter Member! 🎊"
    });
  }

  getToday = () => {
    let today = new Date();
    return today.toDateString();
  }

  makePayment = () => {
    const { CharterProductData } = this.props.route.params;
    this.setState({ makePaymenting: true });
    this.props.makePayment(
      '/Charter/pay_new_membership_zbucks.php',
      { id: CharterProductData.id },
      (data) => {
        this.setState({ makePaymenting: false });
      },
      (msg) => {
        this.setState({ makePaymenting: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  render = () => {
    const { currentUser } = this.props;
    const { CharterProductData } = this.props.route.params;
    const { totalZbucks, actualTotalZbucks, makePaymenting, ProductDatas, isDepositModal } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Block style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              <Block center>
                <Text bold size={28} color={colors.primary}>Become A Charter Member</Text>
              </Block>
              <Block row style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon name='clockcircleo' family='AntDesign' size={16} color={colors.primary} />
                <Text italic size={16} color={colors.primary}> Starting Today!</Text>
                <Text italic size={16} color={colors.primary}> {this.getToday()}</Text>
              </Block>
              <Block style={commonStyles.divider} />
              <Block row style={{ alignItems: 'center' }}>
                <Icon name='message1' family='AntDesign' size={22} color={colors.primary} />
                <Text bold size={22} color={colors.purple}> {currentUser.acc_name}</Text>
                <Text size={16} color={colors.primary}> Is Becoming An Official Zortt Charter Member!</Text>
              </Block>
              <Block style={commonStyles.divider} />
              <Block style={[commonStyles.card, commonStyles.shadow, { backgroundColor: colors.background }]}>
                <Block style={styles.cardTitle}>
                  <Text bold size={22} color={colors.white}>Who Are We?</Text>
                </Block>
                <Block style={styles.cardBody}>
                  <Text italic size={18} color={colors.white}>Contact us via Zmail or even stamp some snail-mail! Zortt is here to help you!</Text>
                  <Block style={commonStyles.divider} />
                  <Block row style={{ alignItems: 'center' }}>
                    <Icon name='user' family='AntDesign' size={20} color={colors.white} />
                    <Text size={20} color={colors.white}> Zortt LLC.</Text>
                  </Block>
                  <Block row style={{ alignItems: 'center' }}>
                    <Icon name='home' family='AntDesign' size={20} color={colors.white} />
                    <Text size={20} color={colors.white}> 8 The Green, STE A, Dover, DE</Text>
                  </Block>
                  <Block row style={{ alignItems: 'center' }}>
                    <Icon name='mail' family='AntDesign' size={20} color={colors.white} />
                    <Text size={20} color={colors.white}> hello@Zortt.com</Text>
                  </Block>
                </Block>
              </Block>
              <Block style={commonStyles.divider} />
              <Block style={{ marginHorizontal: 50 }}>
                <Block row space='between' style={{ alignItems: 'center' }}>
                  <Text size={20} color={colors.primary}>Membership</Text>
                  <Text bold size={24} color={colors.purple}>{CharterProductData.product_name}</Text>
                </Block>
                <Block row space='between' style={{ alignItems: 'center' }}>
                  <Text size={20} color={colors.primary}>Price</Text>
                  <Text bold size={24} color={colors.purple}>$ {CharterProductData.cost_per_term}</Text>
                </Block>
              </Block>
              <Block style={commonStyles.divider} />
              <HTMLView
                style={{ padding: 10 }}
                value={CharterProductData.product_desc}
              />
              <Block style={commonStyles.divider} />
              <Block row space='between' style={{ alignItems: 'center' }}>
                <Block row space='between' style={{ alignItems: 'center' }}>
                  <Text bold size={18} color={colors.primaryLight}>Tax: </Text>
                  <Text bold size={22} color={colors.purple}>0%</Text>
                </Block>
                <Block row space='between' style={{ alignItems: 'center' }}>
                  <Text bold size={18} color={colors.primaryLight}>Total Cost: </Text>
                  <Text bold size={22} color={colors.purple}> $ {CharterProductData.cost_per_term}</Text>
                </Block>
              </Block>
              <Block style={commonStyles.divider} />
              <Block style={[commonStyles.card, { backgroundColor: colors.background }]}>
                <Block style={styles.cardTitle} row>
                  <Text size={20} color={colors.white}>Your Balance </Text>
                  <Text bold size={22} color={colors.gold}> {totalZbucks}</Text>
                  <Text size={20} color={colors.white}> Zbucks</Text>
                </Block>
                <Block row space='between'>
                  <Button
                    color={colors.green}
                    icon='dollar' iconFamily='Font-Awesome' iconSize={18}
                    textStyle={{ fontSize: 18 }}
                    onPress={this.makePayment}
                    loading={makePaymenting}
                  > Make Payment</Button>
                  {actualTotalZbucks < CharterProductData.cost_per_term && <Button
                    color={colors.purple}
                    icon='checkcircleo' iconFamily='AntDesign' iconSize={18}
                    textStyle={{ fontSize: 18 }}
                    onPress={() => this.setState({ isDepositModal: true })}
                  > Purchase Zbucks</Button>}
                  {actualTotalZbucks >= CharterProductData.cost_per_term && <Button
                    color={colors.green}
                    icon='checkcircleo' iconFamily='AntDesign' iconSize={18}
                    textStyle={{ fontSize: 18 }}
                    onPress={() => alert('zwallet.php is comming soon')}
                  > View Your ZWallet</Button>}
                </Block>
              </Block>
            </ScrollView>
          </Block>
          <Modal
            isVisible={isDepositModal}
            onBackdropPress={() => this.setState({ isDepositModal: false })}>
            <Block center style={styles.modalContent}>
              <Text h3 color={colors.primary}>Deposit Funds</Text>
              <Block style={commonStyles.divider} />
              <Text h5 color={colors.primary}>Your Zbucks</Text>
              <Text h5 color={colors.green}>Sell, Spend, & Save</Text>
              <Text h6 color={colors.primary}>You can do more with Zbucks!</Text>
              <Text size={18} color={colors.primary} style={{ flexShrink: 1 }}>*Depositing Zbucks into your account must comply with our
                <Text size={18} color={colors.blue} style={{ flexShrink: 1 }} onPress={() => Linking.openURL(hostname + '/tos')}> Terms of Service. </Text>
                <Text size={18} color={colors.primary} style={{ flexShrink: 1 }}>Zortt strongly suggests your view our terms and conditions referencing Zbuck deposits, and wallet funds.</Text>
              </Text>

              <Dropdown
                label="Deposit Funds"
                textColor={colors.primary}
                labelFontSize={16}
                fontSize={18}
                dropdownPosition={0}
                // pickerStyle={{ backgroundColor: colors.primaryLight, borderRadius: 10, height: 300 }}
                containerStyle={{ width: width * 0.7 }}
                data={ProductDatas}
                onChangeText={(value) => alert(`pay.php is comming with [products=${value}]`)}
              />
            </Block>
          </Modal>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchDeluxeZcardProduct: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    activeCategoryProducts: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchTotalZbucks: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    makePayment: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    fetchActualTotalZbucks: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchAllCategoryProducts: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchProductData: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharterJoinScreen);

const tagStyles = StyleSheet.create({
  p: {
    fontSize: 18,
    color: colors.primary
  },
  li: {
    fontSize: 18,
    color: colors.primary
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    width,
    height,
    padding: 10
  },
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    backgroundColor: colors.yellow,
    margin: 10
  },
  cardTitle: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardBody: {
    padding: 10,
    backgroundColor: colors.primaryLight
  },
  modalContent: {
    backgroundColor: 'white',
    padding: theme.SIZES.BASE * 2,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    maxHeight: height * 0.7
  },
});

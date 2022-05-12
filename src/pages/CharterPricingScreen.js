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
  Text,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import HTMLView from 'react-native-htmlview';
import { colors, commonStyles } from '../styles';

import {
  CallClassFunction,
  CallController,
} from '../redux/actions';

const { width, height } = Dimensions.get('screen');

class CharterPricingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      DeluxeZcardProduct: null,
      charter_product_datas: [],
    }
  }

  componentDidMount = () => {
    this.initData();
  }

  initData = () => {
    this.props.fetchDeluxeZcardProduct(
      '/Chatter/App/fetchProduct.php',
      { id: 93 },
      (DeluxeZcardProduct) => {
        this.setState({ DeluxeZcardProduct });
      },
      (msg) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      },
      true
    );

    this.props.activeCategoryProducts(
      'Products',
      'activeCategoryProducts',
      [10],
      (charter_product_ids) => {
        if (charter_product_ids)
          charter_product_ids.map(id => {
            this.props.fetchDeluxeZcardProduct(
              '/Chatter/App/fetchProduct.php',
              { id: id },
              (product) => {
                this.setState({ charter_product_datas: [...this.state.charter_product_datas, product] });
              },
              (msg) => {
                Toast.show({
                  type: 'error',
                  position: 'top',
                  text1: 'Error',
                  text2: msg + ' 😥'
                });
              },
              true
            );
          });

        this.setState({ loading: false });
      },
      (msg) => {
        this.setState({ loading: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  renderDeluxeZcardProduct = () => {
    const { DeluxeZcardProduct } = this.state;

    if (DeluxeZcardProduct && DeluxeZcardProduct.valid)
      return <Block style={[commonStyles.card, commonStyles.shadow, { width: width - 20, backgroundColor: colors.background }]}>
        <Block style={styles.cardTitle}>
          <Text bold size={22} color={colors.primary}>{DeluxeZcardProduct.product_name}</Text>
          <Text size={20} color={colors.primary}>{DeluxeZcardProduct.cost_term_text}</Text>
        </Block>
        <Block center style={{ padding: 10 }}>
          <HTMLView
            value={DeluxeZcardProduct.product_desc}
            stylesheet={tagStyles}
          />
          <Button
            color={colors.primary}
            icon='checkcircleo' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
            onPress={() => alert('mobile stripe is comming soon')}
          > Get Started</Button>
        </Block>
      </Block>
  }
  renderCharterProducts = () => {
    const { charter_product_datas } = this.state;

    if (charter_product_datas.length)
      return charter_product_datas.map(charter_product_data =>
        <Block style={[commonStyles.card, commonStyles.shadow, { width: width - 20, backgroundColor: colors.background }]} key={charter_product_data.id}>
          <Block style={styles.cardTitle}>
            <Text bold size={22} color={colors.primary}>{charter_product_data.product_name}</Text>
            <Text size={20} color={colors.primary}>{charter_product_data.cost_term_text}</Text>
          </Block>
          <Block center style={{ padding: 10 }}>
            <HTMLView
              value={charter_product_data.product_desc}
              stylesheet={tagStyles}
            />
            <Button
              color={colors.primary}
              icon='checkcircleo' iconFamily='AntDesign' iconSize={18}
              textStyle={{ fontSize: 18 }}
              onPress={() => this.props.navigation.navigate('CharterJoin', {CharterProductData: charter_product_data})}
            >{charter_product_data.buy_text}</Button>
          </Block>
        </Block>
      );
  }

  render = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              <Block center>
                <Text bold size={28} color={colors.primary}>Become A Charter Member</Text>
                <Text size={18} color={colors.primary}>Join our virtual B2B Zcommerce network.</Text>
                <Button
                  color={colors.green}
                  icon='playcircleo' iconFamily='AntDesign' iconSize={18}
                  textStyle={{ fontSize: 18 }}
                  onPress={() => this.props.navigation.navigate('CharterPricing')}
                > Watch Video</Button>
                {this.renderDeluxeZcardProduct()}
                {this.renderCharterProducts()}
              </Block>
            </ScrollView>
          </Block>
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
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharterPricingScreen);

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
    backgroundColor: colors.gold,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center'
  }
});

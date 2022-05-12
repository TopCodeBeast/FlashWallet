import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  TextInput
} from 'react-native';

import {
  Block,
  Button,
  Text,
  Icon,
  Input,
  theme,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../styles';

import {
  CallClassFunction,
  CallController,
  CallZCardClassFunction,
} from '../../redux/actions';

import { hostname } from '../constant';

const { width, height } = Dimensions.get('screen');
const icon_templates = [
  { value: 'far fa-id-card', label: 'Zcard' },
  { value: 'fab fa-facebook-f', label: 'Facebook' },
  { value: 'fab fa-twitter', label: 'Twitter' },
  { value: 'fab fa-instagram', label: 'Instagram' },
  { value: 'fab fa-snapchat-ghost', label: 'Snapchat' },
  { value: 'far fa-file-pdf', label: 'PDF' },
  { value: 'fas fa-table', label: 'Spreadsheet' },
  { value: 'fab fa-linkedin', label: 'LinkedIn' },
  { value: 'fas fa-globe-americas', label: 'Globe' },
  { value: 'fas fa-comments', label: 'message icon' },
  { value: 'fas fa-basketball-ball', label: 'basketball icon' },
  { value: 'fab fa-youtube', label: 'YouTube' },
  { value: 'fas fa-paper-plane', label: 'Paper Plane' },
  { value: 'fab fa-paypal', label: 'Paypal' },
  { value: 'fab fa-playstation', label: 'Playstation' },
  { value: 'fab fa-xbox', label: 'Xbox Icon' },
];

class CustomURLSScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      orderData: [],
      saving: false,
      removing: false,
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;

    for (let i = 1; i < 5; i++) {
      this.props.getIconData(
        selectedZCard.id,
        'getIconData',
        [i],
        (orderData) => {
          if (orderData == null) {
            orderData = ['', '', ''];
          }
          this.setState({ orderData: [...this.state.orderData, orderData] });
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
    }
  }

  saveIcons = () => {
    const { selectedZCard } = this.props;
    const { orderData } = this.state;
    this.setState({ saving: true });

    let icons = [];
    for (let i = 0; i < 4; i++) {
      const element = orderData[i];
      icons.push({
        selected_icon: element[0],
        name: element[1],
        icon_label: element[2]
      });
    };
    console.info(icons)
    this.props.update_icons(
      `edit-zcard/update_icons.php?zcard_id=${selectedZCard.id}`,
      {
        icons: JSON.stringify(icons)
      },
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: msg + ' 🎊'
        });
      },
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    )
  }

  removeIcons = () => {
    const { selectedZCard } = this.props;
    this.setState({ removing: true });
    this.props.remove_all_icons(
      '/edit-zcard/remove_all_icons.php',
      {
        zcard_id: selectedZCard.id
      },
      (msg) => {
        this.setState({ removing: false });
        let orderData = [];
        for (let i = 0; i < 4; i++) {
          const element = ['', '', ''];
          orderData.push(element);
        }
        this.setState({ orderData });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: msg + ' 🎊'
        });
      },
      (msg) => {
        this.setState({ removing: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );
  }

  setIconState = (idx, value) => {
    let { orderData } = this.state;
    orderData[idx][0] = value;
    this.setState({ orderData });
  }

  setURLState = (idx, value) => {
    let { orderData } = this.state;
    orderData[idx][1] = value;
    this.setState({ orderData });
  }
  setLabelState = (idx, value) => {
    let { orderData } = this.state;
    orderData[idx][2] = value;
    this.setState({ orderData });
  }

  renderData = () => {
    const { orderData } = this.state;
    if (orderData.length)
      return orderData.map((data, idx) =>
        <Collapse
          style={{ margin: 10 }}
        >
          <CollapseHeader>
            <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
              <Text size={18} bold color={colors.white}>#{idx + 1} - {data[2]}</Text>
            </Block>
          </CollapseHeader>
          <CollapseBody
            style={[commonStyles.shadow, commonStyles.collapseBody]}
          >
            <Dropdown
              label="Icon"
              value={data[0] == '' ? 'Select One' : icon_templates.filter(icon => icon.value == data[0])[0].label}
              textColor={colors.primary}
              labelFontSize={16}
              fontSize={18}
              dropdownPosition={0}
              pickerStyle={{ borderRadius: 10, height: 300 }}
              containerStyle={{ width: width - 40 }}
              data={icon_templates}
              onChangeText={(value) => this.setIconState(idx, value)}
            />
            <Text
              style={[styles.label, { color: colors.grey }]}
              size={16}>URL</Text>
            <Input
              value={data[1]}
              style={styles.inputBox} color={colors.primary} fontSize={18}
              icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
              onChangeText={(value) => this.setURLState(idx, value)}
            />
            <Text
              style={[styles.label, { color: colors.grey }]}
              size={16}>Label</Text>
            <Input
              value={data[2]}
              style={styles.inputBox} color={colors.primary} fontSize={18}
              icon='tag' family='AntDesign' iconSize={18} iconColor={colors.primary}
              onChangeText={(value) => this.setLabelState(idx, value)}
            />
          </CollapseBody>
        </Collapse>
      )
  }

  render = () => {
    const { saving, removing } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              {this.renderData()}
            </ScrollView>
            <Block center row>
              <Button
                color={colors.green}
                icon='save' iconFamily='AntDesign' iconSize={18}
                textStyle={{ fontSize: 18 }}
                loading={saving}
                onPress={this.saveIcons}
              > Save Icons</Button>
              <Button
                color={colors.pink}
                icon='close' iconFamily='AntDesign' iconSize={18}
                textStyle={{ fontSize: 18 }}
                onPress={this.removeIcons}
                loading={removing}
              > Remove All</Button>
            </Block>
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
    selectedZCard: state.selectedZCard,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getIconData: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    getAvailableIconsSelectOptions: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    remove_all_icons: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    update_icons: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    listPartnerProfilesByAccount: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomURLSScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    width,
    height,
  },
  label: {
    paddingTop: 10,
    alignSelf: 'flex-start',
  },
  inputBox: {
    borderColor: colors.primaryLight,
    borderRadius: 8,
    // width: width * 0.7,
    alignItems: 'center',
    fontSize: 18,
    paddingLeft: 8
  },
});

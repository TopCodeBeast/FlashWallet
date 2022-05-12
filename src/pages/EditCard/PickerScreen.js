import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import {
  Block,
  theme,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import { ColorPicker } from 'react-native-color-picker'
const { height } = Dimensions.get('screen');

class PickerScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      backColor: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      backColor: this.invertColor('#FFFFFF')
    })
  }

  invertColor = (hex) => {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  padZero = (str, len) => {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  setColor = (value) => {
    if (this.props.route.params && this.props.route.params.pickColor) {
      // for LabelsScreen
      this.props.route.params.pickColor(value);
      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1, height: height }}>
          <AwesomeLoading indicatorId={19} size={80} isActive={this.state.loading} />
          <Block style={[styles.container, { backgroundColor: this.state.backColor }]}>
            <ColorPicker
              onColorSelected={color => this.setColor(color)}
              style={{ flex: 1 }}
            />
          </Block>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE,
  },
});

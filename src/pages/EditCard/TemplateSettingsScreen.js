import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Block,
  Button,
  Text,
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../styles';
import { Dropdown } from 'react-native-material-dropdown';

import {
  CallZCardClassFunction,
  CallController,
} from '../../redux/actions';

const { width, height } = Dimensions.get('screen');

class TemplateSettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      zcard_templates: [],
      save: false,
      selectedTemplateID: null,
      selectedTemplateLabel: 'No Template'
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;
    
    if (selectedZCard)
      this.props.fetchZCardTemplates(
        selectedZCard.id,
        'fetch_zcard_templates',
        [],
        (templates) => {
          if (templates)
            templates.map(template => {
              if (selectedZCard.use_template_id == template.id)
                this.setState({
                  selectedTemplateID: template.id,
                  selectedTemplateLabel: template.zc_name,
                });
              this.setState({
                zcard_templates: [...this.state.zcard_templates,
                {
                  id: template.id,
                  value: template.id,
                  label: template.zc_name
                }
                ]
              })
            })
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
      )
  }

  save = () => {
    const { selectedZCard } = this.props;
    const { selectedTemplateID } = this.state;
    if (selectedTemplateID) {
      this.setState({ saving: true });
      this.props.save_use_template_id(
        '/edit-zcard/save_use_template_id.php',
        {
          zcard_id: selectedZCard.id,
          template_id: selectedTemplateID
        },
        (msg) => {
          this.setState({ saving: false });
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Success',
            text2: msg + ' 🎉'
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
      );
    }
  }

  render = () => {
    const { zcard_templates, saving, selectedTemplateLabel } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block center style={styles.container}>
            <Block style={[commonStyles.card, commonStyles.shadow, { backgroundColor: colors.primaryLight, padding: 10 }]}>
              <Text size={18} color={colors.white}>If you use a template, you will not be able to modify any information or add custom Zmodules.</Text>
            </Block>
            <Dropdown
              label="Card Template"
              value={selectedTemplateLabel}
              textColor={colors.primary}
              labelFontSize={16}
              fontSize={18}
              dropdownPosition={0}
              pickerStyle={{ borderRadius: 10, height: 300 }}
              containerStyle={{ width: width * 0.7 }}
              data={zcard_templates}
              onChangeText={(selectedTemplateID) => this.setState({ selectedTemplateID })}
            />
            <Button
              color={colors.green}
              icon='save' iconFamily='AntDesign' iconSize={18}
              textStyle={{ fontSize: 18 }}
              loading={saving}
              size='large'
              onPress={() => this.save()}
            > Save Template Setting</Button>
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
    fetchZCardTemplates: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    save_use_template_id: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateSettingsScreen);

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
  cardline: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.darkGray,
    marginTop: 5
  },
});

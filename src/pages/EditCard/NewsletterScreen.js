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
  Input
} from 'galio-framework';
import AwesomeLoading from 'react-native-awesome-loading';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../styles';

import {
  CallZCardClassFunction,
  CallController,
  SetSelectedZCard,
} from '../../redux/actions';

const { width, height } = Dimensions.get('screen');

class NewsletterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      save: false,
      subscribers: 0,
      messagesCount: 0,
      totalMessagesCount: 0,
      newsletter_section_text: '',
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;

    this.setState({
      newsletter_section_text: selectedZCard.newsletter_section_text == null ? 'Push notifications' : selectedZCard.newsletter_section_text
    });

    this.props.getSubscribers(
      selectedZCard.id,
      'getSubscribers',
      [],
      (subscribers) => {
        if (!subscribers)
          this.setState({ subscribers: 0 });
        else
          this.setState({ subscribers: subscribers.length });
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
    this.props.getMessageCount(
      selectedZCard.id,
      'getMessageCount',
      [],
      (messagesCount) => this.setState({ messagesCount }),
      (msg) => {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😥'
        });
      }
    );

    this.props.getTotalMessageCount(
      selectedZCard.id,
      'getTotalMessageCount',
      [],
      (totalMessagesCount) => {
        if (!totalMessagesCount)
          this.setState({ totalMessagesCount: 0 });
        else
          this.setState({ totalMessagesCount: totalMessagesCount.length });
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

  save = () => {
    const { selectedZCard } = this.props;
    const { newsletter_section_text } = this.state;
    this.setState({ saving: true });
    this.props.update_newsletter_section(
      `/Zcard/update_newsletter_section.php?zcard_id=${selectedZCard.id}`,
      {
        title: newsletter_section_text
      },
      (msg) => {
        let updatedZCard = selectedZCard;
        updatedZCard.newsletter_section_text = newsletter_section_text;
        this.props.setSelectedZCard(updatedZCard);
        this.setState({ saving: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Successfully updated 🎊'
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

  render = () => {
    const { saving, subscribers, messagesCount, totalMessagesCount, newsletter_section_text } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block center style={styles.container}>
            <Block row style={{ alignItems: 'center' }}>
              <Text color={colors.primaryLight}>You have </Text>
              <Text bold size={18} color={colors.primary}>{subscribers}</Text>
              <Text color={colors.primaryLight}> Subscribers to your push notifications.</Text>
            </Block>
            <Block row style={{ alignItems: 'center' }}>
              <Text color={colors.primaryLight}>You have currently sent </Text>
              <Text bold size={18} color={colors.primary}>{messagesCount} messages | {totalMessagesCount}</Text>
            </Block>
            <Block style={{ margin: 10 }}>
              <Text
                style={[styles.label, { color: colors.grey }]}
                size={16}>Section Title</Text>
              <Input
                value={newsletter_section_text}
                style={styles.inputBox} color={colors.primary} fontSize={18}
                icon='notification' family='AntDesign' iconSize={18} iconColor={colors.primary}
                onChangeText={(newsletter_section_text) => this.setState({newsletter_section_text})}
              />
            </Block>
            <Button
              color={colors.green}
              icon='save' iconFamily='AntDesign' iconSize={18}
              textStyle={{ fontSize: 18 }}
              loading={saving}
              size='large'
              onPress={this.save}
            > Update</Button>
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
    getSubscribers: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    getMessageCount: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    getTotalMessageCount: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    update_newsletter_section: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    setSelectedZCard: (zcard) => SetSelectedZCard(dispatch, zcard),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsletterScreen);

const styles = StyleSheet.create({
  container: {
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
    width: width - 20,
    alignItems: 'center',
    fontSize: 18,
    paddingLeft: 8
  },
});

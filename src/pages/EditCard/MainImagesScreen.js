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
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import { colors, commonStyles } from '../../styles';

import {
  CallClassFunction,
  CallController,
  CallZCardClassFunction,
  SaveTab,
} from '../../redux/actions';

import { hostname } from '../constant';

const { width, height } = Dimensions.get('screen');

class MainImagesScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      saving: false,
      isExpandedFrontPhoto: false,
      isExpandedBackPhoto: false,
      isExpandedLogo: false,
      isExpandedBanner: false,
      frontImage: null,
      backImage: null,
      logoImage: null,
      bannerImage: null,
      changed_frontImage: false,
      changed_backImage: false,
      changed_logoImage: false,
      changed_bannerImage: false,
      frontImageName: '',
      backImageName: '',
      logoImageName: '',
      bannerImageName: '',
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;

    // front image
    this.props.getFriendlyMainPhotoName(
      selectedZCard.id,
      'getFriendlyMainPhotoName',
      ['front_card_photo'],
      (frontName) => {
        this.props.getPhotoByFriendlyID(
          selectedZCard.id,
          'getPhotoByFriendlyID',
          ['front_card_photo'],
          (frontUri) => {
            if (frontName != false && frontUri != false)
              this.setState({
                frontImage:
                {
                  name: frontName,
                  uri: frontUri
                },
                frontImageName: frontName
              });
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

    // back image
    this.props.getFriendlyMainPhotoName(
      selectedZCard.id,
      'getFriendlyMainPhotoName',
      ['back_card_photo'],
      (backName) => {
        this.props.getPhotoByFriendlyID(
          selectedZCard.id,
          'getPhotoByFriendlyID',
          ['back_card_photo'],
          (backUri) => {
            if (backName != false && backUri != false)
              this.setState({
                backImage:
                {
                  name: backName,
                  uri: backUri
                },
                backImageName: backName
              });
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

    // logo image
    this.props.getFriendlyMainPhotoName(
      selectedZCard.id,
      'getFriendlyMainPhotoName',
      ['your_card_photo'],
      (logoName) => {
        this.props.getPhotoByFriendlyID(
          selectedZCard.id,
          'getPhotoByFriendlyID',
          ['your_card_photo'],
          (logoUri) => {
            if (logoName != false && logoUri != false)
              this.setState({
                logoImage:
                {
                  name: logoName,
                  uri: logoUri
                },
                logoImageName: logoName
              });
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

    // banner image
    this.props.getFriendlyMainPhotoName(
      selectedZCard.id,
      'getFriendlyMainPhotoName',
      ['footer_photo'],
      (bannerName) => {
        this.props.getPhotoByFriendlyID(
          selectedZCard.id,
          'getPhotoByFriendlyID',
          ['footer_photo'],
          (bannerUri) => {
            if (bannerName != false && bannerUri != false)
              this.setState({
                bannerImage:
                {
                  name: bannerName,
                  uri: bannerUri
                },
                bannerImageName: bannerName
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

  pick = async (type) => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      switch (type) {
        case 'front':
          this.setState({ frontImage: Array.isArray(res) ? res[0] : res, frontImageName: Array.isArray(res) ? res[0].name : res.name, changed_frontImage: true });
          break;
        case 'back':
          this.setState({ backImage: Array.isArray(res) ? res[0] : res, backImageName: Array.isArray(res) ? res[0].name : res.name, changed_backImage: true });
          break;
        case 'logo':
          this.setState({ logoImage: Array.isArray(res) ? res[0] : res, logoImageName: Array.isArray(res) ? res[0].name : res.name, changed_logoImage: true });
          break;
        case 'banner':
          this.setState({ bannerImage: Array.isArray(res) ? res[0] : res, bannerImageName: Array.isArray(res) ? res[0].name : res.name, changed_bannerImage: true });
          break;

        default:
          break;
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert('Canceled');
      } else {
        console.warn('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  save = () => {
    const { selectedZCard } = this.props;
    const {
      frontImage,
      backImage,
      logoImage,
      bannerImage,
      changed_frontImage,
      changed_backImage,
      changed_logoImage,
      changed_bannerImage,
      frontImageName,
      backImageName,
      logoImageName,
      bannerImageName,
    } = this.state;
    if (!changed_frontImage && !changed_backImage && !changed_logoImage && !changed_bannerImage) return;
    this.setState({ saving: true });


    const data = new FormData();
    if (changed_frontImage) {
      data.append('front_card_photo', frontImage);
      data.append('front_card_photo_name', frontImageName);
    }
    if (changed_backImage) {
      data.append('back_card_photo', backImage);
      data.append('back_card_photo_name', backImageName);
    }
    if (changed_logoImage) {
      data.append('your_card_photo', logoImage);
      data.append('your_card_photo_name', logoImageName);
    }
    if (changed_bannerImage) {
      data.append('footer_photo', bannerImage);
      data.append('footer_photo_name', bannerImageName);
    }

    this.props.saveTab(
      `/edit-zcard/update_main_photos.php?zcard_id=${selectedZCard.id}`,
      data,
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: msg + ' 👋'
        });
      },
      (msg) => {
        this.setState({ saving: false });
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: msg + ' 😒'
        });
      }
    )
  }

  renderFrontPhoto = () => {
    const { isExpandedFrontPhoto, frontImage, frontImageName } = this.state;
    return <Collapse
      isExpanded={isExpandedFrontPhoto}
      onToggle={(isExpandedFrontPhoto) => this.setState({ isExpandedFrontPhoto })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Front Card Photo</Text>
          {isExpandedFrontPhoto && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedFrontPhoto && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          editable={false}
          value={frontImageName}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
          onChangeText={(frontImageName) => this.setState({ frontImageName })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          editable={false}
          value={frontImage != null ? frontImage.uri : ''}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This image is going to be your main header image. you need to ensure that the image is rectangle, and NOT square. If it's a square image it will NOT work here. The image here should have a maximum height of 220px.</Text>
        {frontImage != null && <Image
          style={styles.image}
          source={{ uri: frontImage.uri }}
        />}
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
            onPress={() => this.pick('front')}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
  }

  renderBackPhoto = () => {
    const { isExpandedBackPhoto, backImage, backImageName } = this.state;
    return <Collapse
      isExpanded={isExpandedBackPhoto}
      onToggle={(isExpandedBackPhoto) => this.setState({ isExpandedBackPhoto })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Back Card Photo</Text>
          {isExpandedBackPhoto && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedBackPhoto && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          editable={false}
          value={backImageName}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
          onChangeText={(backImageName) => this.setState({ backImageName })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          editable={false}
          value={backImage != null ? backImage.uri : ''}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This image displays just below your main image. Unless you have an image that flows nicely with your main image ( and is also a rectangle ), we would suggest you not utilize this field.</Text>
        {backImage != null && <Image
          style={styles.image}
          source={{ uri: backImage.uri }}
        />}
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
            onPress={() => this.pick('back')}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
  }

  renderLogo = () => {
    const { isExpandedLogo, logoImage, logoImageName } = this.state;
    return <Collapse
      isExpanded={isExpandedLogo}
      onToggle={(isExpandedLogo) => this.setState({ isExpandedLogo })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Your logo / Favicon</Text>
          {isExpandedLogo && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedLogo && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          editable={false}
          value={logoImageName}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
          onChangeText={(logoImageName) => this.setState({ logoImageName })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          editable={false}
          value={logoImage != null ? logoImage.uri : ''}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This is used to display your icon in the browser when someone visits your page, it"s also the icon they will see when they save your card to their phone, or desktop.</Text>
        {logoImage != null && <Image
          style={styles.image}
          source={{ uri: logoImage.uri }}
        />}
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
            onPress={() => this.pick('logo')}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
  }

  renderBanner = () => {
    const { isExpandedBanner, bannerImage, bannerImageName } = this.state;
    return <Collapse
      isExpanded={isExpandedBanner}
      onToggle={(isExpandedBanner) => this.setState({ isExpandedBanner })}
      style={{ margin: 10 }}
    >
      <CollapseHeader>
        <Block row space='between' style={[commonStyles.collapseTitle, commonStyles.shadow]}>
          <Text size={18} bold color={colors.white}>Footer Banner</Text>
          {isExpandedBanner && <Icon name='down' family='AntDesign' size={18} color={colors.white} />}
          {!isExpandedBanner && <Icon name='left' family='AntDesign' size={18} color={colors.white} />}
        </Block>
      </CollapseHeader>
      <CollapseBody
        style={[commonStyles.shadow, commonStyles.collapseBody]}
      >
        <Input
          editable={false}
          value={bannerImage != null ? bannerImage.name : ''}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='picture' family='AntDesign' iconSize={18} iconColor={colors.primary}
          onChangeText={(bannerImageName) => this.setState({ bannerImageName })}
        />
        <Text
          style={[styles.label, { color: colors.grey }]}
          size={16}>Image URL</Text>
        <Input
          editable={false}
          value={bannerImage != null ? bannerImage.uri : ''}
          style={styles.inputBox} color={colors.primary} fontSize={18}
          icon='earth' family='AntDesign' iconSize={18} iconColor={colors.primary}
        />
        <Text
          style={[styles.label, { color: colors.grey }]} italic
          size={14}>This appears at the bottom of your card ( the very bottom ), and also needs to be a rectangle. It will be shown as a leaderboard ad across the bottom of your card below the last tab on your card.</Text>
        {bannerImage != null && <Image
          style={styles.image}
          source={{ uri: bannerImage.uri }}
        />}
        <Block center>
          <Button
            color={colors.blue}
            icon='folderopen' iconFamily='AntDesign' iconSize={18}
            textStyle={{ fontSize: 18 }}
            onPress={() => this.pick('banner')}
          > Choose File</Button>
        </Block>
      </CollapseBody>
    </Collapse>
  }

  render = () => {
    const { saving } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              {this.renderFrontPhoto()}
              {this.renderBackPhoto()}
              {this.renderLogo()}
              {this.renderBanner()}
            </ScrollView>
            <Block style={commonStyles.divider} />
            <Block center>
              <Button
                color={colors.green}
                icon='save' iconFamily='Entypo' iconSize={18}
                textStyle={{ fontSize: 18 }}
                loading={saving}
                onPress={this.save}
              > Update Tab</Button>
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
    listPartnerProfilesByAccount: (className, funcName, reqArray, successcb, errorcb) => CallClassFunction(className, funcName, reqArray, successcb, errorcb),
    fetchZCardEntry: (className, funcName, reqArray, successcb, errorcb, getData) => CallController(className, funcName, reqArray, successcb, errorcb, getData),
    getFriendlyMainPhotoName: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    getPhotoByFriendlyID: (id, funcName, reqArray, successcb, errorcb) => CallZCardClassFunction(id, funcName, reqArray, successcb, errorcb),
    saveTab: (controller, req, successcb, errorcb) => SaveTab(controller, req, successcb, errorcb),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainImagesScreen);

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
  image: {
    backgroundColor: colors.grey,
    width: width - 40,
    height: width - 40,
    borderRadius: 8
  }
});

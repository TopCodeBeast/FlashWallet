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
import Toast from 'react-native-toast-message';
import ToggleSwitch from 'toggle-switch-react-native';
import TagInput from 'react-native-tags-input';

import { colors, commonStyles } from '../../styles';
import { Dropdown } from 'react-native-material-dropdown';

import {
  CallClassFunction,
  CallController,
  SetSelectedZCard,
  ClearPassword,
} from '../../redux/actions';

import { hostname } from '../constant';

const { width, height } = Dimensions.get('screen');
const cardTypes = [
  { value: 'Personal Card' },
  { value: 'Professional Card' },
  { value: 'Greeting Card' },
  { value: 'Event' },
  { value: 'Invitation' },
  { value: 'Group' },
  { value: 'Resume' },
  { value: 'Photo Gallery' },
  { value: 'Blog' },
  { value: 'Fan group' },
  { value: 'Wiki page' },
  { value: 'Help desk' },
  { value: 'Training manual' },
  { value: 'Presentation' },
  { value: 'Other' },
];
const CardThemes = [
  { value: 'Left' },
  { value: 'Right' },
  { value: 'Top' },
  { value: 'Bottom' },
];
const stateList = [
  { value: 'Alabama' },
  { value: 'Alaska' },
  { value: 'Arizona' },
  { value: 'Arkansas' },
  { value: 'California' },
  { value: 'Colorado' },
  { value: 'Connecticut' },
  { value: 'Delaware' },
  { value: 'District Of Columbia' },
  { value: 'Florida' },
  { value: 'Georgia' },
  { value: 'Hawaii' },
  { value: 'Idaho' },
  { value: 'Illinois' },
  { value: 'Indiana' },
  { value: 'Iowa' },
  { value: 'Kansas' },
  { value: 'Kentucky' },
  { value: 'Louisiana' },
  { value: 'Maine' },
  { value: 'Maryland' },
  { value: 'Massachusetts' },
  { value: 'Michigan' },
  { value: 'Minnesota' },
  { value: 'Mississippi' },
  { value: 'Missouri' },
  { value: 'Montana' },
  { value: 'Nebraska' },
  { value: 'Nevada' },
  { value: 'New Hampshire' },
  { value: 'New Jersey' },
  { value: 'New Mexico' },
  { value: 'New York' },
  { value: 'North Carolina' },
  { value: 'North Dakota' },
  { value: 'Ohio' },
  { value: 'Oklahoma' },
  { value: 'Oregon' },
  { value: 'Pennsylvania' },
  { value: 'Rhode Island' },
  { value: 'South Carolina' },
  { value: 'South Dakota' },
  { value: 'Tennessee' },
  { value: 'Texas' },
  { value: 'Utah' },
  { value: 'Vermont' },
  { value: 'Virginia' },
  { value: 'Washington' },
  { value: 'West Virginia' },
  { value: 'Wisconsin' },
  { value: 'Wyoming' },
];
const countryList = [
  { value: 'Afghanistan' },
  { value: 'Åland Islands' },
  { value: 'Albania' },
  { value: 'Algeria' },
  { value: 'American Samoa' },
  { value: 'Andorra' },
  { value: 'Angola' },
  { value: 'Anguilla' },
  { value: 'Antarctica' },
  { value: 'Antigua and Barbuda' },
  { value: 'Argentina' },
  { value: 'Armenia' },
  { value: 'Aruba' },
  { value: 'Australia' },
  { value: 'Austria' },
  { value: 'Azerbaijan' },
  { value: 'Bahamas' },
  { value: 'Bahrain' },
  { value: 'Bangladesh' },
  { value: 'Barbados' },
  { value: 'Belarus' },
  { value: 'Belgium' },
  { value: 'Belize' },
  { value: 'Benin' },
  { value: 'Bermuda' },
  { value: 'Bhutan' },
  { value: 'Bolivia, Plurinational State of' },
  { value: 'Bonaire, Sint Eustatius and Saba' },
  { value: 'Bosnia and Herzegovina' },
  { value: 'Botswana' },
  { value: 'Bouvet Island' },
  { value: 'Brazil' },
  { value: 'British Indian Ocean Territory' },
  { value: 'Brunei Darussalam' },
  { value: 'Bulgaria' },
  { value: 'Burkina Faso' },
  { value: 'Burundi' },
  { value: 'Cambodia' },
  { value: 'Cameroon' },
  { value: 'Canada' },
  { value: 'Cape Verde' },
  { value: 'Cayman Islands' },
  { value: 'Central African Republic' },
  { value: 'Chad' },
  { value: 'Chile' },
  { value: 'China' },
  { value: 'Christmas Island' },
  { value: 'Cocos (Keeling) Islands' },
  { value: 'Colombia' },
  { value: 'Comoros' },
  { value: 'Congo' },
  { value: 'Congo, the Democratic Republic of the' },
  { value: 'Cook Islands' },
  { value: 'Costa Rica' },
  { value: 'Côte d’Ivoire' },
  { value: 'Croatia' },
  { value: 'Cuba' },
  { value: 'Curaçao' },
  { value: 'Cyprus' },
  { value: 'Czech Republic' },
  { value: 'Denmark' },
  { value: 'Djibouti' },
  { value: 'Dominica' },
  { value: 'Dominican Republic' },
  { value: 'Ecuador' },
  { value: 'Egypt' },
  { value: 'El Salvador' },
  { value: 'Equatorial Guinea' },
  { value: 'Eritrea' },
  { value: 'Estonia' },
  { value: 'Ethiopia' },
  { value: 'Falkland Islands (Malvinas)' },
  { value: 'Faroe Islands' },
  { value: 'Fiji' },
  { value: 'Finland' },
  { value: 'France' },
  { value: 'French Guiana' },
  { value: 'French Polynesia' },
  { value: 'French Southern Territories' },
  { value: 'Gabon' },
  { value: 'Gambia' },
  { value: 'Georgia' },
  { value: 'Germany' },
  { value: 'Ghana' },
  { value: 'Gibraltar' },
  { value: 'Greece' },
  { value: 'Greenland' },
  { value: 'Grenada' },
  { value: 'Guadeloupe' },
  { value: 'Guam' },
  { value: 'Guatemala' },
  { value: 'Guernsey' },
  { value: 'Guinea' },
  { value: 'Guinea-Bissau' },
  { value: 'Guyana' },
  { value: 'Haiti' },
  { value: 'Heard Island and McDonald Islands' },
  { value: 'Holy See (Vatican City State)' },
  { value: 'Honduras' },
  { value: 'Hong Kong' },
  { value: 'Hungary' },
  { value: 'Iceland' },
  { value: 'India' },
  { value: 'Indonesia' },
  { value: 'Iran, Islamic Republic of' },
  { value: 'Iraq' },
  { value: 'Ireland' },
  { value: 'Isle of Man' },
  { value: 'Israel' },
  { value: 'Italy' },
  { value: 'Jamaica' },
  { value: 'Japan' },
  { value: 'Jersey' },
  { value: 'Jordan' },
  { value: 'Kazakhstan' },
  { value: 'Kenya' },
  { value: 'Kiribati' },
  { value: 'Korea, Democratic People’s Republic of' },
  { value: 'Korea, Republic of' },
  { value: 'Kuwait' },
  { value: 'Kyrgyzstan' },
  { value: 'Lao People’s Democratic Republic' },
  { value: 'Latvia' },
  { value: 'Lebanon' },
  { value: 'Lesotho' },
  { value: 'Liberia' },
  { value: 'Libya' },
  { value: 'Liechtenstein' },
  { value: 'Lithuania' },
  { value: 'Luxembourg' },
  { value: 'Macao' },
  { value: 'Macedonia, the former Yugoslav Republic of' },
  { value: 'Madagascar' },
  { value: 'Malawi' },
  { value: 'Malaysia' },
  { value: 'Maldives' },
  { value: 'Mali' },
  { value: 'Malta' },
  { value: 'Marshall Islands' },
  { value: 'Martinique' },
  { value: 'Mauritania' },
  { value: 'Mauritius' },
  { value: 'Mayotte' },
  { value: 'Mexico' },
  { value: 'Micronesia, Federated States of' },
  { value: 'Moldova, Republic of' },
  { value: 'Monaco' },
  { value: 'Mongolia' },
  { value: 'Montenegro' },
  { value: 'Montserrat' },
  { value: 'Morocco' },
  { value: 'Mozambique' },
  { value: 'Myanmar' },
  { value: 'Namibia' },
  { value: 'Nauru' },
  { value: 'Nepal' },
  { value: 'Netherlands' },
  { value: 'New Caledonia' },
  { value: 'New Zealand' },
  { value: 'Nicaragua' },
  { value: 'Niger' },
  { value: 'Nigeria' },
  { value: 'Niue' },
  { value: 'Norfolk Island' },
  { value: 'Northern Mariana Islands' },
  { value: 'Norway' },
  { value: 'Oman' },
  { value: 'Pakistan' },
  { value: 'Palau' },
  { value: 'Palestinian Territory, Occupied' },
  { value: 'Panama' },
  { value: 'Papua New Guinea' },
  { value: 'Paraguay' },
  { value: 'Peru' },
  { value: 'Philippines' },
  { value: 'Pitcairn' },
  { value: 'Poland' },
  { value: 'Portugal' },
  { value: 'Puerto Rico' },
  { value: 'Qatar' },
  { value: 'Réunion' },
  { value: 'Romania' },
  { value: 'Russian Federation' },
  { value: 'Rwanda' },
  { value: 'Saint Barthélemy' },
  { value: 'Saint Helena, Ascension and Tristan da Cunha' },
  { value: 'Saint Kitts and Nevis' },
  { value: 'Saint Lucia' },
  { value: 'Saint Martin (French part)' },
  { value: 'Saint Pierre and Miquelon' },
  { value: 'Saint Vincent and the Grenadines' },
  { value: 'Samoa' },
  { value: 'San Marino' },
  { value: 'Sao Tome and Principe' },
  { value: 'Saudi Arabia' },
  { value: 'Senegal' },
  { value: 'Serbia' },
  { value: 'Seychelles' },
  { value: 'Sierra Leone' },
  { value: 'Singapore' },
  { value: 'Sint Maarten (Dutch part)' },
  { value: 'Slovakia' },
  { value: 'Slovenia' },
  { value: 'Solomon Islands' },
  { value: 'Somalia' },
  { value: 'South Africa' },
  { value: 'South Georgia and the South Sandwich Islands' },
  { value: 'South Sudan' },
  { value: 'Spain' },
  { value: 'Sri Lanka' },
  { value: 'Sudan' },
  { value: 'Suriname' },
  { value: 'Svalbard and Jan Mayen' },
  { value: 'Swaziland' },
  { value: 'Sweden' },
  { value: 'Switzerland' },
  { value: 'Syrian Arab Republic' },
  { value: 'Taiwan, Province of China' },
  { value: 'Tajikistan' },
  { value: 'Tanzania, United Republic of' },
  { value: 'Thailand' },
  { value: 'Timor-Leste' },
  { value: 'Togo' },
  { value: 'Tokelau' },
  { value: 'Tonga' },
  { value: 'Trinidad and Tobago' },
  { value: 'Tunisia' },
  { value: 'Turkey' },
  { value: 'Turkmenistan' },
  { value: 'Turks and Caicos Islands' },
  { value: 'Tuvalu' },
  { value: 'Uganda' },
  { value: 'Ukraine' },
  { value: 'United Arab Emirates' },
  { value: 'United Kingdom' },
  { value: 'United States' },
  { value: 'United States Minor Outlying Islands' },
  { value: 'Uruguay' },
  { value: 'Uzbekistan' },
  { value: 'Vanuatu' },
  { value: 'Venezuela, Bolivarian Republic of' },
  { value: 'Viet Nam' },
  { value: 'Virgin Islands, British' },
  { value: 'Virgin Islands, U.S.' },
  { value: 'Wallis and Futuna' },
  { value: 'Western Sahara' },
  { value: 'Yemen' },
  { value: 'Zambia' },
  { value: 'Zimbabwe' },
];
class CardSettingsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      saving: false,
      zc_card_type: '',
      zc_desc: '',
      tags: {
        tag: '',
        tagsArray: []
      },
      tagsColor: colors.primaryLight,
      tagsText: '#fff',
      social_enabled: true,
      isPassword: false,
      seo_indexing: false,
      enable_icon_banner: false,
      enable_zcard_promo_banner: false,
      force_color: '',
      card_color: '',
      enable_commenting: false,
      section_comments: false,
      enable_notifications: false,
      first_name: '',
      last_name: '',
      zc_email: '',
      zc_phone: '',
      street_address: '',
      town_city: '',
      postal_code: '',
      state_region: '',
      country: '',
      single_address_field: false,
      is_single_address_field: false,
      zcard_password: '',
    }
  }

  componentDidMount = () => {
    const { selectedZCard } = this.props;

    this.setState({
      tags: {
        tag: '',
        tagsArray: selectedZCard.tags.split(',')
      },
      zc_desc: selectedZCard.zc_desc,
      zc_name: selectedZCard.zc_name,
      zc_card_type: selectedZCard.card_type,
      zcard_theme_id: selectedZCard.theme_id,
      social_enabled: selectedZCard.social_enabled == 1,
      isPassword: selectedZCard.password !== null,
      zcard_password: selectedZCard.password,
      seo_indexing: selectedZCard.seo_indexing == 1,
      enable_icon_banner: selectedZCard.enable_icon_banner == 1,
      enable_zcard_promo_banner: selectedZCard.enable_zcard_promo_banner == 1,
      force_font_color: selectedZCard.force_font_color == 1,
      card_font_color: selectedZCard.card_font_color ? selectedZCard.card_font_color : '#FFF',
      force_color: selectedZCard.force_color == 1,
      card_color: selectedZCard.card_color,
      enable_commenting: selectedZCard.enable_commenting == 1,
      section_comments: selectedZCard.section_comments == 1,
      enable_notifications: selectedZCard.enable_notifications == 1,
      first_name: selectedZCard.first_name,
      last_name: selectedZCard.last_name,
      zc_email: selectedZCard.zc_email,
      zc_phone: selectedZCard.zc_phone,
      street_address: selectedZCard.street_address,
      town_city: selectedZCard.town_city,
      postal_code: selectedZCard.postal_code,
      country: selectedZCard.country,
      is_single_address_field: selectedZCard.single_address_field != "",
      single_address_field: selectedZCard.single_address_field != "",
      state_region: selectedZCard.state_region != null ? selectedZCard.state_region : 'Please select a state'
    });
  }

  getThemeLabel = (id) => {
    switch (id) {
      case 1:
        return 'Left';
      case 2:
        return 'Right';
      case 3:
        return 'Top';
      case 4:
        return 'Bottom';
      default:
        break;
    }
  }

  updateTagState = (state) => {
    this.setState({
      tags: state
    })
  };

  useAccount = () => {
    const { currentUser } = this.props;
    this.setState({
      first_name: currentUser.acc_name,
      street_address: currentUser.acc_address,
      town_city: currentUser.acc_city,
      state_region: currentUser.acc_state,
      postal_code: currentUser.acc_zip,
      zc_email: currentUser.acc_email,
      zc_phone: currentUser.acc_phone,
    })
  }

  save = () => {
    const { selectedZCard } = this.props;
    const {
      seo_indexing,
      zc_desc,
      zc_name,
      zc_card_type,
      zcard_theme_id,
      force_color,
      card_color,
      force_font_color,
      card_font_color,
      enable_icon_banner,
      first_name,
      last_name,
      single_address_field,
      street_address,
      town_city,
      state_region,
      postal_code,
      country,
      zc_email,
      zc_phone,
      isPassword,
      zcard_password,
      social_enabled,
      tags,
    } = this.state;

    this.setState({ saving: true });

    // save password
    if (isPassword) {
      this.props.setPassword(
        `/edit-zcard/set_password.php?zcard_id=${selectedZCard.id}`,
        { password: zcard_password },
        (msg) => console.info(msg),
        (msg) => console.info(msg)
      )
    } else {
      this.props.clearPassword(
        `/Zcard/clear_password.php?id=${selectedZCard.id}`,
        (msg) => console.info(msg),
        (msg) => console.info(msg)
      )
    }

    // save social tags
    this.props.updateTags(
      `/Zcard/update_tags.php?id=${selectedZCard.id}`,
      {
        tags: tags.tagsArray
      },
      (msg) => console.info(msg),
      (msg) => console.info(msg),
    );

    // save data
    this.props.update_card_settings(
      '/Zcard/update_card_settings.php',
      {
        id: selectedZCard.id,
        toggle_seo_indexing: seo_indexing ? 1 : 0,
        zc_desc: zc_desc,
        zc_name: zc_name,
        zc_card_type: zc_card_type,
        zcard_theme_id: zcard_theme_id,
        toggle_force_color: force_color ? 1 : 0,
        card_color: card_color,
        toggle_force_font_color: force_font_color ? 1 : 0,
        card_font_color: card_font_color,
        toggle_enable_icon_banner: enable_icon_banner ? 1 : 0,
        social_enabled: social_enabled ? 1 : 0,
        first_name: first_name,
        last_name: last_name,
        single_address_field: single_address_field,
        street_address: street_address,
        town_city: town_city,
        state_region: state_region,
        postal_code: postal_code,
        select_country: country,
        email: zc_email,
        phone: zc_phone
      },
      (msg) => {
        let updatedZCard = selectedZCard;
        updatedZCard.toggle_seo_indexing = seo_indexing;
        updatedZCard.zc_desc = zc_desc;
        updatedZCard.zc_name = zc_name;
        updatedZCard.zc_card_type = zc_card_type;
        updatedZCard.zcard_theme_id = zcard_theme_id;
        updatedZCard.toggle_force_color = force_color;
        updatedZCard.card_color = card_color;
        updatedZCard.toggle_force_font_color = force_font_color;
        updatedZCard.card_font_color = card_font_color;
        updatedZCard.toggle_enable_icon_banner = enable_icon_banner;
        updatedZCard.first_name = first_name;
        updatedZCard.last_name = last_name;
        updatedZCard.single_address_field = single_address_field;
        updatedZCard.street_address = street_address;
        updatedZCard.town_city = town_city;
        updatedZCard.state_region = state_region;
        updatedZCard.postal_code = postal_code;
        updatedZCard.select_country = country;
        updatedZCard.email = zc_email;
        updatedZCard.phone = zc_phone;
        this.props.setSelectedZCard(updatedZCard);
        this.setState({ saving: false });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Sucess',
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
      },
    );
  }

  render = () => {
    const { selectedZCard } = this.props;
    const {
      saving,
      tags,
      tagsText,
      tagsColor,
      social_enabled,
      isPassword,
      seo_indexing,
      enable_icon_banner,
      enable_zcard_promo_banner,
      force_font_color,
      card_font_color,
      force_color,
      card_color,
      enable_commenting,
      section_comments,
      enable_notifications,
      first_name,
      last_name,
      zc_email,
      zc_phone,
      is_single_address_field,
      single_address_field,
      street_address,
      town_city,
      postal_code,
      state_region,
      zcard_password,
    } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <AwesomeLoading indicatorId={7} size={80} isActive={this.state.loading} />
          <Block style={styles.container}>
            <ScrollView nestedScrollEnabled={true}>
              <Block style={[commonStyles.card, commonStyles.shadow, { backgroundColor: colors.gold, padding: 10 }]}>
                <Text italic size={16} color={colors.primaryLight}>If you do not wish for your personal information to be made public, please do not use personal information <Text size={16} color={colors.primaryLight}>The settings in this tab apply to the entire card, and not just this one tab. This is not a visible tab on your Zcard, and is only used to set various options within your Zcard</Text></Text>
              </Block>
              <Block style={{ padding: 10 }}>
                <Text
                  style={[styles.label, { color: colors.grey }]}
                  size={16}>Card Name</Text>
                <Input
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='creditcard' family='AntDesign' iconSize={18} iconColor={colors.primary}
                  onChangeText={(zc_name) => this.setState({ zc_name })}
                >{selectedZCard.zc_name}</Input>

                <Dropdown
                  label="Card Type"
                  value={selectedZCard.card_type}
                  textColor={colors.primary}
                  labelFontSize={16}
                  fontSize={18}
                  dropdownPosition={0}
                  pickerStyle={{ borderRadius: 10, height: 300 }}
                  containerStyle={{ width: width - 20 }}
                  data={cardTypes}
                  onChangeText={(v, idx, data) => this.setState({ zc_card_type: data[idx].value })}
                />

                <Dropdown
                  label="Card Desktop Theme"
                  value={this.getThemeLabel(selectedZCard.theme_id)}
                  textColor={colors.primary}
                  labelFontSize={16}
                  fontSize={18}
                  dropdownPosition={0}
                  pickerStyle={{ borderRadius: 10, height: 200 }}
                  containerStyle={{ width: width - 20 }}
                  data={CardThemes}
                  onChangeText={(v, idx, data) => this.setState({ zcard_theme_id: idx + 1 })}
                />

                <Text
                  style={[styles.label, { color: colors.grey }]}
                  size={16}>Card Description</Text>
                <TextInput
                  multiline
                  editable
                  numberOfLines={3}
                  placeholder='Enter About Card Description...'
                  onChangeText={(zc_desc) => this.setState({ zc_desc })}
                  style={styles.description}>
                  {selectedZCard.zc_desc}
                </TextInput>
              </Block>
              <Block style={[commonStyles.card, commonStyles.shadow, { backgroundColor: colors.gold, padding: 10 }]}>
                <Text italic size={16} color={colors.primaryLight}>You can input multiple tags by typing in the tag name, and hitting enter. Once the tag is created, people can search for you using the discovery system (Zsocial). You can input as many tags as you want, but be sure you utilize tags that relate to your business, hobbies, events, etc. It’s best to use tags related to what your card is designed for.</Text>
              </Block>
              <Block style={{ padding: 10 }}>
                <ToggleSwitch
                  isOn={social_enabled}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Enable Social"
                  labelStyle={{ color: colors.primary, fontSize: 18 }}
                  onToggle={social_enabled => this.setState({ social_enabled })}
                />
                {social_enabled && <Block>
                  <Text
                    style={[styles.label, { color: colors.grey }]}
                    size={16}>ZSocial Tags</Text>
                  <TagInput
                    updateState={this.updateTagState}
                    tags={tags}
                    placeholder="input tags..."
                    label='Type in anything and then press Enter or type in a Comma (,) to add tags!'
                    labelStyle={{ color: '#fff' }}
                    leftElement={<Icon name='tags' family='AntDesign' size={18} color={tagsText} />}
                    leftElementContainerStyle={{ marginLeft: 3 }}
                    containerStyle={{ width: (width - 20) }}
                    inputContainerStyle={[styles.inputBox, { backgroundColor: tagsColor }]}
                    inputStyle={{ color: tagsText }}
                    onFocus={() => this.setState({ tagsColor: '#fff', tagsText: colors.primary })}
                    onBlur={() => this.setState({ tagsColor: colors.primary, tagsText: '#fff' })}
                    autoCorrect={false}
                    tagStyle={styles.tag}
                    tagTextStyle={styles.tagText}
                    keysForTag={','} />
                </Block>}

                <ToggleSwitch
                  isOn={isPassword}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Password protect this card"
                  labelStyle={{ color: colors.primary, fontSize: 18 }}
                  onToggle={isPassword => this.setState({ isPassword })}
                />
                {isPassword && <Input
                  password
                  viewPass
                  value={zcard_password}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='key' family='AntDesign' iconSize={18} iconColor={colors.primary}
                  onChangeText={(zcard_password) => this.setState({ zcard_password })}
                />}

                <ToggleSwitch
                  isOn={seo_indexing}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Enable Google Indexing On This Card"
                  labelStyle={{ color: colors.primary, fontSize: 18 }}
                  onToggle={seo_indexing => this.setState({ seo_indexing })}
                />
                <ToggleSwitch
                  isOn={enable_icon_banner}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Enable the icon banner below your main image"
                  labelStyle={{ color: colors.primary, fontSize: 18 }}
                  onToggle={enable_icon_banner => this.setState({ enable_icon_banner })}
                />
                <ToggleSwitch
                  isOn={enable_zcard_promo_banner}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Enable Zcard Promo Banner"
                  labelStyle={{ color: colors.primary, fontSize: 18 }}
                  onToggle={enable_zcard_promo_banner => this.setState({ enable_zcard_promo_banner })}
                />

                <Block style={commonStyles.divider} />
                <ToggleSwitch
                  isOn={force_font_color}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Use a single font color for all sections on this card."
                  labelStyle={{ color: colors.primary, fontSize: 18, flexShrink: 1 }}
                  onToggle={force_font_color => this.setState({ force_font_color })}
                />
                <Input
                  value={card_font_color}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
                  onPressIn={() => this.props.navigation.navigate('ColorPicker', {
                    pickColor: (card_font_color) => this.setState({ card_font_color })
                  })} />

                <ToggleSwitch
                  isOn={force_color}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Use a single background color for all sections on this card."
                  labelStyle={{ color: colors.primary, fontSize: 18, flexShrink: 1 }}
                  onToggle={force_color => this.setState({ force_color })}
                />
                <Input
                  value={card_color}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='round-brush' family='Entypo' iconSize={18} iconColor={colors.primary}
                  onPressIn={() => this.props.navigation.navigate('ColorPicker', {
                    pickColor: (card_color) => this.setState({ card_color })
                  })} />
                <ToggleSwitch
                  isOn={enable_commenting}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Enable Card Comments."
                  labelStyle={{ color: colors.primary, fontSize: 18, flexShrink: 1 }}
                  onToggle={enable_commenting => this.setState({ enable_commenting })}
                />
                {enable_commenting && <ToggleSwitch
                  disabled={selectedZCard.product_id == 1}
                  isOn={section_comments}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Enable Section Comments."
                  labelStyle={{ color: colors.primary, fontSize: 18, flexShrink: 1 }}
                  onToggle={section_comments => this.setState({ section_comments })}
                />}
                {selectedZCard.product_type == 3 && <ToggleSwitch
                  disabled={selectedZCard.product_id == 1}
                  isOn={enable_notifications}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Enable notifications."
                  labelStyle={{ color: colors.primary, fontSize: 18, flexShrink: 1 }}
                  onToggle={enable_notifications => this.setState({ enable_notifications })}
                />}
              </Block>

              <Block style={commonStyles.divider} />
              <Block style={{ padding: 10 }}>
                <Block center>
                  <Button
                    color={colors.blue}
                    icon='user' iconFamily='Entypo' iconSize={18}
                    textStyle={{ fontSize: 18 }}
                    onPress={this.useAccount}
                  > Use Account Detail</Button>
                </Block>
                <Text
                  style={[styles.label, { color: colors.grey }]}
                  size={16}>First Name</Text>
                <Input
                  value={first_name}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='user' family='Entypo' iconSize={18} iconColor={colors.primary}
                  onChangeText={(first_name) => this.setState({ first_name })} />
                <Text
                  style={[styles.label, { color: colors.grey }]}
                  size={16}>Last Name</Text>
                <Input
                  value={last_name}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='user' family='Entypo' iconSize={18} iconColor={colors.primary}
                  onChangeText={(last_name) => this.setState({ last_name })} />
                <Text
                  style={[styles.label, { color: colors.grey }]}
                  size={16}>Email</Text>
                <Input
                  value={zc_email}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='mail' family='Entypo' iconSize={18} iconColor={colors.primary}
                  onChangeText={(zc_email) => this.setState({ zc_email })} />
                <Text
                  style={[styles.label, { color: colors.grey }]}
                  size={16}>Phone</Text>
                <Input
                  value={zc_phone}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  icon='phone' family='Entypo' iconSize={18} iconColor={colors.primary}
                  onChangeText={(zc_phone) => this.setState({ zc_phone })} />

                <ToggleSwitch
                  isOn={is_single_address_field}
                  onColor="green"
                  offColor="red"
                  size='small'
                  label="Use Single or Multiple Address"
                  labelStyle={{ color: colors.primary, fontSize: 18 }}
                  onToggle={is_single_address_field => this.setState({ is_single_address_field })}
                />
                {is_single_address_field && <Input
                  value={single_address_field}
                  style={styles.inputBox} color={colors.primary} fontSize={18}
                  placeholder='Full Address'
                  placeholderTextColor={colors.grey}
                  icon='address' family='Entypo' iconSize={18} iconColor={colors.primary}
                  onChangeText={(single_address_field) => this.setState({ single_address_field })} />}
                {!is_single_address_field && <Block>
                  <Text
                    style={[styles.label, { color: colors.grey }]}
                    size={16}>Address</Text>
                  <Input
                    value={street_address}
                    style={styles.inputBox} color={colors.primary} fontSize={18}
                    icon='enviroment' family='AntDesign' iconSize={18} iconColor={colors.primary}
                    onChangeText={(street_address) => this.setState({ street_address })} />
                  <Text
                    style={[styles.label, { color: colors.grey }]}
                    size={16}>City</Text>
                  <Input
                    value={town_city}
                    style={styles.inputBox} color={colors.primary} fontSize={18}
                    icon='phone' family='Entypo' iconSize={18} iconColor={colors.primary}
                    onChangeText={(town_city) => this.setState({ town_city })} />
                  <Dropdown
                    label="State"
                    value={state_region}
                    textColor={colors.primary}
                    labelFontSize={16}
                    fontSize={18}
                    dropdownPosition={0}
                    pickerStyle={{ borderRadius: 10, height: 200 }}
                    containerStyle={{ width: width - 20 }}
                    data={stateList}
                    onChangeText={(v, idx, data) => this.setState({ state_region: idx + 1 })}
                  />
                  <Text
                    style={[styles.label, { color: colors.grey }]}
                    size={16}>Postal Code</Text>
                  <Input
                    value={postal_code}
                    style={styles.inputBox} color={colors.primary} fontSize={18}
                    icon='barcode' family='AntDesign' iconSize={18} iconColor={colors.primary}
                    onChangeText={(postal_code) => this.setState({ postal_code })} />
                  <Dropdown
                    label="Country"
                    value={selectedZCard.country != null ? selectedZCard.country : 'Please select a country'}
                    textColor={colors.primary}
                    labelFontSize={16}
                    fontSize={18}
                    dropdownPosition={6}
                    pickerStyle={{ borderRadius: 10, height: 300 }}
                    containerStyle={{ width: width - 20 }}
                    data={countryList}
                    onChangeText={(v, idx, data) => this.setState({ country: v })}
                  />
                </Block>}
              </Block>
            </ScrollView>
            <Block style={commonStyles.divider} />
            <Block center>
              <Button
                color={colors.green}
                icon='save' iconFamily='Entypo' iconSize={18}
                textStyle={{ fontSize: 18 }}
                loading={saving}
                onPress={this.save}
              > Save Card Settings</Button>
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
    update_card_settings: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    setSelectedZCard: (zcard) => SetSelectedZCard(dispatch, zcard),
    setPassword: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
    clearPassword: (controller, successcb, errorcb) => ClearPassword(controller, successcb, errorcb),
    updateTags: (controller, req, successcb, errorcb, getData) => CallController(controller, req, successcb, errorcb, getData),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardSettingsScreen);

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
  description: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    fontSize: 18,
    color: colors.primary,
  },
  tag: {
    backgroundColor: '#fff'
  },
  tagText: {
    color: colors.primary
  },
});

import { compose, lifecycle } from 'recompose';
import { Platform, UIManager } from 'react-native';
import { connect } from 'react-redux';

import AppView from './AppView';

export default compose(
  connect(
    state => ({
      // user: state.auth.user,
    })
  ),
  lifecycle({
    componentDidMount() {
      if (Platform.OS === 'android') {
        // eslint-disable-next-line no-unused-expressions
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    },
  }),
)(AppView);

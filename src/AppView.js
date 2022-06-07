import React, {useEffect} from 'react';
import CustomToast from './components/CustomToast';
import Navigator from './navigation/Navigator';

export default function AppView(props) {
  useEffect(() => {
    console.log('hello App view');
    return () => {
      console.log('Bye Bye App view');
    };
  }, []);

  return (
    <>
      <Navigator
        onNavigationStateChange={() => {}}
        uriPrefix="/app"
        props={props}
      />
      <CustomToast />
    </>
  );
}

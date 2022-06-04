import React from 'react';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {Text} from 'react-native';

const ScanQRScreen = () => {
  return (
    <QRCodeScanner
      onRead={e => {
        console.log(e.data);
      }}
      //   flashMode={RNCamera.Constants.FlashMode}
      topContent={<Text>Top</Text>}
      bottomContent={<Text>Bottom</Text>}
    />
  );
};

export default ScanQRScreen;

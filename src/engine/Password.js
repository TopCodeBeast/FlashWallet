import AsyncStorage from '@react-native-async-storage/async-storage';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const savePasswordToStorage = password => {
  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    console.log(err, hash);
    // await AsyncStorage.setItem('main_password', hash);
  });
};

export default {
  savePasswordToStorage,
};

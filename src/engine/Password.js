import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcrypt-react-native';

const saltRound = 10;

const savePasswordToStorage = password => {
  bcrypt
    .getSalt(saltRound)
    .then(salt => {
      bcrypt
        .hash(salt, password)
        .then(async hash => {
          await AsyncStorage.setItem('main_password', hash);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

export default {
  savePasswordToStorage,
};

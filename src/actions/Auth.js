import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcrypt-react-native';

const saltRound = 10;

export const checkAuthentication = async password => {
  try {
    const savedPassword = await AsyncStorage.getItem('main_password');
    const res = bcrypt.compareSync(password, savedPassword);
    return res;
  } catch (error) {
    console.log('ERROR!!!!!!: ', error);
    return Promise.reject(error);
  }
};

export const saveRememberOption = async rememberMe => {
  try {
    await AsyncStorage.setItem('remember_me', rememberMe);
    return Promise.resolve(true);
  } catch (error) {
    console.log('ERROR!!!!!!: ', error);
    return Promise.reject(error);
  }
};

export const savePasswordToStorage = async password => {
  try {
    const salt = await bcrypt.getSalt(saltRound);
    const hash = await bcrypt.hash(salt, password);
    await AsyncStorage.setItem('main_password', hash);
  } catch (error) {
    console.log('ERROR!!!!!!: ', error);
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcrypt-react-native';

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

import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcrypt-react-native';

const saltRound = 10;

const savePasswordToStorage = async password => {
  try {
    const salt = await bcrypt.getSalt(saltRound);
    const hash = await bcrypt.hash(salt, password);
    await AsyncStorage.setItem('main_password', hash);
  } catch (error) {
    console.log('ERROR!!!!!!: ', error);
  }
};

export default {
  savePasswordToStorage,
};

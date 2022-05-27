import {colors} from '../styles';

const avatar1Image = require('../assets/avatars/avatar1.png');
const avatar2Image = require('../assets/avatars/avatar2.png');
const avatar3Image = require('../assets/avatars/avatar3.png');
const avatars = [avatar1Image, avatar2Image, avatar3Image];

export default {
  HARDENED_OFFSET: 0x80000000,

  passwordStrengthCheckOption: [
    {
      id: 0,
      value: 'Too weak',
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: 'Weak',
      minDiversity: 1,
      minLength: 6,
    },
    {
      id: 2,
      value: 'Medium',
      minDiversity: 2,
      minLength: 8,
    },
    {
      id: 3,
      value: 'Strong',
      minDiversity: 4,
      minLength: 10,
    },
  ],
  passwordLevelColor: {
    'Too weak': colors.red5,
    Weak: colors.primary5,
    Medium: colors.blue5,
    Strong: colors.green5,
  },
  saltRound: 10,
  avatars,
  avatarsCount: 3,
};

import {combineReducers} from 'redux';
import AccountsReducer from './AccountsReducer';
import NetworkReducer from './NetworkReducer';
import WalletReducer from './WalletReducer';

const reducer = combineReducers({
  accounts: AccountsReducer,
  networks: NetworkReducer,
  wallet: WalletReducer,
});

export default reducer;

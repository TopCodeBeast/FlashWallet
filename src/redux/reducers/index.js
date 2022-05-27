import {combineReducers} from 'redux';
import AccountsReducer from './AccountsReducer';
import BalancesReducer from './BalancesReducer';
import NetworkReducer from './NetworkReducer';
import WalletReducer from './WalletReducer';

const reducer = combineReducers({
  accounts: AccountsReducer,
  networks: NetworkReducer,
  wallet: WalletReducer,
  balances: BalancesReducer,
});

export default reducer;

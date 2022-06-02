import {combineReducers} from 'redux';
import AccountsReducer from './AccountsReducer';
import BalancesReducer from './BalancesReducer';
import NetworkReducer from './NetworkReducer';
import TokensReducer from './TokensReducer';
import WalletReducer from './WalletReducer';

const reducer = combineReducers({
  accounts: AccountsReducer,
  networks: NetworkReducer,
  wallet: WalletReducer,
  balances: BalancesReducer,
  tokens: TokensReducer,
});

export default reducer;

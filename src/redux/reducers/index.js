import {combineReducers} from 'redux';
import AccountsReducer from './AccountsReducer';
import BalancesReducer from './BalancesReducer';
import EngineReducer from './EngineReducer';
import NetworkReducer from './NetworkReducer';
import QuoteReducer from './QuoteReducer';
import SettingsReducer from './SettingsReducer';
import TokensReducer from './TokensReducer';
import WalletReducer from './WalletReducer';

const reducer = combineReducers({
  accounts: AccountsReducer,
  networks: NetworkReducer,
  wallet: WalletReducer,
  balances: BalancesReducer,
  tokens: TokensReducer,
  engine: EngineReducer,
  settings: SettingsReducer,
  quote: QuoteReducer,
});

export default reducer;

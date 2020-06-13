import { combineReducers } from 'redux';

import BleReducers from './BleReducers';
import FormReducers from './FormReducers';
import PnoiControlReducers from './PnoiControlReducers';
import FinalReducers from './FinalReducers';

export default combineReducers({
    ble: BleReducers,
    form: FormReducers,
    pnoi: PnoiControlReducers,
    final: FinalReducers,
});

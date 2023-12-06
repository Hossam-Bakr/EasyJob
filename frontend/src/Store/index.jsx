import {configureStore} from '@reduxjs/toolkit';
import moodSlice from './mood-slice';

const store = configureStore({
    reducer:{mood:moodSlice.reducer}
})

export default store; 
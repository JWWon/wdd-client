import produce from 'immer';
import { handleActions } from 'redux-actions';
import * as actions from 'src/store/actions/walk';

export interface WalkState extends actions.WalkInterface {
  prevSeconds: {
    value: number;
    date: Date;
  };
  error?: any;
}

const initialState: WalkState = {
  status: 'READY',
  createdAt: new Date(),
  distance: 0,
  speed: 0,
  pins: [],
  seconds: 0,
  steps: 0,
  poos: 0,
  pees: 0,
  prevSeconds: {
    value: 0,
    date: new Date(),
  },
};

export default handleActions<WalkState, any>(
  {
    [actions.UPDATE_SECONDS]: (state, action) =>
      produce(state, draft => {
        draft.seconds = action.payload.seconds;
        draft.prevSeconds = {
          value: action.payload.seconds,
          date: new Date(),
        };
      }),
    [actions.UPDATE_STEPS]: (state, action) =>
      produce(state, draft => {
        draft.steps = action.payload;
      }),
    [actions.UPDATE_COUNT]: (state, action) =>
      produce(state, draft => {
        draft.pees = action.payload.pees;
        draft.poos = action.payload.poos;
      }),
    [actions.SET_WALK_REQUEST]: (state, action) =>
      produce(state, draft => {
        delete draft.error;
      }),
    [actions.SET_WALK_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [actions.SET_WALK_FAILURE]: (state, action) =>
      produce(state, draft => {
        draft.error = action.payload;
      }),
    [actions.CLEAR_WALK]: (state, action) => ({ ...initialState, pins: [] }),
  },
  initialState
);

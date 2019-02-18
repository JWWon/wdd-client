import { LatLng } from 'react-native-maps';

// *** INTERFACES
type Status = 'READY' | 'WALKING' | 'FINISH';
type PinType = 'check' | 'pee' | 'poo';

interface PinUpdateInterface {
  type: PinType;
  latitude?: LatLng['latitude'];
  longitude?: LatLng['longitude'];
}

export interface PinInterface extends PinUpdateInterface {
  latitude: LatLng['latitude'];
  longitude: LatLng['longitude'];
}

export interface WalkInterface {
  status: Status;
  pins: PinInterface[];
}

// *** CONSTS
export const UPDATE_STATUS = 'walk/UPDATE_STATUS';
export const UPDATE_PIN = 'walk/UPDATE_PIN';

export const SET_WALK_REQUEST = 'walk/SET_WALK_REQUEST';
export const SET_WALK_SUCCESS = 'walk/SET_WALK_SUCCESS';
export const SET_WALK_FAILURE = 'walk/SET_WALK_FAILURE';

// *** FUNCTIONS
export const updateStatus = (payload: Status) => ({
  type: UPDATE_STATUS,
  payload,
});
export const updatePin = (payload: PinUpdateInterface) => ({
  type: UPDATE_PIN,
  payload,
});

export const setWalkRequest = () => ({ type: SET_WALK_REQUEST });
export const setWalkSuccess = (payload: WalkInterface) => ({
  type: SET_WALK_SUCCESS,
  payload,
});
export const setWalkFailure = (payload: Error) => ({
  type: SET_WALK_FAILURE,
  payload,
});

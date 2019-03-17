import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import { LatLng } from 'react-native-maps';

export interface Params {
  keyword?: string;
  location?: LatLng;
  range?: number; // km
}

export interface Place
  extends Pick<Response, Exclude<keyof Response, 'location'>> {
  location: LatLng;
}

interface GeoJSON {
  type: string;
  coordinates: [number, number];
}

interface Response {
  name: string;
  location: GeoJSON;
  address: string;
  rating: number;
  images: string[];
  distance: number; // km
  officeHour?: {
    default: string;
    weekend?: string;
    dayoff?: string;
  };
  contact?: string;
  tags?: string[];
  likes?: string[];
  reviews?: string[];
}

const geoToLatLng = ({ coordinates }: GeoJSON) =>
  ({
    latitude: coordinates[1],
    longitude: coordinates[0],
  } as LatLng);

export const searchPlace = async (params?: Params) => {
  const response: AxiosResponse<Response[]> = await axios.get('/places', {
    params,
  });
  if (response.data.length < 1) Alert.alert('주변 가게를 찾을 수 없습니다.');
  const places: Place[] = response.data.map(place => ({
    ...place,
    location: geoToLatLng(place.location),
  }));
  return places;
};

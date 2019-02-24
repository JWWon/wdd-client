import { StyleSheet } from 'react-native';
import { color } from 'src/theme';

export const views = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  map: StyleSheet.absoluteFillObject,
});

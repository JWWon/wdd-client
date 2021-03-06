import { StyleSheet } from 'react-native';
import { color, font } from 'src/theme';

export const views = StyleSheet.create({
  textButton: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: color.grayEF,
  },
});

export const texts = StyleSheet.create({
  name: {
    fontSize: 15,
    color: color.grayB1,
  },
  highlight: {
    color: color.black,
  },
  distance: {
    marginLeft: 'auto',
    color: color.blackOpacity,
    fontSize: font.size.small,
  },
});

export const icons = StyleSheet.create({
  badge: {
    width: 15,
    height: 15,
    marginRight: 8,
    resizeMode: 'contain',
  },
});

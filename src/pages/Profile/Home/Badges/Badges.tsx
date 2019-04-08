import React from 'react';
import { ReducerState } from 'src/store/reducers';
import { font } from 'src/theme';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const badgeSize = 78;
const space = (width - badgeSize * 4) / 5;

const styles = StyleSheet.create({
  container: {
    marginTop: space,
    paddingHorizontal: space / 2,
  },
  wrapper: {
    width: badgeSize,
    marginHorizontal: space / 2,
    alignItems: 'center',
  },
  icon: {
    width: 64,
    height: 53,
    resizeMode: 'contain',
  },
  label: {
    color: '#484848',
    fontSize: font.size.small,
  },
});

const Badges: React.FC<{ user: ReducerState['user'] }> = ({ user }) => (
  <FlatList
    data={[
      {
        label: '프로필 사진등록',
        name: 'first_profile',
        source: require('src/assets/badges/badge_first_profile.png'),
      },
      {
        label: '첫 킁킁 보내기',
        name: 'first_like',
        source: require('src/assets/badges/badge_first_like.png'),
      },
      {
        label: '첫 산책 오줌',
        name: 'first_pee',
        source: require('src/assets/badges/badge_first_pee.png'),
      },
      {
        label: '첫 산책 똥',
        name: 'first_poo',
        source: require('src/assets/badges/badge_first_poo.png'),
      },
      {
        label: '1km',
        name: '1km',
        source: require('src/assets/badges/badge_1km.png'),
      },
      {
        label: '3km',
        name: '3km',
        source: require('src/assets/badges/badge_3km.png'),
      },
      {
        label: '5km',
        name: '5km',
        source: require('src/assets/badges/badge_5km.png'),
      },
      {
        label: '10km',
        name: '10km',
        source: require('src/assets/badges/badge_10km.png'),
      },
      {
        label: '산책 1회',
        name: 'walk_1',
        source: require('src/assets/badges/badge_walk_1.png'),
      },
      {
        label: '산책 3회',
        name: 'walk_3',
        source: require('src/assets/badges/badge_walk_3.png'),
      },
      {
        label: '산책 5회',
        name: 'walk_5',
        source: require('src/assets/badges/badge_walk_5.png'),
      },
      {
        label: '산책 10회',
        name: 'walk_10',
        source: require('src/assets/badges/badge_walk_10.png'),
      },
      {
        label: '스크랩 1회',
        name: 'scrap_1',
        source: require('src/assets/badges/badge_scrap_1.png'),
      },
      {
        label: '스크랩 3회',
        name: 'scrap_3',
        source: require('src/assets/badges/badge_scrap_3.png'),
      },
      {
        label: '스크랩 5회',
        name: 'scrap_5',
        source: require('src/assets/badges/badge_scrap_5.png'),
      },
      {
        label: '스크랩 10회',
        name: 'scrap_10',
        source: require('src/assets/badges/badge_scrap_10.png'),
      },
    ]}
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    numColumns={4}
    keyExtractor={(i, index) => index.toString()}
    columnWrapperStyle={styles.container}
    renderItem={({ item }) => (
      <View style={styles.wrapper}>
        <Image source={item.source} style={[styles.icon, { opacity: 0.3 }]} />
        <Text style={styles.label}>{item.label}</Text>
      </View>
    )}
  />
);

export default Badges;

import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { horizontalSize } from 'src/components/container/PageContainer/PageContainer.styles';
import TopNavbar from 'src/components/module/TopNavbar';
import { color } from 'src/theme';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

interface Props {
  thumbnail: string;
  navigation: NavigationScreenProp<any>;
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height * 0.41,
  },
  filter: {
    flex: 1,
    backgroundColor: `${color.black}78`,
  },
  button: {
    paddingLeft: horizontalSize,
    paddingVertical: 14,
  },
  icon: {
    width: 18,
    height: 16,
  },
});

const Header: React.FC<Props> = ({ thumbnail, navigation }) => (
  <ImageBackground
    style={styles.container}
    source={{ uri: thumbnail }}
    imageStyle={{ resizeMode: 'cover' }}>
    <View style={styles.filter} />
  </ImageBackground>
);

export default Header;

{
  /* <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => navigation.goBack(null)}>
          <Image
            source={require('src/assets/icons/ic_back_white.png')}
            style={styles.icon}
          />
        </TouchableOpacity> */
}

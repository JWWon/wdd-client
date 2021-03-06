import React, { PureComponent } from 'react';
import { NavigationScreenProps, withNavigation } from 'react-navigation';
import * as actions from 'src/store/actions/walk';
import { ReducerState } from 'src/store/reducers';
import { color, font } from 'src/theme';
import { statusBtn } from '../Walk.styles';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  View,
  Text,
} from 'react-native';

interface Props extends NavigationScreenProps {
  walk: ReducerState['walk'];
  updateStatus: typeof actions.updateStatus;
}

interface State {
  progress: Animated.Value;
  passHalf: boolean;
}

const TIMEOUT = 1600;
const progressSize = statusBtn + 12;

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 9,
    width: statusBtn,
    height: statusBtn,
    borderRadius: statusBtn / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '48%',
    height: '40%',
    resizeMode: 'contain',
  },
  progressBase: {
    zIndex: 6,
    position: 'absolute',
    top: -6,
    left: -6,
    width: progressSize,
    height: progressSize,
    borderRadius: progressSize / 2,
    backgroundColor: '#FFBFBE',
    overflow: 'hidden',
  },
  progressHalf: {
    zIndex: 7,
    width: progressSize / 2,
    height: progressSize,
    backgroundColor: '#FF6A67',
  },
  progressFilter: {
    zIndex: 8,
    position: 'absolute',
    top: 0,
    width: progressSize / 2,
    height: progressSize,
  },
  beforeHalf: {
    left: 0,
    backgroundColor: '#FFBFBE',
  },
  afterHalf: {
    right: 0,
    backgroundColor: '#FF6A67',
  },
  actionIndicator: {
    position: 'absolute',
    left: 0,
    bottom: -25,
    right: 0,
    width: statusBtn,
    alignItems: 'center',
  },
  indicatorText: {
    fontSize: 13,
    fontFamily: font.family.NanumSquareRoundB,
    color: color.gray48,
  },
});

class StatusButton extends PureComponent<Props, State> {
  private style = {
    WALKING: {
      backgroundColor: color.redLight,
      source: require('src/assets/icons/ic_pause.png'),
    },
    PAUSE: {
      backgroundColor: color.blue,
      source: require('src/assets/icons/ic_resume.png'),
    },
    FINISH: {
      backgroundColor: color.redLight,
      source: require('src/assets/icons/ic_stop.png'),
    },
    READY: {
      backgroundColor: color.blue,
      source: require('src/assets/icons/ic_resume.png'),
    },
  };

  state = {
    progress: new Animated.Value(0),
    passHalf: false,
  };

  animateProgress = () => {
    const { progress } = this.state;
    progress.addListener(({ value }) => {
      if (value > 0.5) this.setState({ passHalf: true });
    });
    return Animated.timing(progress, {
      toValue: 1,
      duration: TIMEOUT,
      useNativeDriver: true,
    });
  };

  stopProgress = () => {
    const { progress } = this.state;
    this.animateProgress().stop();
    progress.removeAllListeners();
    progress.setValue(0);
    this.setState({ passHalf: false });
  };

  handleLongPress = () => {
    const { updateStatus, walk, navigation } = this.props;
    updateStatus('FINISH');
    this.animateProgress().start(c => {
      if (c.finished) {
        if (walk.pins.length > 1) {
          navigation.navigate('finish');
        } else {
          updateStatus('READY');
          navigation.goBack(null);
        }
      }
    });
  };

  handlePressOut = () => {
    const { walk, updateStatus } = this.props;
    switch (walk.status) {
      case 'FINISH':
      case 'WALKING':
        updateStatus('PAUSE');
        break;
      case 'PAUSE':
        updateStatus('WALKING');
        break;
    }

    this.stopProgress();
  };

  render() {
    const { status } = this.props.walk;
    const { backgroundColor, source } = this.style[status];
    const progress = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View>
        {status === 'FINISH' && (
          <View style={styles.progressBase}>
            <Animated.View
              style={[
                styles.progressHalf,
                {
                  transform: [
                    { translateX: progressSize / 4 },
                    { rotate: progress },
                    { translateX: -progressSize / 4 },
                  ],
                },
              ]}
            />
            <View
              style={[
                styles.progressFilter,
                styles[this.state.passHalf ? 'afterHalf' : 'beforeHalf'],
              ]}
            />
          </View>
        )}
        {status === 'WALKING' && (
          <View style={styles.actionIndicator}>
            <Text style={styles.indicatorText}>길게 눌러서 종료</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.wrapper, { backgroundColor }]}
          onLongPress={this.handleLongPress}
          onPressOut={this.handlePressOut}
          activeOpacity={1}>
          <Image source={source} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(StatusButton);

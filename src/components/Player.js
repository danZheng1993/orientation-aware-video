import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Video from 'react-native-video';
import {useOrientation} from '../hooks';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  playerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '50%',
  },
  player: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default () => {
  const aniVal = useRef(new Animated.ValueXY({x: 0, y: 0}));
  const [playing, setPlaying] = useState(true);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const orientation = useOrientation();

  useEffect(() => {
    aniVal.current.setValue({x: 0, y: 0});
    setXPos(0);
    setYPos(0);
  }, [orientation]);

  const handleSwipeDown = useCallback(() => {
    if (yPos === 0) {
      Animated.timing(aniVal.current, {
        toValue: {x: xPos, y: yPos + 1},
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setYPos(yPos + 1);
      });
    }
  }, [xPos, yPos]);

  const handleSwipeUp = useCallback(() => {
    if (yPos === 1) {
      Animated.timing(aniVal.current, {
        toValue: {x: xPos, y: yPos - 1},
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setYPos(yPos - 1);
      });
    }
  }, [xPos, yPos]);

  const handleSwipeLeft = useCallback(() => {
    if (xPos === 1) {
      Animated.timing(aniVal.current, {
        toValue: {x: xPos - 1, y: yPos},
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setXPos(xPos - 1);
      });
    }
  }, [xPos, yPos]);

  const handleSwipeRight = useCallback(() => {
    if (xPos === 0) {
      Animated.timing(aniVal.current, {
        toValue: {x: xPos + 1, y: yPos},
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setXPos(xPos + 1);
      });
    }
  }, [xPos, yPos]);

  return (
    <GestureRecognizer
      style={styles.wrapper}
      onSwipeUp={handleSwipeUp}
      onSwipeDown={handleSwipeDown}
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}>
      <Animated.View
        style={[
          styles.playerWrapper,
          {
            left: aniVal.current.x.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '50%'],
            }),
            top: aniVal.current.y.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '50%'],
            }),
          },
        ]}>
        <TouchableWithoutFeedback onPress={() => setPlaying(!playing)}>
          <Video
            style={styles.player}
            source={{
              uri: 'https://hls.ted.com/project_masters/3875/manifest.m3u8',
            }}
            paused={!playing}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    </GestureRecognizer>
  );
};

import React from 'react';
import {SafeAreaView} from 'react-native';

import Player from './components/Player';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Player />
    </SafeAreaView>
  );
};

export default App;

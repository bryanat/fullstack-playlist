// Playlist

import { StyleSheet,  } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function BrowseScreen() {
  return (
    <View style={styles.topView}>
      <Text style={styles.topText}>Browse</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

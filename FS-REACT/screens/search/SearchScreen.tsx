// Playlist

import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function SearchScreen() {
  return (
    <View style={styles.topView}>
      <Text style={styles.topText}>Search</Text>
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

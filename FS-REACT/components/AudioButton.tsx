import * as React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from './Themed';
import { Audio } from 'expo-av';

// TODO: change fetching song parameter from urlID to text search results after confirming API endpoints are working
export default function AudioButton ({ urlID }: { urlID: string }) {
  const [sound, setSound] = React.useState<Audio.Sound>();

  async function playSound() {
    console.log(`Loading sound to play from uri ${urlID}`)
    const { sound } = await Audio.Sound.createAsync(
      // will need to proxy this domain name later
      { uri: `http://localhost:8085/song/${urlID}.mp3`}
    )
    setSound(sound)
    await sound.playAsync();
  }

  function pauseSound() {
    console.log(`Stopping sound ${urlID}`)
    setSound(undefined)
  }

  return (
    <View>
      <Pressable onPress={playSound}><Text>Play</Text></Pressable>
      <Pressable onPress={pauseSound}><Text>Pause</Text></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
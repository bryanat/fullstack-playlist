/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import FriendslistModal from '../screens/topmenu/FriendslistModal';
import NotificationsModal from '../screens/topmenu/NotificationsModal';
import SettingsModal from '../screens/topmenu/SettingsModal';
import PlaylistScreen from '../screens/playlists/PlaylistScreen';
import SearchScreen from '../screens/search/SearchScreen';
import BrowseScreen from '../screens/browse/BrowseScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Notifications" component={NotificationsModal} />
        <Stack.Screen name="Friendslist" component={FriendslistModal} />
        <Stack.Screen name="Settings" component={SettingsModal} />
      </Stack.Group>
      <Stack.Screen name="Experimental" component={ExperimentalScreensNavigator} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Playlist"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Playlist"
        component={PlaylistScreen}
        options={({ navigation }: RootTabScreenProps<'Playlist'>) => ({
          title: 'Playlists (Personal)',
          tabBarIcon: ({ color }) => <Feather name="list" color={color} size={30} style={{ marginBottom: -3 }} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Pressable
              onPress={() => navigation.navigate('Notifications')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
              >
                <Ionicons
                  //name=() => bell-plus-outline if notifications
                  name="notifications-outline"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Friendslist')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Ionicons
                  name="people-outline"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Settings')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Ionicons
                  name="settings-outline"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Experimental')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="code"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </View>
          )
        })}
      />
      <BottomTab.Screen
        name="Browse"
        component={BrowseScreen}
        options={{
          title: 'Browse (Global)',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="star-four-points-outline" color={color} size={30} style={{ marginBottom: -3}} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Feather name="search" color={color} size={30} style={{ marginBottom: -3}} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

function ExperimentalScreensNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="TabOne" 
        component={TabOneScreen}
        options={{
          title: 'Playlists (Personal)',
        }}
      />
      <Tab.Screen 
        name="Tab Two" 
        component={TabTwoScreen}
        options={{
          title:'Tab Two'
        }}
      />
      <Tab.Screen 
        name="Tab Three" 
        component={TabThreeScreen}
        options={{
          title:'Tab Three'
        }}
      />
    </Tab.Navigator>
  )
}

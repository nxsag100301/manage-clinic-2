/* eslint-disable react-native/no-inline-styles */
import { Alert, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import Navigation from './navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

const Index = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token: ', token);
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'Thông báo nhận được',
        JSON.stringify(remoteMessage.notification),
      );
    });

    return unsubscribe;
  }, []);
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[
        styles.container,
        { backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' },
      ]}
    >
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#121212' : '#ffffff'}
      />
      <Navigation />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { Alert, StatusBar, StyleSheet } from 'react-native';
import Navigation from './navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import LoadingScreen from './components/Loading/LoadingScreen';
import { useSelector } from 'react-redux';

const Index = () => {
  const { globalLoading } = useSelector(state => state.loading);

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
  return (
    <>
      <SafeAreaView
        edges={['top', 'left', 'right', 'bottom']}
        style={styles.container}
      >
        <StatusBar barStyle={'dark-content'} backgroundColor="white" />
        <Navigation />
      </SafeAreaView>
      <LoadingScreen loading={globalLoading} />
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

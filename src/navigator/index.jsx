import { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import { Booking, Login, Report } from '../screens';
import { useSelector } from 'react-redux';

export const navigationRef = createRef();

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const user = useSelector(state => state.user.currentUser);
  const isLogin = !!user;
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {isLogin ? (
          <>
            <Stack.Screen name="bottomTab" component={BottomTab} />
            <Stack.Screen name="booking" component={Booking} />
            <Stack.Screen name="report" component={Report} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

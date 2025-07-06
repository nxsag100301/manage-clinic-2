import BottomTab from './BottomTab';
import { createRef } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Booking,
  DetailMedicalHistory,
  DetailPaymentHistory,
  ForgotPassword,
  Login,
  LoginCustomer,
  LoginManager,
  MedicalHistory,
  PaymentHistory,
  Profile,
  Report,
  StartScreen,
  TestPdf,
} from '../screens';
import { useSelector } from 'react-redux';

export const navigationRef = createRef();

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const Navigation = () => {
  const user = useSelector(state => state.user.currentUser);
  const isLogin = !!user;
  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={'startScreen'}
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
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="medicalHistory" component={MedicalHistory} />
            <Stack.Screen
              name="detailMedicalHistory"
              component={DetailMedicalHistory}
            />
            <Stack.Screen name="paymentHistory" component={PaymentHistory} />
            <Stack.Screen
              name="detailPaymentHistory"
              component={DetailPaymentHistory}
            />
            <Stack.Screen name="testPdf" component={TestPdf} />
          </>
        ) : (
          <>
            <Stack.Screen name="startScreen" component={StartScreen} />
            <Stack.Screen name="loginManager" component={LoginManager} />
            <Stack.Screen name="loginCustomer" component={LoginCustomer} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

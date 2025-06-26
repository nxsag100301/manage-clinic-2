/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import { Home, Menu, Notifications, Search } from '../../screens';
import icons from '../../constants/icons';

const Tab = createBottomTabNavigator();

const bottomTab = [
  {
    id: 1,
    name: 'home',
    component: Home,
    icon: icons.home,
  },
  {
    id: 2,
    name: 'search',
    component: Search,
    icon: icons.search,
  },
  {
    id: 3,
    name: 'notifications',
    component: Notifications,
    icon: icons.bell,
  },
  {
    id: 4,
    name: 'menu',
    component: Menu,
    icon: icons.menu,
  },
];

const TabIcon = ({ icon, focused }) => {
  return (
    <View style={styles.tabIcon}>
      <Image
        source={icon}
        style={{
          width: 24,
          height: 24,
          tintColor: focused ? '#177de2' : '#8E8E93',
        }}
        resizeMode="contain"
      />
    </View>
  );
};
const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {bottomTab.map(tab => (
        <Tab.Screen
          name={tab.name}
          component={tab.component}
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={tab.icon} focused={focused} label={tab.title} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
  },
  tabIcon: {
    height: 46,
    width: 48,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default BottomTab;

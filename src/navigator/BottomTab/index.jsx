/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import { Home, Menu, Notifications, Search } from '../../screens';
import icons from '../../constants/icons';
import { parseSizeHeight, parseSizeWidth } from '../../theme';

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
          width: parseSizeWidth(32),
          height: parseSizeHeight(32),
          tintColor: focused ? '#177DE2' : '#8E8E93',
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
    height: parseSizeHeight(60),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: parseSizeHeight(10),
  },
  tabIcon: {
    height: parseSizeHeight(42),
    width: parseSizeWidth(42),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTab;

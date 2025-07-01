import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icons from '../../constants/icons';
import { logOut } from '../../redux/slice/userSlice';
import images from '../../constants/images';
import { settings } from '../../constants/data';
import { parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const SettingItems = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.itemRow}>
      <View style={styles.itemLeft}>
        <Image source={icon} style={styles.itemIcon} />
        <Text style={[styles.itemText, textStyle && { color: 'red' }]}>
          {title}
        </Text>
      </View>
      {showArrow && (
        <Image source={icons.rightArrow} style={styles.arrowIcon} />
      )}
    </TouchableOpacity>
  );
};

const Menu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    dispatch(logOut());
  };

  const user = useSelector(state => state.user.currentUser);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.headerRow}>
        <Text style={styles.menuTitle}>Menu</Text>
        <Image source={icons.bell} style={styles.bellIcon} />
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Image source={images.avatar} style={styles.avatarImage} />
          <Text style={styles.userName}>{user?.TenNhanVien}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <SettingItems icon={icons.calendar} title="My Bookings" />
        <SettingItems icon={icons.wallet} title="Payments" />
      </View>

      <View style={styles.sectionWithBorder}>
        {settings.slice(2).map((item, index) => (
          <SettingItems
            key={index}
            {...item}
            onPress={() =>
              item.screen ? navigation.navigate(item.screen) : {}
            }
          />
        ))}
      </View>
      <SettingItems
        icon={icons.logout}
        title="Logout"
        textStyle="text-red-500"
        showArrow={false}
        onPress={handleLogout}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: parseSizeWidth(28),
    paddingTop: parseSizeHeight(12),
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: Sizes.text_h4,
    fontWeight: 'bold',
  },
  bellIcon: {
    width: parseSizeWidth(32),
    height: parseSizeHeight(32),
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: parseSizeHeight(16),
  },
  avatarWrapper: {
    alignItems: 'center',
    maxWidth: parseSizeWidth(200),
  },
  avatarImage: {
    width: parseSizeWidth(150),
    height: parseSizeHeight(150),
    borderRadius: 88,
  },
  userName: {
    marginTop: parseSizeHeight(8),
    fontSize: Sizes.text_h4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginTop: parseSizeHeight(8),
  },
  sectionWithBorder: {
    marginTop: parseSizeHeight(16),
    paddingTop: parseSizeHeight(16),
    borderTopWidth: 1,
    borderColor: '#D0D0D0',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(12),
  },
  itemIcon: {
    width: parseSizeWidth(24),
    height: parseSizeHeight(24),
  },
  itemText: {
    fontSize: Sizes.text_h6,
    fontWeight: '500',
    color: '#333',
  },
  arrowIcon: {
    width: parseSizeWidth(16),
    height: parseSizeHeight(16),
  },
});

export default Menu;

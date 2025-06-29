import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import images from '../../../constants/images';
import icons from '../../../constants/icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { parseSizeHeight, parseSizeWidth, Sizes } from '../../../theme';

const HomeHeader = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.currentUser);
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image source={images.avatar} style={styles.avatar} />
        <View>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.userName}>{user?.TenNhanVien}</Text>
        </View>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate('search')}>
          <Image source={icons.search} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icons.bell} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(12),
  },
  avatar: {
    width: parseSizeWidth(48),
    height: parseSizeHeight(48),
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: Sizes.text_subtitle2,
    color: '#000',
  },
  userName: {
    fontSize: Sizes.text_h6,
    fontWeight: 700,
    lineHeight: 24,
    color: '#000',
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'contain',
  },
});

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { parseSizeWidth, parseSizeHeight } from '../../theme';
import icons from '../../constants/icons';

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={icons.loginBackground} // ảnh nền nền đẹp dạng gradient hoặc hình abstract nhẹ
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Chào mừng bạn đến với Hệ thống</Text>
        <Text style={styles.subtitle}>Vui lòng chọn vai trò đăng nhập</Text>

        <TouchableOpacity
          style={[styles.button, styles.managerButton]}
          onPress={() => navigation.navigate('loginManager')}
        >
          <Text style={styles.buttonText}>Đăng nhập Quản trị</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.customerButton]}
          onPress={() => navigation.navigate('loginCustomer')}
        >
          <Text style={styles.buttonText}>Đăng nhập Khách hàng</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: parseSizeWidth(16),
    padding: parseSizeWidth(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: parseSizeWidth(20),
    fontWeight: '700',
    color: '#0057a3',
    textAlign: 'center',
    marginBottom: parseSizeHeight(12),
  },
  subtitle: {
    fontSize: parseSizeWidth(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: parseSizeHeight(24),
  },
  button: {
    paddingVertical: parseSizeHeight(12),
    borderRadius: parseSizeWidth(10),
    alignItems: 'center',
    marginBottom: parseSizeHeight(16),
  },
  managerButton: {
    backgroundColor: '#0057a3',
  },
  customerButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: parseSizeWidth(15),
    fontWeight: '600',
  },
});

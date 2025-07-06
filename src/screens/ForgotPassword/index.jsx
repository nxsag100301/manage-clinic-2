import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { parseSizeWidth, parseSizeHeight } from '../../theme';
import icons from '../../constants/icons';

const ForgotPassword = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!value.trim()) {
      setError('Vui lòng nhập tên đăng nhập hoặc số điện thoại');
      return;
    }

    // TODO: Gửi request xử lý quên mật khẩu tại đây
    console.log('Submitted:', value);
    setError('');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text style={styles.subtitle}>
          Nhập tên đăng nhập hoặc số điện thoại của bạn
        </Text>

        <Text style={styles.label}>Tài khoản / Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập thông tin"
          placeholderTextColor="#6B7280"
          value={value}
          onChangeText={text => {
            setValue(text);
            if (error) setError('');
          }}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Xác nhận</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: parseSizeWidth(24),
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
  },
  backBtn: {
    marginBottom: parseSizeHeight(10),
    alignSelf: 'flex-start',
  },
  backIcon: {
    width: parseSizeWidth(12),
    height: parseSizeHeight(24),
  },
  title: {
    fontSize: parseSizeWidth(26),
    fontWeight: 'bold',
    marginTop: parseSizeHeight(12),
    marginBottom: parseSizeHeight(12),
    color: '#1E293B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: parseSizeWidth(16),
    color: '#6B7280',
    marginBottom: parseSizeHeight(32),
    textAlign: 'center',
  },
  label: {
    fontSize: parseSizeWidth(15),
    marginBottom: parseSizeHeight(6),
    color: '#111827',
  },
  input: {
    height: parseSizeHeight(52),
    borderRadius: parseSizeWidth(10),
    borderColor: '#D1D5DB',
    borderWidth: 1,
    paddingHorizontal: parseSizeWidth(14),
    fontSize: parseSizeWidth(15),
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  error: {
    color: '#DC2626',
    marginTop: parseSizeHeight(4),
    fontSize: parseSizeWidth(13),
  },
  submitBtn: {
    marginTop: parseSizeHeight(28),
    backgroundColor: '#3B82F6',
    height: parseSizeHeight(52),
    borderRadius: parseSizeWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: parseSizeWidth(16),
    fontWeight: '600',
  },
});

export default ForgotPassword;

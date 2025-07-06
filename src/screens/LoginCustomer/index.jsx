import React, { useCallback, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import icons from '../../constants/icons';
import { userLoginAPI } from '../../redux/slice/userSlice';
import { parseSizeWidth, parseSizeHeight } from '../../theme';

const LoginCustomer = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setUsername('');
        setPassword('');
        setErrors({});
        setIsShowPassword(false);
      };
    }, []),
  );

  const clearFieldError = field => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setFieldError = (field, message) => {
    setErrors(prev => ({
      ...prev,
      [field]: { ...prev[field], message },
    }));
  };

  const handleValidate = () => {
    let isValid = true;
    if (!username) {
      setFieldError('username', 'Tên đăng nhập không được để trống');
      isValid = false;
    }
    if (!password) {
      setFieldError('password', 'Mật khẩu không được để trống');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!handleValidate()) return;
    const data = {
      username: username,
      password: password,
      idKho: 0,
      idKhu: 0,
      idVt: 0,
    };
    try {
      await dispatch(userLoginAPI(data));
    } catch (error) {
      console.log('Login error: ', error?.response?.data || error.message);
    }
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

        <Text style={styles.title}>Đăng nhập Khách hàng</Text>
        <Text style={styles.subtitle}>Chào mừng bạn đến với SixOs</Text>

        <Text style={styles.label}>Tên đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#6B7280"
          value={username}
          onChangeText={text => {
            setUsername(text);
            if (errors.username) clearFieldError('username');
          }}
        />
        {errors.username?.message && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}

        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Mật khẩu</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('forgotPassword')}
          >
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            placeholderTextColor="#6B7280"
            secureTextEntry={!isShowPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (errors.password) clearFieldError('password');
            }}
          />
          <TouchableOpacity
            onPress={() => setIsShowPassword(!isShowPassword)}
            style={styles.eyeIcon}
          >
            <Image
              source={isShowPassword ? icons.eyeOpen : icons.eyeOff}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {errors.password?.message && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          <Text style={styles.loginBtnText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signupBtn}
        >
          <Text style={styles.signupText}>Chưa có tài khoản?</Text>
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
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: parseSizeHeight(20),
    marginBottom: parseSizeHeight(4),
  },
  forgotText: {
    color: '#3B82F6',
    fontSize: parseSizeWidth(14),
  },
  passwordInputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    top: parseSizeHeight(14),
    right: parseSizeWidth(12),
  },
  icon: {
    width: parseSizeWidth(22),
    height: parseSizeHeight(22),
    tintColor: '#6B7280',
  },
  loginBtn: {
    marginTop: parseSizeHeight(28),
    backgroundColor: '#3B82F6',
    height: parseSizeHeight(52),
    borderRadius: parseSizeWidth(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: parseSizeWidth(16),
    fontWeight: '600',
  },
  signupBtn: {
    marginTop: parseSizeHeight(20),
    alignItems: 'center',
  },
  signupText: {
    fontSize: parseSizeWidth(15),
    color: '#3B82F6',
    fontWeight: 'bold',
  },
});

export default LoginCustomer;

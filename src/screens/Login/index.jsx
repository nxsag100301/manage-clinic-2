import React, { useCallback, useEffect, useState } from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import icons from '../../constants/icons';
import { userLoginAPI } from '../../redux/slice/userSlice';
import { getJson } from '../../api/auth';

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [areaList, setAreaList] = useState([]);
  const [positionList, setPositionList] = useState([]);

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const [openArea, setOpenArea] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail('');
        setPassword('');
        setErrors({});
        setIsShowPassword(false);
        setSelectedArea(null);
        setSelectedPosition(null);
      };
    }, []),
  );

  useEffect(() => {
    const fetchPosition = async () => {
      const res = await getJson('DM_VaiTro.json');
      const filtered = res.filter(item => item.active);
      const mapped = filtered.map(item => ({
        label: item.ten,
        value: item.id,
      }));
      setPositionList(mapped);
    };
    const fetchArea = async () => {
      const res = await getJson('DM_Khu.json');
      const filtered = res.filter(item => item.active);
      const mapped = filtered.map(item => ({
        label: item.ten,
        value: item.id,
      }));
      setAreaList(mapped);
    };
    fetchArea();
    fetchPosition();
  }, []);

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
    if (!email) {
      setFieldError('email', 'Email is required');
      isValid = false;
    }
    if (!password) {
      setFieldError('password', 'Password is required');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    // if (!handleValidate()) return;
    const data = {
      username: 'Admin',
      password: 'MatKhauMoi',
      idKho: 0,
      idKhu: selectedArea || 0,
      idVt: selectedPosition || 0,
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
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back to the app</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Example@gmail.com"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (errors.email) clearFieldError('email');
          }}
        />
        {errors.email?.message && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <View style={styles.passwordHeader}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Your password"
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

        <Text style={[styles.label, { marginTop: 16 }]}>Khu</Text>
        <DropDownPicker
          open={openArea}
          value={selectedArea}
          items={areaList}
          setOpen={setOpenArea}
          setValue={setSelectedArea}
          setItems={setAreaList}
          placeholder="Chọn khu"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={3000}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Vị trí</Text>
        <DropDownPicker
          open={openPosition}
          value={selectedPosition}
          items={positionList}
          setOpen={setOpenPosition}
          setValue={setSelectedPosition}
          setItems={setPositionList}
          placeholder="Chọn vị trí"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          zIndex={2000}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signupBtn}
        >
          <Text style={styles.signupText}>Create an account?</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  keyboardView: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#4B5563',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  input: {
    height: 56,
    borderRadius: 12,
    borderColor: '#6B7280',
    borderWidth: 1,
    paddingHorizontal: 12,
    color: '#000',
    marginBottom: 4,
  },
  dropdown: {
    borderColor: '#6B7280',
    borderRadius: 12,
  },
  dropdownContainer: {
    borderColor: '#6B7280',
  },
  error: {
    color: '#dc2626',
    marginTop: 4,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 4,
  },
  forgotText: {
    color: '#2563EB',
    fontSize: 14,
  },
  passwordInputContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    top: 14,
    right: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#6B7280',
  },
  loginBtn: {
    marginTop: 24,
    backgroundColor: '#2563EB',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signupBtn: {
    marginTop: 24,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: 'bold',
  },
});

export default Login;

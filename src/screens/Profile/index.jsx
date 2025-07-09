import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import MyHeader from '../../components/Header/MyHeader';
import { parseSizeWidth, parseSizeHeight } from '../../theme';

const genderOptions = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
];

const RenderField = ({ label, value, onChange, disabled = false }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={`Nhập ${label.toLowerCase()}`}
      value={value}
      editable={!disabled}
      onChangeText={onChange}
    />
  </View>
);

const GenderSelector = ({ selectedGender, onSelect }) => (
  <View style={styles.genderContainer}>
    {genderOptions.map(option => {
      const isSelected = selectedGender === option.value;
      return (
        <TouchableOpacity
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={[styles.genderButton, isSelected && styles.genderButtonActive]}
        >
          <Text
            style={[
              styles.genderButtonText,
              isSelected && styles.genderButtonTextActive,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

const Profile = () => {
  const [profileData, setProfileData] = useState({
    patientCode: 'BN123456',
    fullName: '',
    birthDate: '',
    gender: 'male',
    email: '',
    insuranceCode: '',
    cccd: '',
    address: '',
    phone: '',
    relativeName: '',
    relativeAddress: '',
    relativePhone: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDateValue, setBirthDateValue] = useState(new Date());

  const handleChange = (key, value) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  const handleBirthDateSelect = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDateValue(selectedDate);
      handleChange('birthDate', dayjs(selectedDate).format('DD/MM/YYYY'));
    }
  };

  return (
    <>
      <MyHeader headerTitle="Thông tin cá nhân" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={parseSizeHeight(80)}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông tin bệnh nhân</Text>

            <RenderField
              label="Mã bệnh nhân"
              value={profileData.patientCode}
              disabled
            />
            <RenderField
              label="Họ tên"
              value={profileData.fullName}
              onChange={text => handleChange('fullName', text)}
            />

            {/* Ngày sinh */}

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Ngày sinh</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <View style={styles.input}>
                  <Text style={styles.birthText}>
                    {profileData.birthDate || 'Chọn ngày sinh'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Giới tính */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Giới tính</Text>
              <GenderSelector
                selectedGender={profileData.gender}
                onSelect={value => handleChange('gender', value)}
              />
            </View>

            <RenderField
              label="Email"
              value={profileData.email}
              onChange={text => handleChange('email', text)}
            />
            <RenderField
              label="Mã thẻ BHYT"
              value={profileData.insuranceCode}
              onChange={text => handleChange('insuranceCode', text)}
            />
            <RenderField
              label="CCCD"
              value={profileData.cccd}
              onChange={text => handleChange('cccd', text)}
            />
            <RenderField
              label="Địa chỉ"
              value={profileData.address}
              onChange={text => handleChange('address', text)}
            />
            <RenderField
              label="Số điện thoại"
              value={profileData.phone}
              onChange={text => handleChange('phone', text)}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Thông tin người thân</Text>
            <RenderField
              label="Tên người thân"
              value={profileData.relativeName}
              onChange={text => handleChange('relativeName', text)}
            />
            <RenderField
              label="Địa chỉ người thân"
              value={profileData.relativeAddress}
              onChange={text => handleChange('relativeAddress', text)}
            />
            <RenderField
              label="SĐT người thân"
              value={profileData.relativePhone}
              onChange={text => handleChange('relativePhone', text)}
            />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* DateTimePicker hiển thị giống như Report */}
        {showDatePicker && (
          <DateTimePicker
            value={birthDateValue}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleBirthDateSelect}
            maximumDate={new Date()}
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
  content: {
    padding: parseSizeWidth(16),
    paddingBottom: parseSizeHeight(40),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: parseSizeWidth(12),
    padding: parseSizeWidth(16),
    marginBottom: parseSizeHeight(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: parseSizeWidth(16),
    fontWeight: '600',
    marginBottom: parseSizeHeight(12),
    color: '#0057a3',
  },
  fieldContainer: {
    marginBottom: parseSizeHeight(14),
  },
  label: {
    fontSize: parseSizeWidth(13),
    color: '#333',
    marginBottom: parseSizeHeight(4),
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: parseSizeWidth(8),
    paddingHorizontal: parseSizeWidth(12),
    paddingVertical: parseSizeHeight(10),
    fontSize: parseSizeWidth(14),
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: parseSizeHeight(14),
    borderRadius: parseSizeWidth(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: parseSizeWidth(16),
  },
  genderContainer: {
    flexDirection: 'row',
    gap: parseSizeWidth(10),
  },
  genderButton: {
    flex: 1,
    paddingVertical: parseSizeHeight(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: parseSizeWidth(8),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  genderButtonActive: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
  genderButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  genderButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

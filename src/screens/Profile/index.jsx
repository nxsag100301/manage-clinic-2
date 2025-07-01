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
import { parseSizeWidth, parseSizeHeight } from '../../theme';
import MyHeader from '../../components/Header/MyHeader';

const RenderField = ({ label, value, onChange, disabled = false }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        disabled && { backgroundColor: '#f0f0f0', color: '#999' },
      ]}
      placeholder={`Nhập ${label.toLowerCase()}`}
      value={value}
      editable={!disabled}
      onChangeText={onChange}
    />
  </View>
);

const Profile = () => {
  const [profileData, setProfileData] = useState({
    patientCode: 'BN123456',
    fullName: '',
    birthDate: '',
    gender: '',
    email: '',
    insuranceCode: '',
    cccd: '',
    address: '',
    phone: '',
    relativeName: '',
    relativeAddress: '',
    relativePhone: '',
  });

  const handleChange = (key, value) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <MyHeader headerTitle="Thông tin cá nhân" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingViewStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={parseSizeHeight(80)}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
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
            <RenderField
              label="Ngày sinh"
              value={profileData.birthDate}
              onChange={text => handleChange('birthDate', text)}
            />
            <RenderField
              label="Giới tính"
              value={profileData.gender}
              onChange={text => handleChange('gender', text)}
            />
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
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f5f9',
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
  },
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
});

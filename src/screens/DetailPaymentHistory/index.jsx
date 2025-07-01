import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { parseSizeHeight, parseSizeWidth } from '../../theme';
import MyHeader from '../../components/Header/MyHeader';

const Tab = createMaterialTopTabNavigator();

const DetailPaymentHistory = () => {
  return (
    <View style={styles.container}>
      <MyHeader headerTitle="Chi tiết phiếu thu" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: parseSizeWidth(13), fontWeight: '600' },
          tabBarIndicatorStyle: { backgroundColor: '#0057a3' },
        }}
      >
        <Tab.Screen name="Thuốc" component={MedicineTab} />
        <Tab.Screen name="Dịch vụ kỹ thuật" component={ServiceTab} />
      </Tab.Navigator>
    </View>
  );
};

const MedicineTab = () => {
  const medicines = [
    {
      id: 1,
      name: 'Paracetamol',
      quantity: 10,
      unit: 'viên',
      price: 2000,
      surcharge: 0,
      discountPercent: 0,
    },
    {
      id: 2,
      name: 'Vitamin C',
      quantity: 5,
      unit: 'viên',
      price: 3000,
      surcharge: 0,
      discountPercent: 10,
    },
  ];

  return (
    <ScrollView style={styles.content}>
      {medicines.map((item, index) => renderVerticalItem(item, index))}
    </ScrollView>
  );
};

const ServiceTab = () => {
  const services = [
    {
      id: 1,
      name: 'Xét nghiệm máu',
      quantity: 1,
      unit: 'lần',
      price: 100000,
      surcharge: 20000,
      discountPercent: 0,
    },
  ];

  return (
    <ScrollView style={styles.content}>
      {services.map((item, index) => renderVerticalItem(item, index))}
    </ScrollView>
  );
};

const renderVerticalItem = (item, index) => {
  const total =
    (item.price + item.surcharge) *
    item.quantity *
    (1 - item.discountPercent / 100);

  return (
    <View key={item.id} style={styles.card}>
      <Text style={styles.itemTitle}>
        #{index + 1}: {item.name}
      </Text>
      <Text style={styles.itemRowText}>Số lượng: {item.quantity}</Text>
      <Text style={styles.itemRowText}>Đơn vị tính: {item.unit}</Text>
      <Text style={styles.itemRowText}>
        Đơn giá: {item.price.toLocaleString()}₫
      </Text>
      <Text style={styles.itemRowText}>
        Phụ thu: {item.surcharge.toLocaleString()}₫
      </Text>
      <Text style={styles.itemRowText}>Giảm giá: {item.discountPercent}%</Text>
      <Text style={styles.totalText}>
        Thành tiền: {total.toLocaleString()}₫
      </Text>
    </View>
  );
};

export default DetailPaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc',
  },
  content: {
    padding: parseSizeWidth(16),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: parseSizeWidth(12),
    padding: parseSizeWidth(16),
    marginBottom: parseSizeHeight(16),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemTitle: {
    fontSize: parseSizeWidth(14),
    fontWeight: 'bold',
    marginBottom: parseSizeHeight(6),
    color: '#0057a3',
  },
  itemRowText: {
    fontSize: parseSizeWidth(13),
    marginBottom: parseSizeHeight(4),
    color: '#333',
  },
  totalText: {
    fontSize: parseSizeWidth(14),
    fontWeight: '600',
    color: '#d32f2f',
    marginTop: parseSizeHeight(8),
  },
});

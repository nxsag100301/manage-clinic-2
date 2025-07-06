import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { parseSizeHeight, parseSizeWidth } from '../../theme';
import MyHeader from '../../components/Header/MyHeader';
import icons from '../../constants/icons';
import { useNavigation } from '@react-navigation/native';

const PaymentHistory = () => {
  const navigation = useNavigation();

  const [filters, setFilters] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    admissionCode: '',
  });

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const receipts = [
    {
      id: '1',
      date: '2025-06-29 10:30',
      method: 'Tiền mặt',
      amount: 500000,
      coverage: '80%',
      admissionCode: 'A001',
    },
  ];

  const handleDetailPress = id => {
    navigation.navigate('detailPaymentHistory', { id });
  };

  return (
    <View style={styles.container}>
      <MyHeader headerTitle="Lịch sử thanh toán" />

      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        <View style={styles.dateRow}>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={styles.dateInputWrapper}
          >
            <Text style={styles.dateInputText}>
              Từ ngày: {filters.fromDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showFromPicker && (
            <DateTimePicker
              value={filters.fromDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowFromPicker(false);
                if (date) setFilters({ ...filters, fromDate: date });
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={styles.dateInputWrapper}
          >
            <Text style={styles.dateInputText}>
              Đến ngày: {filters.toDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showToPicker && (
            <DateTimePicker
              value={filters.toDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowToPicker(false);
                if (date) setFilters({ ...filters, toDate: date });
              }}
            />
          )}
        </View>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.inputSearch}
            placeholder="Nhập mã vào viện"
            value={filters.admissionCode}
            onChangeText={text =>
              setFilters({ ...filters, admissionCode: text })
            }
          />
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={icons.search}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách phiếu thu */}
      <ScrollView style={styles.listContainer}>
        {receipts.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.receiptCard}
            onPress={() => handleDetailPress(item.id)}
          >
            <View style={styles.rowBetween}>
              <Text style={styles.labelBold}>Ngày giờ thu:</Text>
              <Text>{item.date}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.labelBold}>HT thanh toán:</Text>
              <Text>{item.method}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.labelBold}>Số tiền:</Text>
              <Text style={styles.amount}>{item.amount.toLocaleString()}₫</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.labelBold}>Mức hưởng:</Text>
              <Text>{item.coverage}</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.labelBold}>Mã vào viện:</Text>
              <Text>{item.admissionCode}</Text>
            </View>
            <View style={styles.pdfActionRow}>
              <TouchableOpacity onPress={() => console.log('Xem PDF', item.id)}>
                <Text style={styles.pdfIcon}>📄 Xem hóa đơn</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    padding: parseSizeWidth(16),
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: parseSizeHeight(12),
  },
  dateInputWrapper: {
    flex: 1,
    marginRight: parseSizeWidth(8),
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: parseSizeWidth(12),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: parseSizeWidth(8),
    justifyContent: 'center',
  },
  dateInputText: {
    fontSize: parseSizeWidth(14),
    color: '#333',
  },
  inputSearch: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: parseSizeWidth(8),
    paddingHorizontal: parseSizeWidth(12),
    paddingVertical: parseSizeHeight(10),
    fontSize: parseSizeWidth(14),
    marginRight: parseSizeWidth(8),
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: parseSizeWidth(44),
    height: parseSizeWidth(44),
    borderRadius: parseSizeWidth(8),
    backgroundColor: '#0057a3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: parseSizeWidth(20),
    height: parseSizeWidth(20),
    tintColor: '#fff',
  },
  listContainer: {
    padding: parseSizeWidth(16),
  },
  receiptCard: {
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: parseSizeHeight(6),
  },
  labelBold: {
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  pdfActionRow: {
    marginTop: parseSizeHeight(12),
    alignItems: 'flex-end',
  },
  pdfIcon: {
    fontSize: parseSizeWidth(14),
    color: '#d32f2f',
    fontWeight: '500',
  },
});

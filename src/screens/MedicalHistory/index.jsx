import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { parseSizeWidth, parseSizeHeight } from '../../theme';
import MyHeader from '../../components/Header/MyHeader';
import { useNavigation } from '@react-navigation/native';

const sampleData = [
  {
    id: '1',
    date: '2025-06-15',
    department: 'Nội tổng quát',
    doctor: 'BS. Nguyễn Văn A',
    hospitalCode: 'VIEN123',
  },
  {
    id: '2',
    date: '2025-06-28',
    department: 'Tai mũi họng',
    doctor: 'BS. Trần Thị B',
    hospitalCode: 'VIEN456',
  },
];

const MedicalHistory = () => {
  const navigation = useNavigation();

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showPicker, setShowPicker] = useState({ from: false, to: false });

  const [open, setOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState('');
  const [departments] = useState([
    { label: 'Tất cả', value: '' },
    { label: 'Nội tổng quát', value: 'Nội tổng quát' },
    { label: 'Tai mũi họng', value: 'Tai mũi họng' },
    { label: 'Da liễu', value: 'Da liễu' },
  ]);

  const filteredData = sampleData.filter(item => {
    const itemDate = new Date(item.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const inRange = (!from || itemDate >= from) && (!to || itemDate <= to);
    const matchDept = selectedDept ? item.department === selectedDept : true;

    return inRange && matchDept;
  });

  const formatDate = date =>
    date ? new Date(date).toLocaleDateString('vi-VN') : 'Chọn ngày';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('detailMedicalHistory', { id: '1' })}
    >
      <Text style={styles.date}>{formatDate(item.date)}</Text>
      <Text style={styles.info}>Khoa: {item.department}</Text>
      <Text style={styles.info}>Bác sĩ: {item.doctor}</Text>
      <Text style={styles.info}>Mã vào viện: {item.hospitalCode}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <MyHeader headerTitle="Lịch sử khám bệnh" />
      <View style={styles.container}>
        {/* Bộ lọc */}
        <View style={styles.filterBox}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker({ ...showPicker, from: true })}
            >
              <Text style={styles.dateText}>Từ: {formatDate(fromDate)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker({ ...showPicker, to: true })}
            >
              <Text style={styles.dateText}>Đến: {formatDate(toDate)}</Text>
            </TouchableOpacity>
          </View>

          {showPicker.from && (
            <DateTimePicker
              value={fromDate ? new Date(fromDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker({ ...showPicker, from: false });
                if (selectedDate) setFromDate(selectedDate);
              }}
            />
          )}

          {showPicker.to && (
            <DateTimePicker
              value={toDate ? new Date(toDate) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker({ ...showPicker, to: false });
                if (selectedDate) setToDate(selectedDate);
              }}
            />
          )}

          <DropDownPicker
            open={open}
            value={selectedDept}
            items={departments}
            setOpen={setOpen}
            setValue={setSelectedDept}
            placeholder="Chọn khoa"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ fontSize: parseSizeWidth(14) }}
            zIndex={1000}
          />
        </View>

        {/* Danh sách */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không có kết quả</Text>
          }
          contentContainerStyle={{ paddingBottom: parseSizeHeight(40) }}
        />
      </View>
    </>
  );
};

export default MedicalHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: parseSizeWidth(16),
    backgroundColor: '#f2f5f9',
  },
  filterBox: {
    backgroundColor: '#fff',
    padding: parseSizeWidth(12),
    borderRadius: parseSizeWidth(10),
    marginBottom: parseSizeHeight(16),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 1000, // Để dropdown không bị che
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: parseSizeHeight(12),
  },
  dateButton: {
    flex: 1,
    marginRight: parseSizeWidth(8),
    paddingVertical: parseSizeHeight(10),
    paddingHorizontal: parseSizeWidth(12),
    borderRadius: parseSizeWidth(8),
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: parseSizeWidth(14),
    color: '#333',
  },
  dropdown: {
    borderRadius: parseSizeWidth(8),
    borderColor: '#ccc',
    marginBottom: parseSizeHeight(8),
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: parseSizeWidth(8),
  },
  card: {
    backgroundColor: '#fff',
    padding: parseSizeWidth(16),
    borderRadius: parseSizeWidth(10),
    marginBottom: parseSizeHeight(12),
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  date: {
    fontWeight: 'bold',
    fontSize: parseSizeWidth(14),
    color: '#0057a3',
    marginBottom: parseSizeHeight(4),
  },
  info: {
    fontSize: parseSizeWidth(13),
    color: '#333',
    marginBottom: parseSizeHeight(2),
  },
  emptyText: {
    fontSize: parseSizeWidth(14),
    color: '#999',
    textAlign: 'center',
    marginTop: parseSizeHeight(20),
  },
});

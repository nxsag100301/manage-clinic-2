import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { getStatisticalData } from '../../api';
import MyHeader from '../../components/Header/MyHeader';

const Report = () => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (ngay, denngay) => {
    setLoading(true);
    const res = await getStatisticalData({ ngay, denngay });
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    const defaultFrom = dayjs().subtract(30, 'day').format('DD/MM/YYYY');
    const defaultTo = dayjs().format('DD/MM/YYYY');
    fetchData(defaultFrom, defaultTo);
  }, []);

  const handleFilter = () => {
    const from = dayjs(fromDate).format('DD/MM/YYYY');
    const to = dayjs(toDate).format('DD/MM/YYYY');
    fetchData(from, to);
  };

  const renderRow = (label, value, isMoney = true) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {Number(value).toLocaleString()} {isMoney ? 'đ' : ''}
      </Text>
    </View>
  );

  return (
    <>
      <MyHeader headerTitle="Thống kê" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Bộ lọc ngày */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>
              {dayjs(fromDate).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={styles.dateInput}
          >
            <Text style={styles.dateText}>
              {dayjs(toDate).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFilter} style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>Lọc</Text>
          </TouchableOpacity>
        </View>

        {/* Date pickers */}
        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowFromPicker(false);
              if (selectedDate) setFromDate(selectedDate);
            }}
          />
        )}
        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(event, selectedDate) => {
              setShowToPicker(false);
              if (selectedDate) setToDate(selectedDate);
            }}
          />
        )}

        {/* Loading */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        )}

        {/* Nội dung thống kê */}
        {!loading && data && (
          <>
            {/* Bệnh nhân */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { color: '#1d4ed8' }]}>
                Thống kê bệnh nhân
              </Text>
              {renderRow('Tổng số bệnh nhân', data.tongSoBN, false)}
              {renderRow('Bệnh nhân mới', data.tongSoBNMoi, false)}
              {renderRow('Bệnh nhân cũ', data.tongSoBNCu, false)}
              {renderRow('Bệnh nhân BHYT', data.tongSoBNBHYT, false)}
              {renderRow('Bệnh nhân dịch vụ', data.tongSoBNDV, false)}
            </View>

            {/* Doanh thu */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { color: '#047857' }]}>
                Thống kê doanh thu
              </Text>
              {renderRow('Tổng doanh thu', data.tongDoanhThu)}
              {renderRow('Doanh thu BH', data.tongDoanhThuBH)}
              {renderRow('Doanh thu DV', data.tongDoanhThuDV)}
              {renderRow('Doanh thu thuốc', data.tongDoanhThuThuoc)}
              {renderRow('Thuốc BH', data.tongDoanhThuThuocBH)}
              {renderRow('Thuốc DV', data.tongDoanhThuThuocDV)}
              {renderRow('Thu ngân thu', data.thuNgan)}
            </View>

            {/* DV kỹ thuật */}
            <View style={styles.card}>
              <Text style={[styles.cardTitle, { color: '#6b21a8' }]}>
                Doanh thu DV kỹ thuật
              </Text>
              {renderRow('Tổng DVKT', data.tongDoanhThuDVKT)}
              {renderRow('DVKT BH', data.tongDoanhThuDVKTBH)}
              {renderRow('DVKT DV', data.tongDoanhThuDVKTDV)}
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    flexGrow: 1,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#d1d5db',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  dateText: {
    color: '#111827',
    fontSize: 14,
  },
  filterBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  filterBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#374151',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});

export default Report;

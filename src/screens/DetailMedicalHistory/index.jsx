import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { parseSizeWidth, parseSizeHeight } from '../../theme';
import MyHeader from '../../components/Header/MyHeader';

const Tab = createMaterialTopTabNavigator();

// Màn hình chính chứa header và các tab
const DetailMedicalHistory = ({ route }) => {
  const { id } = route.params;

  return (
    <>
      <MyHeader headerTitle="Chi tiết khám bệnh" />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: parseSizeWidth(13), fontWeight: '600' },
          tabBarIndicatorStyle: { backgroundColor: '#0057a3' },
        }}
      >
        <Tab.Screen name="Chẩn đoán" component={TabDiagnosis} />
        <Tab.Screen name="Chỉ định" component={TabServices} />
        <Tab.Screen name="Thuốc" component={TabMedications} />
      </Tab.Navigator>
    </>
  );
};

// Tab 1: Chẩn đoán
const TabDiagnosis = () => {
  const data = [
    {
      department: 'Nội tổng quát',
      dateTime: '2025-06-28 08:30',
      doctor: 'BS. Nguyễn Văn A',
      room: 'P101',
      symptoms: 'Sốt, ho, mệt mỏi',
      diagnosis: ['Cảm cúm', 'Viêm họng nhẹ'],
      vitals: {
        temperature: '37.5°C',
        pulse: '80 bpm',
        bloodPressure: '120/80 mmHg',
      },
    },
  ];

  return (
    <ScrollView style={styles.tabContainer}>
      {/* Sinh hiệu */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Sinh hiệu</Text>
        <Text>Nhiệt độ: {data[0].vitals.temperature}</Text>
        <Text>Nhịp tim: {data[0].vitals.pulse}</Text>
        <Text>Huyết áp: {data[0].vitals.bloodPressure}</Text>
      </View>

      {/* Theo từng khoa */}
      {data.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.sectionTitle}>{item.department}</Text>
          <Text>Ngày giờ khám: {item.dateTime}</Text>
          <Text>Bác sĩ khám: {item.doctor}</Text>
          <Text>Phòng khám: {item.room}</Text>
          <Text>Triệu chứng: {item.symptoms}</Text>
          <Text style={styles.subTitle}>Chẩn đoán:</Text>
          {item.diagnosis.map((d, i) => (
            <Text key={i}>- {d}</Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

// Tab 2: Chỉ định
const TabServices = () => {
  const data = [
    {
      department: 'Xét nghiệm',
      services: [
        {
          name: 'Công thức máu',
          quantity: 1,
          unit: 'lần',
          doctor: 'BS. Trần Thị B',
          hasResult: true,
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.tabContainer}>
      {data.map((dept, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.sectionTitle}>{dept.department}</Text>
          {dept.services.map((s, i) => (
            <View key={i} style={styles.rowBetween}>
              <View style={styles.flex1}>
                <Text>{s.name}</Text>
                <Text style={styles.subDetail}>
                  SL: {s.quantity} {s.unit}
                </Text>
                <Text style={styles.subDetail}>BS: {s.doctor}</Text>
              </View>
              {s.hasResult && (
                <TouchableOpacity>
                  <Text style={styles.pdfIcon}>📄</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

// Tab 3: Thuốc
const TabMedications = () => {
  const data = [
    {
      department: 'Nội tổng quát',
      prescriptions: [
        {
          code: 'RX001',
          medicines: [
            {
              name: 'Paracetamol',
              quantity: 10,
              unit: 'viên',
              usage: 'Uống sau ăn',
            },
            {
              name: 'Vitamin C',
              quantity: 5,
              unit: 'viên',
              usage: 'Ngày 1 lần',
            },
          ],
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.tabContainer}>
      {data.map((dept, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.sectionTitle}>{dept.department}</Text>
          {dept.prescriptions.map((pres, j) => (
            <View key={j} style={styles.prescriptionBox}>
              <Text style={styles.subTitle}>Mã toa: {pres.code}</Text>
              {pres.medicines.map((med, k) => (
                <View key={k} style={styles.rowBetween}>
                  <View style={styles.flex1}>
                    <Text>{med.name}</Text>
                    <Text style={styles.subDetail}>
                      SL: {med.quantity} {med.unit}
                    </Text>
                    <Text style={styles.subDetail}>Cách dùng: {med.usage}</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={styles.pdfIcon}>📄</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default DetailMedicalHistory;

const styles = StyleSheet.create({
  tabContainer: {
    padding: parseSizeWidth(16),
    backgroundColor: '#f4f6f9',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: parseSizeWidth(12),
    padding: parseSizeWidth(16),
    marginBottom: parseSizeHeight(16),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: parseSizeWidth(15),
    fontWeight: 'bold',
    marginBottom: parseSizeHeight(8),
    color: '#0057a3',
  },
  subTitle: {
    fontWeight: '600',
    marginTop: parseSizeHeight(8),
  },
  subDetail: {
    color: '#666',
    fontSize: parseSizeWidth(13),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: parseSizeHeight(8),
  },
  prescriptionBox: {
    marginTop: parseSizeHeight(10),
  },
  flex1: {
    flex: 1,
  },
});

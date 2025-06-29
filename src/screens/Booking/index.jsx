import { View, Text, FlatList, StyleSheet } from 'react-native';
import MyHeader from '../../components/Header/MyHeader';
import DoctorCard from './conponents/DoctorCard';

const groupedDoctors = [
  {
    title: 'Bác sĩ đa khoa',
    data: Array.from({ length: 3 }),
  },
  {
    title: 'Bác sĩ cơ xương khớp',
    data: Array.from({ length: 5 }),
  },
];

const Booking = () => {
  return (
    <>
      <MyHeader headerTitle="Đặt khám" />
      <View style={styles.content}>
        <FlatList
          data={groupedDoctors}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{item.title}</Text>
              {item.data.map((_, i) => (
                <View key={i} style={styles.cardSpacing}>
                  <DoctorCard />
                </View>
              ))}
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 8,
  },
  section: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardSpacing: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
});

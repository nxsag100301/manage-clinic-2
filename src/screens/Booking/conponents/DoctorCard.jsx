import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import images from '../../../constants/images';
import icons from '../../../constants/icons';

const DoctorCard = () => {
  return (
    <TouchableOpacity style={[styles.card, styles.cardShadow]}>
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Image source={images.doctorAvatar} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text numberOfLines={1} style={styles.doctorName}>
              Bác sĩ: Ngyễn Văn A
            </Text>
          </View>
          <Text numberOfLines={2} style={styles.experience}>
            Gần 35 năm kinh nghiệm trong lĩnh vực Nội Tiêu hóa - Gan mật
          </Text>
          <View style={styles.locationRow}>
            <Image
              source={icons.location}
              style={styles.locationIcon}
              tintColor="black"
            />
            <Text style={styles.locationText}>Thành phố Hồ Chí Minh</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;

const styles = StyleSheet.create({
  card: {
    height: 144,
    borderRadius: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 16,
    elevation: 6,
  },
  cardContent: {
    flexDirection: 'row',
    height: '100%',
    gap: 16,
  },
  avatarContainer: {
    width: '25%',
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  infoContainer: {
    width: '70%',
    justifyContent: 'space-between',
  },
  nameRow: {
    marginBottom: 4,
  },
  doctorName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  experience: {
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  locationText: {
    fontSize: 14,
  },
});

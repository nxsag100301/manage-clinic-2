import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import images from '../../constants/images';
import icons from '../../constants/icons';
import { mockData } from '../../constants/data';

const Home = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.currentUser);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={images.avatar} style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userName}>{user?.TenNhanVien}</Text>
          </View>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            <Image source={icons.search} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.bell} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Looking for</Text>
        <Text style={styles.bannerText}>desired doctor?</Text>
        <Image source={images.avatar} style={styles.bannerImage} />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search for</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>Welcome to NXS Care</Text>

      {/* Action Grid */}
      <View style={styles.actionGrid}>
        {mockData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gridItem}
            onPress={() =>
              item.screen ? navigation.navigate(item.screen) : {}
            }
          >
            <Image
              source={item.icon}
              style={styles.gridIcon}
              tintColor="#177de2"
            />
            <Text style={styles.gridLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    paddingBottom: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 28,
  },
  welcomeText: {
    fontSize: 14,
    color: '#000',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#000',
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    resizeMode: 'contain',
  },
  banner: {
    marginVertical: 24,
    padding: 24,
    backgroundColor: '#177de2',
    borderRadius: 24,
    height: 150,
    position: 'relative',
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  bannerImage: {
    position: 'absolute',
    right: 40,
    top: 16,
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  searchButton: {
    marginTop: 8,
    width: 96,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#177de2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    backgroundColor: '#e8ecf0',
    height: 90,
    width: '47%',
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIcon: {
    width: 40,
    height: 40,
    margin: 8,
  },
  gridLabel: {
    flex: 1,
    fontWeight: '600',
    fontSize: 16,
    color: '#177de2',
  },
});

export default Home;

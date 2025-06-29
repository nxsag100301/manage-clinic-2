import { ScrollView, StyleSheet } from 'react-native';
import Actions from './conponents/Actions';
import Banner from './conponents/Banner';
import HomeHeader from './conponents/HomeHeader';
import { parseSizeHeight } from '../../theme';

const Home = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <Banner />
      <Actions />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    paddingBottom: parseSizeHeight(24),
    paddingTop: parseSizeHeight(12),
    paddingHorizontal: parseSizeHeight(16),
    backgroundColor: '#fff',
  },
});

export default Home;

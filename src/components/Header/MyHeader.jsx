import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { parseSizeHeight, parseSizeWidth, Sizes } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import icons from '../../constants/icons';

const MyHeader = ({ headerTitle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backContainer}
      >
        <Image source={icons.back} tintColor="black" style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {headerTitle ? headerTitle : 'No header'}
      </Text>
      <View style={styles.fakeView} />
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: parseSizeWidth(16),
    paddingVertical: parseSizeHeight(4),
    marginBottom: parseSizeHeight(8),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backContainer: {
    height: parseSizeHeight(30),
    width: parseSizeWidth(12),
    borderRadius: 50,
  },
  backIcon: {
    height: '100%',
    width: '100%',
  },
  headerTitle: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: 500,
  },
  fakeView: {
    height: parseSizeHeight(30),
    width: parseSizeWidth(12),
  },
});

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import images from '../../../constants/images';

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>Looking for</Text>
      <Text style={styles.bannerText}>desired doctor?</Text>
      <Image source={images.avatar} style={styles.bannerImage} />
      <TouchableOpacity style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search for</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
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
});

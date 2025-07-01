import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { mockData } from '../../../constants/data';
import { useNavigation } from '@react-navigation/native';

const Actions = () => {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.sectionTitle}>Welcome to SixOs</Text>
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
    </>
  );
};

export default Actions;

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
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

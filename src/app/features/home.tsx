import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen: React.FC = () => {
  const brandName = 'CHILLY APPLE';
  const logoSource = require('@/assets/images/FinalLogo.png');

  // Create an array with 9 items for displaying 9 logos
  const logos = new Array(9).fill({});

  const renderCategory = ({item}: {item: any}) => {
    return (
      <View style={styles.categoryContainer}>
        <Image source={logoSource} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{brandName}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon
            name="search-outline"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for Products"
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Brand Store */}
      <Text style={styles.sectionTitle}>Brand Store</Text>
      <View style={styles.brandStore}>
        <View style={styles.logoContainer}>
          <Image
            source={logoSource}
            style={styles.logo}
          />
        </View>
        <Text style={styles.brandName}>{brandName}</Text>
      </View>

      {/* Shop by Category */}
      <View>
        <Text style={styles.sectionTitle}>Shop By Category</Text>
        <FlatList
          data={logos}
          renderItem={renderCategory}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      {/* Refer & Earn */}
      <View style={styles.referEarnContainer}>
        <Text style={styles.refertitle}>Refer & Earn</Text>
        <View style={styles.referContainer}>
          <Text style={styles.referText}>
            Refer a friend or family for discounts on all groceries.
          </Text>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatButtonText}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#B61515',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    flex: 1,
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    marginBottom: 10,
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  brandStore: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  brandName: {
    fontSize: 14,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  categoryContainer: {
    width: 120,
    margin: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  referEarnContainer: {
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    gap: 10,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderColor: '#F1DD6A',
    borderRadius: 15,
  },
  referContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  refertitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  referText: {
    flex: 1,
    fontSize: 18,
    color: '#555',
  },
  chatButton: {
    backgroundColor: '#0A9501',
    padding: 10,
    borderRadius: 10,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;

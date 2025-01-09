// src/components/CustomDrawerContent.tsx

import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API_BASE_URL } from '@/src/constants';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

// Types for API response
interface Category {
  id: number;
  name: string;
  child_categories: Category[];
}

interface DynamicSection {
  header_name: string;
  title: any[];
}

interface MenuData {
  Allcategories: Category[];
  dynamic: DynamicSection[];
}

const CustomDrawerContent = ({ navigation }: any) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [dynamicSections, setDynamicSections] = useState<DynamicSection[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: number]: boolean;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching menu data from API
    axios
      .get(`${API_BASE_URL}AppMenus/myMenus.json?city_id=1`)
      .then(response => {
        const data: MenuData = response.data;
        if (data && data.Allcategories && data.dynamic) {
          setCategories(data.Allcategories);
          setDynamicSections(data.dynamic);
        } else {
          console.error('Unexpected API response structure:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const toggleCategory = (id: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
      </View>
      <DrawerContentScrollView>
        {dynamicSections?.map((section, index) => (
          <View key={index}>
            {section.header_name === 'Menu' ? null : (
              <Text style={{ padding: 10, fontSize: 16 }}>
                {section.header_name}
              </Text>
            )}
            {section.title?.map((item, idx) => (
              <View key={idx}>
                <DrawerItem
                  labelStyle={{
                    color: '#000',
                  }}
                  style={styles.drawerItemStyle}
                  label={item.name}
                  onPress={() => {
                    navigation.navigate('DynamicScreen', {
                      title: item.name,
                    });
                  }}
                />
                {item.name === 'Shop By Category' ? (
                  <View>
                    {categories?.map(category => (
                      <View key={category.id}>
                        <TouchableOpacity
                          onPress={() => toggleCategory(category.id)}
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text
                            style={{
                              paddingHorizontal: 25,
                              padding: 10,
                              color: '#000',
                            }}>
                            {category.name}
                          </Text>
                          <Icon
                            name={
                              expandedCategories[category.id]
                                ? 'chevron-up'
                                : 'chevron-down'
                            }
                            size={18}
                            style={{ marginLeft: 'auto', marginRight: 20 }}
                          />
                        </TouchableOpacity>

                        {expandedCategories[category.id] && (
                          <View style={{ paddingLeft: 20 }}>
                            {category.child_categories.map(child => (
                              <DrawerItem
                                key={child.id}
                                label={child.name}
                                onPress={() => {
                                  navigation.navigate('CategoryScreen', {
                                    categoryId: child.id,
                                  });
                                }}
                              />
                            ))}
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        ))}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#B61515',
  },
  title: {
    color: '#fff',
    padding: 20,
    fontSize: 24,
    textAlign: 'center',
  },
  drawerItemStyle: {
    marginVertical: 0,
  },
});

export default CustomDrawerContent;

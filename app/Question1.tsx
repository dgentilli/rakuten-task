import ItemGrid from '@/components/ListItems/ItemGrid';
import ItemRow from '@/components/ListItems/ItemRow';
import { User } from '@/types/User';
import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';

const Question1 = () => {
  const [layout, setLayout] = useState<'list' | 'grid'>('list');
  const mockData = require('../assets/MOCK_DATA.json');
  const [data, setData] = useState(mockData);

  const onPressItem = () => {
    console.log('open item');
  };

  const getNumColumns = useCallback(() => {
    return layout === 'list' ? 1 : 2;
  }, [layout]);

  const getContentContainerStyle = useCallback((): StyleProp<ViewStyle> => {
    return layout === 'grid' ? { alignItems: 'center' } : null;
  }, [layout]);

  const handleMissingLastName = (a: User, b: User) => {
    // If there is no last name, move the user to the end of the list.
    if (!a.last_name && !b.last_name) return 0; // Both missing, equal
    if (!a.last_name) return 1; // a is missing last name, so it comes after b
    if (!b.last_name) return -1; // b is missing last name, so it comes after a
  };

  const compareAscending = useCallback((a: User, b: User) => {
    const missingHandlingResult = handleMissingLastName(a, b);
    if (missingHandlingResult) return missingHandlingResult;

    /** I normally avoid type assertions, but in this case our handleMissingLastName
     *  function will return either 0, 1, or -1 if the last name is null;
     *  So we know we'll have a string to work with
     */
    const aLastName = a.last_name as string;
    const bLastName = b.last_name as string;

    if (aLastName < bLastName) return -1;
    if (aLastName > bLastName) return 1;
    return 0;
  }, []);

  const compareDescending = useCallback((a: User, b: User) => {
    const missingHandlingResult = handleMissingLastName(a, b);
    if (missingHandlingResult) return missingHandlingResult;

    const aLastName = a.last_name as string;
    const bLastName = b.last_name as string;

    if (aLastName < bLastName) return 1;
    if (aLastName > bLastName) return -1;
    return 0;
  }, []);

  const onPressSortAscending = useCallback(() => {
    let tempData = mockData.map((user: User) => ({ ...user }));
    tempData.sort((a: User, b: User) => compareAscending(a, b));
    setData(tempData);
  }, [mockData]);

  const onPressSortDescending = useCallback(() => {
    let tempData = mockData.map((user: User) => ({ ...user }));
    tempData.sort((a: User, b: User) => compareDescending(a, b));
    setData(tempData);
  }, [mockData]);

  const renderItem = ({ item }: { item: User }) => {
    const { id } = item;
    return (
      <TouchableOpacity key={id} onPress={onPressItem}>
        {layout === 'list' ? <ItemRow item={item} /> : <ItemGrid item={item} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.listWrapper}>
        <View style={styles.header}>
          <Text style={styles.headerLeft}>User List</Text>
          <View style={styles.headerRight}>
            {/* // Grid mode */}
            <TouchableOpacity onPress={() => setLayout('grid')}>
              <Image
                style={styles.headerRightItem}
                source={require('../assets/images/grid.png')}
              />
            </TouchableOpacity>

            {/* // List mode */}
            <TouchableOpacity onPress={() => setLayout('list')}>
              <Image
                style={styles.headerRightItem}
                source={require('../assets/images/list.png')}
              />
            </TouchableOpacity>

            {/* // Sort last Name A-Z */}
            <TouchableOpacity onPress={onPressSortAscending}>
              <Image
                style={styles.headerRightItem}
                source={require('../assets/images/sort_az.png')}
              />
            </TouchableOpacity>

            {/* // Sort last Name Z-A */}
            <TouchableOpacity onPress={onPressSortDescending}>
              <Image
                style={styles.headerRightItem}
                source={require('../assets/images/sort_za.png')}
              />
            </TouchableOpacity>

            {/* // Only show elements that have large avatars */}
            <Image
              style={styles.headerRightItem}
              source={require('../assets/images/avatar.png')}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={getContentContainerStyle()}
          data={data}
          renderItem={renderItem}
          numColumns={getNumColumns()}
          key={layout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
  },
  listWrapper: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  headerLeft: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRightItem: {
    width: 30,
    height: 30,
  },
});

export default Question1;

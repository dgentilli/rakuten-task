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
} from 'react-native';

const Question1 = () => {
  const [layout, setLayout] = useState<'list' | 'grid'>('list');

  const onPressItem = () => {
    console.log('open item');
  };

  const getNumColumns = useCallback(() => {
    return layout === 'list' ? 1 : 2;
  }, [layout]);

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
            <Image
              style={styles.headerRightItem}
              source={require('../assets/images/sort_az.png')}
            />
            {/* // Sort last Name Z-A */}
            <Image
              style={styles.headerRightItem}
              source={require('../assets/images/sort_za.png')}
            />
            {/* // Only show elements that have large avatars */}
            <Image
              style={styles.headerRightItem}
              source={require('../assets/images/avatar.png')}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={require('../assets/MOCK_DATA.json')}
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
    alignItems: 'flex-end',
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
  list: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {},
});

export default Question1;

import { User } from '@/types/User';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const DEFAULT_BG_COLOR = '#ffffff';

const Question1 = () => {
  const onPressItem = () => {
    console.log('open item');
  };

  const renderItem = ({ item, index }: { item: User; index: number }) => {
    const {
      id,
      backgroundColor = '',
      avatar = '',
      first_name = '',
      last_name = '',
      email = '',
    } = item;

    return (
      <TouchableOpacity key={id} onPress={onPressItem}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
          }}
        >
          <Image
            // To DO: Break this into a separate component
            // That displays either the large avatar or avatar
            style={{ width: 100, height: 100 }}
            source={{ uri: avatar || '' }}
          />
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Text>
              {first_name} {last_name}
            </Text>
            <Text>{email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View
          style={{
            height: 60,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              paddingTop: 20,
            }}
          >
            User List
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* // Grid mode */}
            <Image
              style={{ width: 30, height: 10 }}
              source={require('../assets/images/grid.png')}
            />
            {/* // List mode */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../assets/images/list.png')}
            />
            {/* // Sort last Name A-Z */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../assets/images/sort_az.png')}
            />
            {/* // Sort last Name Z-A */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../assets/images/sort_za.png')}
            />
            {/* // Only show elements that have large avatars */}
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../assets/images/avatar.png')}
            />
          </View>
        </View>
        <FlatList
          contentContainerStyle={styles.list}
          data={require('../assets/MOCK_DATA.json')}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  list: {
    justifyContent: 'center',
  },
  bar: {},
});

export default Question1;

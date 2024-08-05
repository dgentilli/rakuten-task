import { Colors } from '@/constants/Colors';
import { User } from '@/types/User';
import { Image, StyleSheet, Text, View } from 'react-native';

const DEFAULT_BG_COLOR = Colors.light.background;
const DEFAULT_AVATAR_URI =
  'https://robohash.org/quosrerumnisi.jpg?size=200x200&set=set1';

const ItemRow = ({ item }: { item: User }) => {
  const {
    backgroundColor = '',
    avatar = '',
    first_name = '',
    last_name = '',
    email = '',
  } = item;

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: backgroundColor || DEFAULT_BG_COLOR },
      ]}
    >
      <Image
        style={styles.avatar}
        source={{ uri: avatar || DEFAULT_AVATAR_URI }}
      />
      <View style={styles.textWrapper}>
        <Text numberOfLines={1}>
          {first_name} {last_name}
        </Text>
        <Text numberOfLines={1}>{email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  textWrapper: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default ItemRow;

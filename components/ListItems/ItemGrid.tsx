import { Colors } from '@/constants/Colors';
import { User } from '@/types/User';
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const DEFAULT_BG_COLOR = Colors.light.background;
const DEFAULT_AVATAR_URI =
  'https://robohash.org/quosrerumnisi.jpg?size=200x200&set=set1';
const ITEM_PADDING = 10;
const ITEM_MARGIN = 4;

const ItemGrid = ({ item }: { item: User }) => {
  const {
    backgroundColor = '',
    avatar = '',
    first_name = '',
    last_name = '',
    email = '',
  } = item;
  const { width } = useWindowDimensions();
  const itemWidth = width / 2 - (ITEM_MARGIN + ITEM_PADDING);

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: itemWidth,
          padding: ITEM_PADDING,
          margin: ITEM_MARGIN,
          backgroundColor: backgroundColor || DEFAULT_BG_COLOR,
        },
      ]}
    >
      <Image
        style={styles.avatar}
        source={{ uri: avatar || DEFAULT_AVATAR_URI }}
      />
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.text}>
          {first_name} {last_name}
        </Text>
        <Text numberOfLines={1} style={styles.text}>
          {email}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  text: {
    textAlign: 'center',
  },
  avatar: {
    height: 100,
    width: '100%',
    marginBottom: 10,
  },
});

export default ItemGrid;

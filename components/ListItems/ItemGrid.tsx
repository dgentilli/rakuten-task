import { Colors } from '@/constants/Colors';
import { User } from '@/types/User';
import { Image, Text, useWindowDimensions, View } from 'react-native';

const DEFAULT_BG_COLOR = Colors.light.background;

const ItemGrid = ({ item }: { item: User }) => {
  const {
    backgroundColor = '',
    avatar = '',
    first_name = '',
    last_name = '',
    email = '',
  } = item;
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: width / 2,
        padding: 10,
        margin: 5,
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
  );
};

export default ItemGrid;

import { Colors } from '@/constants/Colors';
import { User } from '@/types/User';
import { Image, Text, View } from 'react-native';

const DEFAULT_BG_COLOR = Colors.light.background;

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
  );
};

export default ItemRow;

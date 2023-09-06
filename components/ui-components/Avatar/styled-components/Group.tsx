import { View } from 'react-native';
import { styled } from '../../styled';

export default styled(
  View,
  {
    flexDirection: 'row-reverse',
    position: 'relative',
    _avatar: {
      ml: -10,
    },
  },
  {
    componentName: 'AvatarGroup',
    descendantStyle: ['_avatar'],
  } as const
);

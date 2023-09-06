import { FlatList } from 'react-native';
import { styled } from '../../styled';

export default styled(
  FlatList,
  {
    w: '$full',
    h: 'auto',
  },
  {
    componentName: 'ActionsheetFlatList',
  } as const
);

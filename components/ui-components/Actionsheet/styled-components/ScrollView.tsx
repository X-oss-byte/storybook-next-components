import { ScrollView } from 'react-native';
import { styled } from '../../styled';

export default styled(
  ScrollView,
  {
    w: '$full',
    h: 'auto',
  },
  {
    componentName: 'ActionsheetScrollView',
  } as const
);

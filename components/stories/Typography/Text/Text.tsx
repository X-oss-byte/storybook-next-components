import React from 'react';
import { Text } from '../../../ui-components';

const TextStory = ({ size = 'md', text = 'Hello world', ...props }: any) => {
  return (
    <Text size={size} {...props}>
      {text}
    </Text>
  );
};

export default TextStory;

export { Text };

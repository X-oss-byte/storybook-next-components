import React from 'react';
import {
  Text,
  Divider,
  VStack,
  HStack,
  Box,
  Center,
  Heading,
  Button,
} from '../../../ui-components';

const DividerStory = ({ ...props }) => {
  return (
    <HStack
      flexDirection={props.orientation === 'vertical' ? 'row' : 'column'}
      h={props.orientation === 'vertical' ? 30 : 'auto'}
      alignItems="center"
      justifyContent="center"
    >
      <Heading size="sm" fontWeight="$semibold">
        Firefox
      </Heading>
      <Divider {...props} m="$3" />
      <Heading size="sm" fontWeight="$semibold">
        Chrome
      </Heading>
    </HStack>
  );
};

export default DividerStory;

export { Text, VStack, HStack, Divider, Box, Center, Heading, Button };

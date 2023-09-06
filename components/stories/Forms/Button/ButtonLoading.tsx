import React from 'react';
import type { ComponentStory } from '@storybook/react-native';

import { HStack } from '@gluestack-ui/themed';
import { Button, ButtonSpinner, ButtonText } from '@gluestack-ui/themed';

type MyButtonStory = ComponentStory<typeof Button>;

const ButtonIsLoadingExample: MyButtonStory = ({}) => {
  const [isLoading] = React.useState(true);
  return (
    <HStack space="md">
      <Button
        disabled={isLoading}
        focusable={!isLoading}
        opacity={isLoading ? 0.4 : 1}
        action="negative"
      >
        <ButtonSpinner color="white" />
      </Button>
      <Button
        disabled={isLoading}
        focusable={!isLoading}
        opacity={isLoading ? 0.4 : 1}
        action="negative"
      >
        <ButtonSpinner color="white" mr="$2" />
        <ButtonText>Submitting</ButtonText>
      </Button>
      <Button
        disabled={isLoading}
        focusable={!isLoading}
        opacity={isLoading ? 0.4 : 1}
        action="negative"
      >
        <ButtonText>Submitting</ButtonText>
        <ButtonSpinner color="white" ml="$2" />
      </Button>
    </HStack>
  );
};

export default ButtonIsLoadingExample;

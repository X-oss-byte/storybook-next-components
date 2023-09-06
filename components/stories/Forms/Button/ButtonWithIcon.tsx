import React from 'react';
import type { ComponentStory } from '@storybook/react-native';
import { AddIcon, InfoIcon, HStack } from '@gluestack-ui/themed';
import { Button, ButtonIcon, ButtonText } from '@gluestack-ui/themed';

type MyButtonStory = ComponentStory<typeof Button>;

const ButtonWithIconsTemp: MyButtonStory = ({}) => {
  return (
    <HStack space="md">
      <Button>
        <ButtonIcon as={InfoIcon} mr="$2" />
        <ButtonText>LeftIcon</ButtonText>
      </Button>
      <Button variant="solid">
        <ButtonText>RightIcon</ButtonText>
        <ButtonIcon as={AddIcon} ml="$2" />
      </Button>
    </HStack>
  );
};

export default ButtonWithIconsTemp;

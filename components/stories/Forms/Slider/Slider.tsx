import React from 'react';
import {
  Text,
  Slider,
  VStack,
  HStack,
  Box,
  Icon,
  Heading,
  Tooltip,
  Button,
  Center,
} from '../../../ui-components';

import { Volume, Volume2Icon, LightbulbIcon } from 'lucide-react-native';

const SliderStory = ({ value: valueProp = 60, ...props }: any) => {
  const [sliderValue, setSliderValue] = React.useState(0);
  const handleChange = (value: any) => {
    setSliderValue(value);
  };

  React.useEffect(() => {
    handleChange(valueProp);
  }, [valueProp]);

  return (
    <Slider
      {...props}
      w={300}
      h={300}
      mt="$4"
      value={sliderValue}
      onChange={(value: any) => {
        handleChange(value);
      }}
    >
      <Slider.Track>
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
  );
};

export default SliderStory;

export {
  Slider,
  VStack,
  Volume,
  HStack,
  Volume2Icon,
  Text,
  Box,
  LightbulbIcon,
  Icon,
  Heading,
  Tooltip,
  Button,
  Center,
};

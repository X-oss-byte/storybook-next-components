import type { ComponentMeta } from '@storybook/react-native';
import { TextareaStory as Textarea } from './Textarea';

const TextareaMeta: ComponentMeta<typeof Textarea> = {
  title: 'stories/FORMS/Textarea',
  component: Textarea,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    isInvalid: {
      control: 'boolean',
      options: [true, false],
    },
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: { size: 'md', isInvalid: false, isDisabled: false },
  parameters: {
    docs: {
      description: {
        component:
          'The **Textarea** component helps create multi-line text inputs.',
      },
    },
  },
};

export default TextareaMeta;

export { Textarea };

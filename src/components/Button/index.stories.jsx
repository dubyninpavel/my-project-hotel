import Button from './index';

export default {
  title: 'button',
  component: Button,
  argTypes: {
    variant: {
      type: 'string',
      description: 'Варианты внешнего вида кнопки',
      options: ['contained', 'pure'],
      control: {
        type: 'radio',
      },
    },
    type: {
      type: 'string',
      description: 'Тип кнопки',
      options: ['button', 'submit'],
      control: {
        type: 'radio',
      },
    },
    children: {
      type: 'string',
      name: 'label',
      defaultValue: 'Click',
    },
  },
};

const Template = (arg) => <Button {...arg} />;

export const Contained = Template.bind({});
Contained.args = {
  variant: 'contained',
  children: 'Войти',
};

export const Pure = Template.bind({});
Pure.args = {
  variant: 'pure',
  children: 'Выйти',
};

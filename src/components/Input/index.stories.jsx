import Input from './index';

export default {
  title: 'input',
  component: Input,
  argTypes: {
    name: {
      type: 'string',
      description: 'Имя инпута',
    },
    label: {
      type: 'string',
      description: 'Название label',
    },
    type: {
      type: 'string',
      description: 'Тип инпута',
      options: ['text', 'search'],
      control: {
        type: 'radio',
      },
    },
  },
};

const Template = (arg) => <Input {...arg} />;

export const Location = Template.bind({});
Location.args = {
  name: 'location',
  label: 'Локация',
  type: 'text',
};

export const Days = Template.bind({});
Days.args = {
  name: 'days',
  label: 'Количество дней',
  type: 'text',
};

export const Login = Template.bind({});
Login.args = {
  name: 'login',
  label: 'Логин',
  type: 'text',
};

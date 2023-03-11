import FilterButton from './index';

export default {
  title: 'filter button',
  component: FilterButton,
  argTypes: {
    children: {
      type: 'string',
      name: 'button',
      defaultValue: 'Click',
    },
  },
};

const Template = (arg) => <FilterButton {...arg} />;

export const Contained = Template.bind({});
Contained.args = {
  children: 'Рейтинг',
};

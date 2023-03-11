import FilterCheckbox from './index';

export default {
  title: 'checkbox',
  component: FilterCheckbox,
  argTypes: {
  },
};

const Template = (arg) => <FilterCheckbox {...arg} />;

export const Like = Template.bind({});
Like.args = {
};

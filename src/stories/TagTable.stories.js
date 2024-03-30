import React from 'react';
import TagTable from '../TagTable';

export default {
  title: 'TagTable',
  component: TagTable,
};

const Template = (args) => <TagTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  tags: [
    { name: 'Tag1', count: 10 },
    { name: 'Tag2', count: 20 },
    // Add more tags as needed
  ],
};

export const WithSorting = Template.bind({});
WithSorting.args = {
  ...Default.args,
  onSort: (field) => console.log(`Sorting by ${field}`),
};
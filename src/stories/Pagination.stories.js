import React from 'react';
import { action } from '@storybook/addon-actions';
import Pagination from '@mui/material/Pagination';

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 10,
  page: 1,
  onChange: action('page changed'),
};

export default {
  title: 'Pagination',
  component: Pagination,
};
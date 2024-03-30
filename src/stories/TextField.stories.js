import React from 'react';
import TextField from '@mui/material/TextField';

const Template = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Limit",
  type: "number",
  value: 5,
  onChange: () => {},
};

export default {
  title: 'TextField',
  component: TextField,
  argTypes: {
    onChange: { action: 'changed' },
  },
};
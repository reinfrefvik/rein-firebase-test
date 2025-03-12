import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { AddMagicItem } from '../addMagicItemForm';
import '../AddMagicItemForm.css';
import '../MagicItem.css';

const meta = {
    title: 'MagicItem/AddMagicItem',
    component: AddMagicItem,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

} satisfies Meta<typeof AddMagicItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        addMagicItem: fn()
    },
};

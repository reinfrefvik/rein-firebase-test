import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MagicItem } from '../magicItem';
import '../MagicItem.css';

const meta = {
    title: 'MagicItem/MagicItem',
    component: MagicItem,
    parameters: {
    },
    tags: ['autodocs'],

} satisfies Meta<typeof MagicItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        item: {
            mi_title: "Test Title",
            mi_type: "Test Type",
            mi_attunement: false,
            mi_description: "Test Description"
        },
        getModalItem: fn()
    },
};

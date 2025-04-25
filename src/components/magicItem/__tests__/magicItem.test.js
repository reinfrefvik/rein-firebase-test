import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MagicItem } from '../magicItem';
import { getMockMagicItem } from '../../helpers/mocks';

const props = {
    item: getMockMagicItem(),
    getModalItem: jest.fn(),
};

test('MagicItem Should Render Text Props', () => {
    render(<MagicItem key={1} item={props.item} getModalItem={props.getModalItem}/>);
    expect(screen.getByText(props.item.mi_title)).toBeInTheDocument();
    expect(screen.getByText(props.item.mi_description)).toBeInTheDocument();
    expect(screen.getByText(/.*Requires Attunement.*/)).toBeInTheDocument();
});

test('MagicItem Should Render Text Props Without Attunement', () => {
    props.item.mi_attunement = false;

    render(<MagicItem key={1} item={props.item} getModalItem={props.getModalItem}/>);
    expect(screen.getByText(props.item.mi_title)).toBeInTheDocument();
    expect(screen.getByText(props.item.mi_description)).toBeInTheDocument();
    expect(screen.queryByText(/.*Requires Attunement.*/)).not.toBeInTheDocument();
});


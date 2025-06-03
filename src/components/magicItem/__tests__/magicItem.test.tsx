import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MagicItem } from '../magicItem';
import { getMockMagicItem } from '../../../__mocks__/magicItems';

const props = {
    item: getMockMagicItem(),
};

test('MagicItem Should Render Text Props', () => {
    render(<MagicItem key={1} item={props.item} getModalItem={()=>{}}/>);
    expect(screen.getByText(props.item.mi_title)).toBeInTheDocument();
    expect(screen.getByText(props.item.mi_description)).toBeInTheDocument();
    expect(screen.getByText(/.*Requires Attunement.*/)).toBeInTheDocument();
});

test('MagicItem Should Render Text Props Without Attunement', () => {
    props.item.mi_attunement = false;

    render(<MagicItem key={1} item={props.item} getModalItem={()=>{}}/>);
    expect(screen.getByText(props.item.mi_title)).toBeInTheDocument();
    expect(screen.getByText(props.item.mi_description)).toBeInTheDocument();
    expect(screen.queryByText(/.*Requires Attunement.*/)).not.toBeInTheDocument();
});


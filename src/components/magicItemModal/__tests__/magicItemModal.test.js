import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { ItemModal } from '../magicItemModal';
import { getMockMagicItem } from 'helpers/mocks';


test('Item Modal Should Render ', () => {
    render(
    <>
        <div id="modal"/>
        <ItemModal 
            modalItem={getMockMagicItem()}
            onClose={() => {}}
            onDelete={() => {}}
            onEditSaved={() => {}}/>
    </>
    );
});

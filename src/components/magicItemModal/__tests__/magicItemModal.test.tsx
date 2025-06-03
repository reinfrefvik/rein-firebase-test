import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { ItemModal } from '../magicItemModal';
import { getMockMagicItem } from '@/__mocks__/magicItems';
import { vi } from 'vitest';
import { Mock } from 'vitest';
import { useAuth } from '@/contexts/useAuth'; 
import { mockUseAuthLoggedIn } from '@/__mocks__/useAuthMock';

vi.mock('@/contexts/useAuth', () => ({
    useAuth: vi.fn(),
  }));

test('Item Modal Should Render ', () => {
    const mockedUseAuth = mockUseAuthLoggedIn();

    (useAuth as Mock).mockReturnValue(mockedUseAuth);

    render(
    <div>
        <div id="modal"/>
        <ItemModal 
            modalItem={getMockMagicItem()}
            onClose={() => {}}
            onDelete={() => {}}
            onEditSaved={() => {}}/>
    </div>
    );
});

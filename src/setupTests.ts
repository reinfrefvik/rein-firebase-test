import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { useAuth } from '@/contexts/useAuth';

vi.mock('@/context/useAuth', () => ({
    useAuth: vi.fn(() => ({
      user: null,
    })),
  }));


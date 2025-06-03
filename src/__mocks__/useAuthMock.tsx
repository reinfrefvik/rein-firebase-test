import { vi } from "vitest";
import { User } from "firebase/auth";
import { useAuth } from "@/contexts/useAuth";

export const mockUseAuthLoggedIn = () => {
  const mocked = vi.mocked(useAuth);
  mocked.mockReturnValue({
    user: { displayName: "Rein" } as Partial<User>,
    isLoading: false,
    signOut: vi.fn(),
    signIn: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
  });
  return mocked;
};

export const mockUseAuthLoggedOut = () => {
  const mocked = vi.mocked(useAuth);
  mocked.mockReturnValue({
    user: null,
    isLoading: false,
    signOut: vi.fn(),
    signIn: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
  });
  return mocked;
};

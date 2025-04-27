import { vi } from "vitest";

// First, mock the module
vi.mock("@/contexts/useAuth", () => ({
  useAuth: vi.fn(),
}));

// Then import the mocked version
import { useAuth } from "@/contexts/useAuth";

// Export a helper to control the mocked behavior
export const mockUseAuth = () => {
  return vi.mocked(useAuth);
};

export const mockUseAuthLoggedIn = () => {
  const mocked = vi.mocked(useAuth);
  mocked.mockReturnValue({
    user: { displayName: "Rein" },
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

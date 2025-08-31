import { useIsMobile } from './useIsMobile';
import { beforeEach, describe, expect, it, vi } from 'vitest';

function setupMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when window width is <= 640px', () => {
    setupMatchMedia(true);
    const isMobile = useIsMobile();
    expect(isMobile.value).toBe(true);
  });

  it('returns false when window width is > 640px', () => {
    setupMatchMedia(false);
    const isMobile = useIsMobile();
    expect(isMobile.value).toBe(false);
  });
});

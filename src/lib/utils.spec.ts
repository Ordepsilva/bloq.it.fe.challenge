import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatDate, downloadCsv, share } from './utils';
import { toast } from 'vue-sonner';
import { useShare } from '@vueuse/core';
import { computed } from 'vue';

describe('formatDate', () => {
  it('formats a timestamp to YYYY-MM-DD', () => {
    const ts = new Date('2025-08-31T00:00:00Z').getTime();
    expect(formatDate(ts)).toBe('31/08/2025');
  });
});

vi.mock('@vueuse/core', () => ({
  useShare: vi.fn(),
}));

vi.mock('vue-sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('share', () => {
  const mockShare = vi.fn();
  const mockUseShare = vi.mocked(useShare);

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      writable: true,
    });
  });

  it('calls share when supported', async () => {
    mockUseShare.mockReturnValue({
      share: mockShare.mockResolvedValue(undefined),
      isSupported: computed(() => true),
    });

    await share({ title: 't', text: 'x', url: 'u' });

    expect(mockShare).toHaveBeenCalledWith({ title: 't', text: 'x', url: 'u' });
  });

  it('copies to clipboard when not supported', async () => {
    const clipboardWriteText = vi.fn().mockResolvedValue(undefined);

    mockUseShare.mockReturnValue({
      share: mockShare,
      isSupported: computed(() => false),
    });

    Object.defineProperty(global.navigator, 'clipboard', {
      value: {
        writeText: clipboardWriteText,
      },
      writable: true,
    });

    await share({ title: 't', text: 'x', url: 'u' });

    expect(clipboardWriteText).toHaveBeenCalledWith('t\nx\nu');
    expect(toast.success).toHaveBeenCalledWith('Link copied to clipboard!');
    expect(mockShare).not.toHaveBeenCalled();
  });

  it('shows error toast when share fails', async () => {
    const mockError = new Error('Share failed');

    mockUseShare.mockReturnValue({
      share: mockShare.mockRejectedValue(mockError),
      isSupported: computed(() => true),
    });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await share({ title: 't', text: 'x', url: 'u' });

    expect(mockShare).toHaveBeenCalledWith({ title: 't', text: 'x', url: 'u' });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to share: ', mockError);
    expect(toast.error).toHaveBeenCalledWith('Failed to share');
  });
});

describe('downloadCsv', () => {
  it('triggers a download with correct filename', () => {
    global.URL.createObjectURL = vi.fn(() => 'blob:url');
    global.URL.revokeObjectURL = vi.fn();

    const appendSpy = vi.spyOn(document.body, 'appendChild');
    const removeSpy = vi.spyOn(document.body, 'removeChild');

    // Create a real <a> element, then mock its methods
    const realLink = document.createElement('a');
    const clickMock = vi.fn();
    const setAttrMock = vi.fn();
    realLink.click = clickMock;
    realLink.setAttribute = setAttrMock;

    // Spy on document.createElement and return the realLink
    vi.spyOn(document, 'createElement').mockReturnValue(realLink);

    downloadCsv('test,data', 'file.csv');

    expect(appendSpy).toHaveBeenCalledWith(realLink);
    expect(clickMock).toHaveBeenCalled();
    expect(removeSpy).toHaveBeenCalledWith(realLink);
    expect(setAttrMock).toHaveBeenCalledWith('download', 'file.csv');
  });
});

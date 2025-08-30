import { describe, it, expect } from 'vitest';
import { formatDate } from './utils';

describe('formatDate', () => {
  it('formats a timestamp to YYYY-MM-DD', () => {
    const ts = new Date('2025-08-31T00:00:00Z').getTime();
    expect(formatDate(ts)).toBe('31/08/2025');
  });
});

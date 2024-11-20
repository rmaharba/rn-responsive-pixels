import { Dimensions, Platform } from 'react-native';
import { resPx, resText, resPlatformSize } from '../';

const mockDimensions = {
  width: 375,
  height: 667,
  scale: 1,
  fontScale: 1,
};

describe('Responsive utility functions', () => {
  let consoleWarnSpy: jest.SpyInstance;

  beforeAll(() => {
    // Mock Dimensions to return fixed values
    Dimensions.get = jest.fn(() => mockDimensions);
    // Mock console.warn to suppress warnings during tests
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
    consoleWarnSpy.mockRestore();
  });

  it('should return a numeric value for pixel sizes', () => {
    const value = 10;
    const result = resPx(value);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should return a numeric value for text sizes', () => {
    const pixels = 20;
    const result = resText(pixels);

    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('should return a numeric value for platform-specific size', () => {
    Platform.OS = 'ios';
    const iosSize = 30;
    const androidSize = 40;
    const resultIos = resPlatformSize(iosSize, androidSize);

    expect(typeof resultIos).toBe('number');
    expect(resultIos).toBeGreaterThanOrEqual(0);

    Platform.OS = 'android';
    const resultAndroid = resPlatformSize(iosSize, androidSize);

    expect(typeof resultAndroid).toBe('number');
    expect(resultAndroid).toBeGreaterThanOrEqual(0);
  });

  it('should return 0 when input is NaN or negative', () => {
    expect(resPx(NaN)).toBe(0);
    expect(resPx(-10)).toBe(0);
    expect(resText(NaN)).toBe(0);
    expect(resText(-20)).toBe(0);
    expect(resPlatformSize(NaN, -30)).toBe(0);
    expect(resPlatformSize(-10, NaN)).toBe(0);
  });
});

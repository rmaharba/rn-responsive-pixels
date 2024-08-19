import { Dimensions, Platform, PixelRatio } from 'react-native';

const windowDimensions = Dimensions.get('window');
const { height: windowScreenHeight, width: windowScreenWidth } =
  windowDimensions;

// Reference dimensions for a variety of devices
const referenceDimensions = [
  { width: 375, height: 667 }, // iPhone 8
  { width: 414, height: 896 }, // iPhone 11 Pro Max / iPhone 15 Pro Max
  { width: 390, height: 844 }, // iPhone 13
  { width: 320, height: 568 }, // iPhone SE (2nd generation)
  { width: 360, height: 800 }, // Large Android devices
  { width: 360, height: 640 }, // Small Android devices (~5 inches)
  { width: 412, height: 915 }, // Samsung Galaxy S21 Ultra / High-end Android devices
  { width: 393, height: 873 }, // Emerging new Android devices / Google Pixel 4a
];

// Calculate the minimum ratio based on reference dimensions
const minRatio = Math.min(
  ...referenceDimensions.map((dim) =>
    Math.min(windowScreenWidth / dim.width, windowScreenHeight / dim.height)
  )
);

// Adjust the ratio based on the current aspect ratio of the device
const referenceWidth = 375; // Main reference width for comparison
const referenceHeight = 667; // Main reference height for comparison

const aspectRatioWidth = windowScreenWidth / referenceWidth;
const aspectRatioHeight = windowScreenHeight / referenceHeight;

const adjustedRatio = Math.min(aspectRatioWidth, aspectRatioHeight) * minRatio;

// Optional scale factor (adjustable as needed)
// This can be used to further adjust the final ratio
const scaleFactor = 1.0;

// Calculate the final ratio considering the scale factor
const ratio = adjustedRatio * scaleFactor;

/**
 * Validates that the platform is either iOS or Android.
 * @returns {boolean} True if the platform is supported, false otherwise.
 */
const isPlatformSupported = (): boolean => {
  const supported = Platform.OS === 'ios' || Platform.OS === 'android';
  if (!supported) {
    console.warn(
      `Platform ${Platform.OS} is not supported. Returning the original value.`
    );
  }
  return supported;
};

/**
 * Validates the input value for pixel or text size.
 * @param {number} value - The value to validate.
 * @returns {boolean} True if the value is valid, false otherwise.
 */
const isValidValue = (value: number): boolean => {
  const valid = !isNaN(value) && value >= 0;
  if (!valid) {
    console.warn('Invalid value provided. Returning default value.');
  }
  return valid;
};

const responsivePixels = (value: number): number => {
  if (!isPlatformSupported()) return value;
  if (!isValidValue(value)) return 0;

  return Math.round(value * ratio);
};

const textResponsive = (pixels: number): number => {
  if (!isPlatformSupported()) return pixels;
  if (!isValidValue(pixels)) return 0;

  const scaleWithWidth = windowScreenWidth / referenceWidth; // Base size for text
  const size = pixels * scaleWithWidth;

  const adjustedSize = PixelRatio.roundToNearestPixel(size);
  const adjustment = Platform.OS === 'ios' ? -3 : 0; // Platform adjustment for iOS

  return Math.round(adjustedSize + adjustment);
};

const getSizeForPlatform = (iosSize: number, androidSize: number): number => {
  if (!isPlatformSupported()) return iosSize;
  if (!isValidValue(iosSize) || !isValidValue(androidSize)) return 0;

  return responsivePixels(Platform.OS === 'ios' ? iosSize : androidSize);
};

/**
 * Adjusts pixel sizes according to the device's screen ratio.
 *
 * @param value - The pixel value to adjust.
 * @returns The adjusted pixel value for the current device's screen.
 */
export const resPx = responsivePixels;

/**
 * Adjusts text sizes according to the device's screen width and platform.
 *
 * @param pixels - The base text size in pixels.
 * @returns The adjusted text size for the current device's screen, considering platform-specific adjustments.
 */
export const resText = textResponsive;

/**
 * Gets the size for both platform (iOS or Android).
 *
 * @param iosSize - The size value for iOS.
 * @param androidSize - The size value for Android.
 * @returns The adjusted size for the current platform.
 */
export const resPlatformSize = getSizeForPlatform;

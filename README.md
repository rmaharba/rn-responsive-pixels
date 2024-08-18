# react-native-responsive-pixels

---
### Note ⚠️: This library is still under construction and testing. Some features may be incomplete or subject to change. Please use with caution and provide feedback if you encounter any issues.

A React Native library for adaptive pixel scaling, ensuring consistent UI elements across all screen sizes and densities.

## Installation

```sh
yarn add react-native-responsive-pixels
```

```sh
npm install react-native-responsive-pixels
```

## Usage

### Import the utility functions from the library and use them to adjust pixel and text sizes based on the device's screen dimensions:


```js
import { resPx, resText, resPlatformSize } from 'react-native-responsive-pixels';

// Example usage for pixel sizes
const adjustedPixelSize = resPx(10); // Adjusts pixel size based on device's screen ratio

// Example usage for text sizes
const adjustedTextSize = resText(20); // Adjusts text size considering platform-specific adjustments

// Example usage for platform-specific sizes
const platformSize = resPlatformSize(30, 40); // Adjusts size based on the platform (iOS or Android)
```

## Functions

---
- resPx(value: number): number \n
Adjusts pixel sizes according to the device's screen ratio. Returns an integer value.
---

---
- resText(pixels: number): number \n
Adjusts text sizes based on the screen width and platform. Returns an integer value.
---

---
- resPlatformSize(iosSize: number, androidSize: number): number \n
Returns the size adjusted for the current platform (iOS or Android). Returns an integer value.
---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

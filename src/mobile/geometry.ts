export type MobileDeviceGeometry = {
  device: {
    width: number;
    height: number;
  };
  screen: {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
  };
  safeArea: {
    top: number;
    bottom: number;
  };
  keyboard: {
    height: number;
  };
};

export const iphoneGeometry = {
  // Calibrated against the display mesh in Apple’s iPhone 17 USDZ.
  device: {
    width: 511,
    height: 968,
  },
  screen: {
    x: 55.033,
    y: 47,
    width: 400.934,
    height: 874,
    radius: 47,
  },
  safeArea: {
    top: 62,
    bottom: 34,
  },
  keyboard: {
    height: 338,
  },
} as const satisfies MobileDeviceGeometry;

export type IPhoneGeometry = typeof iphoneGeometry;

import { createContext, type PropsWithChildren, useContext, useMemo } from "react";
import { iphoneGeometry, type MobileDeviceGeometry } from "./geometry";

export type MobileDeviceId = "iphone";
type MobileDevicePreset = {
  id: MobileDeviceId;
  label: string;
  platform: "ios";
  geometry: MobileDeviceGeometry;
};
export const mobileDevices: Record<MobileDeviceId, MobileDevicePreset> = {
  iphone: { id: "iphone", label: "iPhone 17 · Sage", platform: "ios", geometry: iphoneGeometry },
};
const MobileDeviceContext = createContext<{ device: MobileDevicePreset; deviceId: MobileDeviceId } | null>(null);
export function MobileDeviceProvider({ children }: PropsWithChildren) {
  const value = useMemo(() => ({ device: mobileDevices.iphone, deviceId: "iphone" as const }), []);
  return <MobileDeviceContext.Provider value={value}>{children}</MobileDeviceContext.Provider>;
}
export function useMobileDevice() {
  const context = useContext(MobileDeviceContext);
  if (!context) throw new Error("useMobileDevice must be used inside MobileDeviceProvider");
  return context;
}

import {
  createContext,
  type InputHTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type PropsWithChildren,
  type Ref,
  type TextareaHTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./keyboard-keys.css";
import { motion } from "motion/react";
import { mobileAssets } from "./assets";
import { useMobileDevice } from "./Device";

type KeyboardContextValue = {
  visible: boolean;
  height: number;
  fullHeight: number;
  progress: number;
  dragOffset: number;
  isDragging: boolean;
  focusedElement: HTMLElement | null;
  setDragOffset: (offset: number) => void;
  setDragging: (dragging: boolean) => void;
  show: (element?: HTMLElement | null) => void;
  hide: () => void;
};

type KeyboardInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
};

const KeyboardContext = createContext<KeyboardContextValue | null>(null);

export function KeyboardProvider({ children }: PropsWithChildren) {
  const { device } = useMobileDevice();
  const [visible, setVisible] = useState(false);
  const [dragOffset, setRawDragOffset] = useState(0);
  const [isDragging, setDragging] = useState(false);
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  const fullHeight = device.geometry.keyboard.height;
  const setDragOffset = (offset: number) => {
    setRawDragOffset(Math.max(0, Math.min(fullHeight, offset)));
  };

  const value = useMemo<KeyboardContextValue>(
    () => ({
      visible,
      height: visible ? Math.max(0, fullHeight - dragOffset) : 0,
      fullHeight,
      dragOffset,
      isDragging,
      progress: visible ? 1 : 0,
      focusedElement,
      setDragOffset,
      setDragging,
      show: (element) => {
        setRawDragOffset(0);
        setDragging(false);
        setFocusedElement(element ?? null);
        setVisible(true);
      },
      hide: () => {
        focusedElement?.blur();
        setDragging(false);
        setFocusedElement(null);
        setVisible(false);
      },
    }),
    [dragOffset, focusedElement, fullHeight, isDragging, visible],
  );

  // A tap anywhere except a text field or the keyboard dismisses the input session.
  useEffect(() => {
    if (!visible) return;
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('.keyboard-dock, input:not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')) return;
      value.hide();
    };
    document.addEventListener('pointerdown', dismissOutside, true);
    return () => document.removeEventListener('pointerdown', dismissOutside, true);
  }, [visible, value]);

  return <KeyboardContext.Provider value={value}>{children}</KeyboardContext.Provider>;
}

export function useKeyboard() {
  const context = useContext(KeyboardContext);

  if (!context) {
    throw new Error("useKeyboard must be used inside KeyboardProvider");
  }

  return context;
}

export function useKeyboardInsets() {
  const keyboard = useKeyboard();
  const { device } = useMobileDevice();
  const reservesAndroidNavigation = device.platform === "android" && !keyboard.visible;

  return {
    keyboardHeight: keyboard.height,
    keyboardFullHeight: keyboard.fullHeight,
    keyboardDragging: keyboard.isDragging,
    bottomInset: reservesAndroidNavigation
      ? 0
      : device.platform === "android"
        ? keyboard.height
        : Math.max(device.geometry.safeArea.bottom, keyboard.height),
    availableHeight:
      device.geometry.screen.height -
      keyboard.height -
      (reservesAndroidNavigation ? device.geometry.safeArea.bottom : 0),
    isKeyboardVisible: keyboard.visible,
  };
}

export function useKeyboardDismissDrag() {
  const keyboard = useKeyboard();
  const dragRef = useRef({
    pointerId: null as number | null,
    startY: 0,
    lastY: 0,
    lastTime: 0,
    velocityY: 0,
  });

  const endDismissDrag = (event: ReactPointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (drag.pointerId !== event.pointerId) return;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Capture may already be gone after pointer cancel.
    }

    const nextY = Math.max(0, event.clientY - drag.startY);
    const shouldDismiss = nextY > 76 || drag.velocityY > 0.45;
    drag.pointerId = null;

    if (shouldDismiss) {
      keyboard.setDragOffset(nextY);
      keyboard.hide();
      return;
    }

    keyboard.setDragging(false);
    keyboard.setDragOffset(0);
  };

  return {
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
      if (!keyboard.visible) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (
        event.target instanceof Element &&
        event.target.closest('button, input, textarea, select, a, [role="button"], [contenteditable="true"]')
      ) {
        return;
      }

      keyboard.setDragging(true);
      dragRef.current = {
        pointerId: event.pointerId,
        startY: event.clientY,
        lastY: event.clientY,
        lastTime: performance.now(),
        velocityY: 0,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
      const drag = dragRef.current;
      if (drag.pointerId !== event.pointerId) return;

      const now = performance.now();
      const elapsed = Math.max(1, now - drag.lastTime);
      drag.velocityY = (event.clientY - drag.lastY) / elapsed;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      keyboard.setDragOffset(Math.max(0, event.clientY - drag.startY));
    },
    onPointerUp: endDismissDrag,
    onPointerCancel: endDismissDrag,
  };
}

export function KeyboardInput(props: KeyboardInputProps) {
  const keyboard = useKeyboard();
  const { ref, ...inputProps } = props;

  return (
    <input
      {...inputProps}
      ref={ref}
      onFocus={(event) => {
        keyboard.show(event.currentTarget);
        inputProps.onFocus?.(event);
      }}
      onBlur={(event) => {
        inputProps.onBlur?.(event);
        // Allow focus to move directly to a second field without flashing the keyboard.
        queueMicrotask(() => {
          if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) keyboard.hide();
        });
      }}
    />
  );
}

export function KeyboardTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const keyboard = useKeyboard();

  return (
    <textarea
      {...props}
      onFocus={(event) => {
        keyboard.show(event.currentTarget);
        props.onFocus?.(event);
      }}
      onBlur={(event) => {
        props.onBlur?.(event);
        queueMicrotask(() => {
          if (!(document.activeElement instanceof HTMLInputElement) && !(document.activeElement instanceof HTMLTextAreaElement)) keyboard.hide();
        });
      }}
    />
  );
}

export function KeyboardDock() {
  const keyboard = useKeyboard();
  const { device } = useMobileDevice();
  const dismissDrag = useKeyboardDismissDrag();
  const [numeric, setNumeric] = useState(false);
  const [shift, setShift] = useState(false);
  const [symbols, setSymbols] = useState(false);
  useEffect(() => { if (keyboard.focusedElement) { setNumeric(keyboard.focusedElement.getAttribute('inputmode') === 'decimal'); setShift(false); setSymbols(false); } }, [keyboard.focusedElement]);
  const typeKey = (text: string) => {
    const input = keyboard.focusedElement;
    if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) return;
    if (text === 'Enter') {
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      keyboard.hide();
      return;
    }
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? start;
    const from = text === 'Backspace' && start === end ? Math.max(0, start - 1) : start;
    const insertion = text === 'Backspace' ? '' : text;
    const next = input.value.slice(0, from) + insertion + input.value.slice(end);
    if (input.maxLength >= 0 && next.length > input.maxLength) return;
    const prototype = input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(input, next);
    input.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: text === 'Backspace' ? 'deleteContentBackward' : 'insertText', data: insertion }));
    const cursor = from + insertion.length;
    requestAnimationFrame(() => { if (document.activeElement === input) input.setSelectionRange(Math.min(cursor, input.value.length), Math.min(cursor, input.value.length)); });
    if (shift) setShift(false);
  };
  const key = (label: string, x: number, y: number, w: number, h: number, action: () => void, visible = false) => (
    <button key={label} type="button" className={'mobile-key ' + (visible ? 'mobile-key-painted' : '')} aria-label={label}
      tabIndex={keyboard.visible ? 0 : -1}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
      onPointerDown={event => event.preventDefault()} onClick={action}>{visible ? label : null}</button>
  );
  const letterRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const numberRows = symbols ? ["[]{}#%^*+=", "_\\|~<>\u20ac\u00a3\u00a5\u2022", ".,?!'"] : ["1234567890", "-/:;()$&@\"", ".,?!'"];
  const keyboardTransition = keyboard.isDragging
    ? { duration: 0 }
    : { duration: 0.26, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] };

  return (
    <motion.div
      className="keyboard-dock"
      data-platform={device.platform}
      data-testid="keyboard-dock"
      data-visible={keyboard.visible ? "true" : "false"}
      initial={{ y: keyboard.fullHeight }}
      animate={{ y: keyboard.visible ? keyboard.dragOffset : keyboard.fullHeight }}
      aria-hidden={keyboard.visible ? undefined : "true"}
      style={{ height: keyboard.fullHeight }}
      transition={keyboardTransition}
      {...dismissDrag}
    >
      <img
        className="keyboard-asset"
        src={device.platform === "android" ? mobileAssets.androidKeyboard : mobileAssets.iphoneKeyboard}
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <div className="mobile-keyboard-keys" data-mode={numeric ? 'numbers' : 'letters'} role="group" aria-label={numeric ? 'Number keyboard' : 'Letter keyboard'}>
        {device.platform === 'android' ? <>
          {Array.from('1234567890').map((character,index)=>key(character, 1+index*10, 15.2, 8.5, 11.4, ()=>typeKey(character)))}
          {numeric ? <>
            <div className="android-numeric-mask" />
            {[numberRows[1], "[]{}#%^*+="].map((row,rowIndex)=>Array.from(row).map((character,index)=>key(character,1+index*9.1,29.1+rowIndex*13.9,7.6,11.4,()=>typeKey(character),true)))}
            {key('#+=',1,57,7.6,11.4,()=>setSymbols(!symbols),true)}
            {key('.',30,57,12,11.4,()=>typeKey('.'),true)}
            {key(',',45,57,12,11.4,()=>typeKey(','),true)}
            {key('?',60,57,12,11.4,()=>typeKey('?'),true)}
          </> : ['qwertyuiop[',"asdfghjkl;'",'zxcvbnm,.'].map((row,rowIndex)=>Array.from(row).map((character,index)=>key(shift?character.toUpperCase():character,(rowIndex===2?10.1:1)+index*9.1,29.1+rowIndex*13.9,7.6,11.4,()=>typeKey(shift?character.toUpperCase():character))))}
          {!numeric && key('Shift',1,57,7.6,11.4,()=>setShift(!shift))}
          {key('Backspace',91,57,8,11.4,()=>typeKey('Backspace'))}
          {key(numeric?'ABC':'123',1,71,13,11.4,()=>setNumeric(!numeric),numeric)}
          {key('Space',34,71,42,11.4,()=>typeKey(' '))}
          {key('Done',86,71,13,11.4,()=>typeKey('Enter'))}
          {key('Hide keyboard',7,91,8,8,()=>keyboard.hide())}
        </> : <>
        {numeric ? <>
          <div className="numeric-keyboard-mask" />
          {numberRows.map((row, rowIndex) => Array.from(row).map((character, index) => {
            const count = row.length;
            const x = rowIndex === 2 ? 16.3 + index * 13.5 : 1.7 + index * 9.85;
            return key(character, x, 16.8 + rowIndex * 16.3, rowIndex === 2 ? 12 : 8.2, 12.5, () => typeKey(character), true);
          }))}
          {key(symbols ? '123' : '#+=', 1.7, 49.4, 12.3, 12.5, () => setSymbols(!symbols), true)}
        </> : letterRows.map((row, rowIndex) => Array.from(row).map((character, index) => key(shift ? character.toUpperCase() : character,
          (rowIndex === 0 ? 1.7 : rowIndex === 1 ? 6.8 : 16.3) + index * 9.85,
          16.8 + rowIndex * 16.3, 8.2, 12.5, () => typeKey(shift ? character.toUpperCase() : character))))}
        {!numeric && key('Shift', 1.7, 49.4, 11.5, 12.5, () => setShift(!shift))}
        {key('Backspace', 87, 49.4, 11.3, 12.5, () => typeKey('Backspace'))}
        {key(numeric ? 'ABC' : '123', 1.7, 65.7, 23, 12.5, () => { setNumeric(!numeric); setSymbols(false); }, numeric)}
        {key('Space', 26.2, 65.7, 47.5, 12.5, () => typeKey(' '))}
        {key('Done', 74.8, 65.7, 23.5, 12.5, () => typeKey('Enter'))}
        </>}
      </div>
    </motion.div>
  );
}

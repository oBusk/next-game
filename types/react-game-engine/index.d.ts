// Project: https://github.com/bberak/react-game-engine
// TypeScript Version: 4.2

declare module "react-game-engine" {
    import {
        Component,
        CSSProperties,
        DragEvent,
        KeyboardEvent,
        MouseEvent,
        TouchEvent,
        WheelEvent,
    } from "react";

    interface DefaultRendererOptions {
        state: any;
        screen: ScaledSize;
    }

    export function DefaultRenderer(
        defaultRendererOptions: DefaultRendererOptions,
    ): any;

    export class DefaultTimer {}

    interface TouchProcessorOptions {
        triggerPressEventBefore: number;
        triggerLongPressEventAfter: number;
        moveThreshold: number;
    }

    export function DefaultTouchProcessor(
        touchProcessorOptions?: TouchProcessorOptions,
    ): any;

    export interface TimeUpdate {
        current: number;
        delta: number;
        previous: number;
        previousDelta: number;
    }

    export interface Input<T = Element> {
        name: string;
        payload: SyntheticEvent<T, Event>;
    }

    export interface MouseInput<T = Element> extends Input {
        name:
            | "onClick"
            | "onDoubleClick"
            | "onContextMenu"
            | "onMouseDown"
            | "onMouseEnter"
            | "onMouseLeave"
            | "onMouseMove"
            | "onMouseOut"
            | "onMouseOver"
            | "onMouseUp";
        payload: MouseEvent<T>;
    }

    export interface DragInput<T = Element> extends Input {
        name:
            | "onDrag"
            | "onDragEnd"
            | "onDragEnter"
            | "onDragExit"
            | "onDragLeave"
            | "onDragOver"
            | "onDragStart"
            | "onDrop";
        payload: DragEvent<T>;
    }

    export interface WheelInput<T = Element> extends Input {
        name: "onWheel";
        payload: WheelEvent<T>;
    }

    export interface TouchInput<T = Element> extends Input {
        name: "onTouchCancel" | "onTouchEnd" | "onTouchMove" | "onTouchStart";
        payload: TouchEvent<T>;
    }

    export interface KeyInput<T = Element> extends Input {
        name: "onKeyDown" | "onKeyPress" | "onKeyUp";
        payload: KeyboardEvent<T>;
    }

    export type AllInput<T = Element> =
        | MouseInput<T>
        | DragInput<T>
        | WheelInput<T>
        | TouchInput<T>
        | KeyInput<T>;

    export interface GameEngineUpdateEventOptionType {
        dispatch: (event: any) => void;
        events: Array<any>;
        screen: ScaledSize;
        time: TimeUpdate;
        input: Array<AllInput>;
    }

    export interface Entity {
        renderer: ReactElement;
        [key: string]: unknown;
    }

    export interface Entities {
        [uniqueId: string]: Entity;
    }

    export type GameEngineSystem = (
        entities: Entities,
        update: GameEngineUpdateEventOptionType,
    ) => Record<string, Entity>;

    export interface GameEngineProperties {
        systems?: GameEngineSystem[];
        entities?: Entities | Promise<Entities>;
        renderer?: any;
        touchProcessor?: any;
        timer?: any;
        running?: boolean;
        onEvent?: any;
        style?: CSSProperties;
        children?: ReactNode;
    }

    export class GameEngine extends Component<GameEngineProperties> {}

    export type TouchEventType =
        | "start"
        | "end"
        | "move"
        | "press"
        | "long-press";

    export interface TouchEvent {
        event: {
            changedTouches: Array<TouchEvent>;
            identifier: number;
            locationX: number;
            locationY: number;
            pageX: number;
            pageY: number;
            target: number;
            timestamp: number;
            touches: Array<TouchEvent>;
        };
        id: number;
        type: TouchEventType;
        delta?: {
            locationX: number;
            locationY: number;
            pageX: number;
            pageY: number;
            timestamp: number;
        };
    }

    interface GameLoopUpdateEventOptionType {
        touches: TouchEvent[];
        screen: ScaledSize;
        time: TimeUpdate;
    }

    export interface GameLoopProperties {
        touchProcessor?: any;
        timer?: any;
        running?: boolean;
        onUpdate?: (args: GameLoopUpdateEventOptionType) => void;
        style?: CSSProperties;
        children?: ReactNode;
    }

    export class GameLoop extends Component<GameLoopProperties> {}
}

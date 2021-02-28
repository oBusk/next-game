// Project: https://github.com/bberak/react-game-engine
// TypeScript Version: 4.2

declare module "react-game-engine" {
    import {
        Component,
        CSSProperties,
        DragEvent,
        KeyboardEvent,
        MouseEvent,
        ReactElement,
        ReactNode,
        TouchEvent,
        WheelEvent,
    } from "react";

    /** A function that receives the entities and needs to render them on every tick. */
    export interface Renderer {
        (entities: null | Entities, window: Window): JSX.Element[];
    }

    export function DefaultRenderer(
        entities: null | Entities,
        window: Window,
    ): JSX.Element[];

    export interface TimerSubscriber {
        (time: number): void;
    }

    /** An object that can be used to override the default timer behavior */
    export interface Timer {
        start(): void;
        stop(): void;
        subscribe(callback: TimerSubscriber): void;
        unsubscribe(callback: TimerSubscriber): void;
    }

    export class DefaultTimer implements Timer {}

    export interface TimeUpdate {
        current: number;
        delta: number;
        previous: number;
        previousDelta: number;
    }

    export interface DispatchEvent {
        type: string;
    }

    export interface Dispatch {
        (event: DispatchEvent): void;
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
        dispatch: Dispatch;
        events: DispatchEvent[];
        window: Window;
        time: TimeUpdate;
        input: AllInput[];
    }

    export interface Entity {
        renderer?: ReactElement;
        [propName: string]: unknown;
    }

    export interface Entities {
        [uniqueId: string]: Entity;
    }

    export type GameEngineSystem = (
        entities: Entities,
        update: GameEngineUpdateEventOptionType,
    ) => Record<string, Entity>;

    export interface GameEngineProperties {
        /** An array of functions to be called on every tick. */
        systems?: GameEngineSystem[];
        /**
         * An object containing your game's initial entities. This can also be a Promise
         * that resolves to an object containing your entities. This is useful when you need
         * to asynchronously load a texture or other assets during the creation of your
         * entities or level.
         */
        entities?: Entities | Promise<Entities>;
        /** A function that receives the entities and needs to render them on every tick */
        renderer?: Renderer;
        /** An object that can be used to override the default timer behavior */
        timer?: Timer;
        /** A boolean that can be used to control whether the game loop is running or not */
        running?: boolean;
        /** A callback for being notified when events are dispatched */
        onEvent?: Dispatch;
        /** An object containing styles for the root container */
        style?: CSSProperties;
        children?: ReactNode;
    }

    export class GameEngine extends Component<GameEngineProperties> {
        /** Stop the game loop	 */
        stop(): void;
        /** Start the game loop.	 */
        start(): void;
        /**
         * A method that can be called to update your game with new entities. Can be
         * useful for level switching etc. You can also pass a Promise that resolves
         * to an entities object into this method.
         **/
        swap(entitites: Entities | Promise<Entities>): void;
        /**
         * A method that can be called to fire events after the currenty frame
         * completed. The event will be received by ALL the systems and any
         * `onEvent` callbacks
         */
        dispatch: Dispatch;
    }

    interface GameLoopUpdateEventOptionType {
        input: AllInput[];
        window: Window;
        time: TimeUpdate;
    }

    export interface GameLoopProperties {
        timer?: Timer;
        running?: boolean;
        onUpdate?: (args: GameLoopUpdateEventOptionType) => void;
        style?: CSSProperties;
        children?: ReactNode;
    }

    export class GameLoop extends Component<GameLoopProperties> {}
}

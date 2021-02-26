import { ComponentProps } from "react";
import { Box } from "./renderers";

type Entities = { box1: ComponentProps<typeof Box> };
type Payload = {
    pageX: number;
    pageY: number;
};
type Input = {
    name: string;
    payload: Payload;
};
type SystemOptions = {
    input: Input[];
};

const MoveBox = (entities: Entities, { input }: SystemOptions) => {
    //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
    //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
    //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
    //-- That said, it's probably worth considering performance implications in either case.

    const { payload } = input.find((x) => x.name === "onMouseDown") || {};

    if (payload) {
        const box1 = entities["box1"];

        box1.x = payload.pageX;
        box1.y = payload.pageY;
    }

    return entities;
};

export { MoveBox };

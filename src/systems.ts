import { Entity, GameEngineSystem } from "react-game-engine";
import { Box } from "./renderers";

const MoveBox: GameEngineSystem = (entities, { input }) => {
    const box1 = entities["box1"] as Entity<typeof Box>;

    console.log(input.map((v) => v.name));

    for (const i of input) {
        switch (i.name) {
            case "onMouseDown":
                box1.x = i.payload.pageX;
                box1.y = i.payload.pageY;
                break;
            case "onKeyPress":
                switch (i.payload.key) {
                    case "ArrowUp":
                    case "w":
                        box1.y = box1.y - 10;
                        break;
                    case "ArrowDown":
                    case "s":
                        box1.y = box1.y + 10;
                        break;
                    case "ArrowLeft":
                    case "a":
                        box1.x = box1.x - 10;
                        break;
                    case "ArrowRight":
                    case "d":
                        box1.x = box1.x + 10;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    return entities;
};

export { MoveBox };

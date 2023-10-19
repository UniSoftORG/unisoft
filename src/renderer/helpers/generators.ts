import {KnownComponentType} from "@/types";
import {v4} from "uuid";

export const generateComponentBase = (name: string, type: KnownComponentType) => {
    return {
        uuid: v4(),
        name,
        type
    };
}
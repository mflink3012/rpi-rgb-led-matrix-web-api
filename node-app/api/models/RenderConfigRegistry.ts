import { ModelRegistry } from "../interfaces/ModelRegistry";
import { AnimatedImageRenderConfig } from "./AnimatedImageRenderConfig";
import { AnimatedTextRenderConfig } from "./AnimatedTextRenderConfig";
import { StaticImageRenderConfig } from "./StaticImageRenderConfig";
import { StaticTextRenderConfig } from "./StaticTextRenderConfig";

export const RenderConfigRegistry: ModelRegistry = {
    StaticImageRenderConfig,
    AnimatedImageRenderConfig,
    StaticTextRenderConfig,
    AnimatedTextRenderConfig
}
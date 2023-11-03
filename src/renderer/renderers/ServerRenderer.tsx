import componentsMaps from "@/renderer/imports/components";
import Renderer from "@/renderer/Render";

export default function ServerRenderer(
  componentProps: any,
  index: number,
): JSX.Element {
  const Component = componentsMaps[componentProps.type];
  if (!Component) throw new Error("Component does not exists!");

  // handle requests, seo, etc...
  return (
    <Renderer
      Component={Component}
      componentProps={componentProps}
      index={index}
      key={`${componentProps.uuid}-${index}`}
    />
  );
}

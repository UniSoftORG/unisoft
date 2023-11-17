"use server";
import { PrepareComponent } from "@/renderer/helpers/initializors";
import { IComponentType } from "@/types";

export const generateComponentForRendering = async (
  componentData: IComponentType
) => {
  const compo = componentData;
  await PrepareComponent.getSingleton(compo);
  return compo;
};

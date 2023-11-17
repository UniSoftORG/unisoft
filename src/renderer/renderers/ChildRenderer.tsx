import { PrepareRenderer } from "@/renderer/PrepareRenderer";
import { IComponentType } from "@/types";
import { startsWith } from "lodash";
import { getValue } from "unisoft-utils";

const ChildRenderer: React.FC<{
  children: IComponentType[];
  parentData: IComponentType;
}> = ({ children, parentData }) => {
  if (children.length > 0) {
    return children.map((child, index) => {
      if (child.receiveAttributes) {
        Object.keys(child.receiveAttributes).map((passAttributeKey) => {
          if (
            child.receiveAttributes &&
            startsWith(
              child.receiveAttributes[passAttributeKey],
              parentData.name
            )
          ) {
            child.passAttributes = {
              ...child.passAttributes,
              [passAttributeKey]: getValue(
                parentData,
                child.receiveAttributes[passAttributeKey].replace(
                  `${parentData.name}.`,
                  ""
                )
              ),
            };
          }
        });
      }

      return <PrepareRenderer component={child} key={child.uuid} />;
    });
  }
};

export default ChildRenderer;

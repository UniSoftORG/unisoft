import { IComponentType } from '@/types';
import { PrepareRenderer } from '@/renderer/PrepareRenderer';
import { startsWith } from 'lodash';
import { getValue } from 'unisoft-utils';

const ChildRenderer: React.FC<{
  children: IComponentType[] | string;
  parentData: IComponentType;
}> = ({ children, parentData }) => {
  if (children && typeof children == 'string') {
    return children;
  } else if (children && typeof children !== 'string') {
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
                  ''
                )
              ),
            };
          }
        });
      }

      return (
        <PrepareRenderer
          component={{
            ...child,
            passAttributes: {
              ...parentData.passAttributes[child.name],
              ...child.passAttributes,
            },
          }}
          key={`${child.uuid}-${index}`}
          fromClient={true}
        />
      );
    });
  } else {
    return null;
  }
};

export default ChildRenderer;

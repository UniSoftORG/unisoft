'use client';
import { IComponentBase } from '@/types';
import Element from './Element';
// import {replaceDynamic} from "@/Builder/utils/replacerUtils";
// import {useTranslations} from "next-intl";

const Translation: React.FC<{
  componentData: IComponentBase;
  events?: any;
}> = ({ componentData, events }) => {
  // const createDynamic = replaceDynamic(componentData, 'props', 'dynamicProps')
  // const t = useTranslations(createDynamic.parentType);

  return (
    <Element
      componentData={componentData}
      {...{
        type: 'Translation',
        uuid: componentData.uuid,
      }}
      key={componentData.uuid}
    >
      Test
    </Element>
  );
};

export default Translation;

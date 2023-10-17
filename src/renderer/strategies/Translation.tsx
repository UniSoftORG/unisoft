"use client"
import {IComponent} from "@/types";
import Element from "./Element"
// import {replaceDynamic} from "@/Builder/utils/replacerUtils";
// import {useTranslations} from "next-intl";

const Translation: React.FC<{ componentData: IComponent; events?:any }> = ({componentData, events}) => {
    // const createDynamic = replaceDynamic(componentData, 'props', 'dynamicProps')
    // const t = useTranslations(createDynamic.parentType);

    return <Element componentData={componentData} {...{
        type: 'Translation',
        uuid: componentData.uuid
    }} key={componentData.uuid}>
        Test
        {/*{t(`${createDynamic?.parentUuid}.${createDynamic?.text}`) as any}*/}
    </Element>
};

export default Translation;

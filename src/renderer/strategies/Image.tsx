import {ComponentData} from "@/types";
import Image from "next/image";
import {handleEvents} from "@/Builder/utils/eventUtils";
import {replaceDynamic} from "@/Builder/utils/replacerUtils";

const ImageRenderer: React.FC<ComponentData> =
    ({children, componentData, events}) => {
        // let src;
        // const data = componentData.dynamicAttributes ? replaceDynamic(componentData, 'attrs', 'dynamicAttributes') : componentData
        // if(data.src?.includes('false')){
        //     src = data.src?.includes('false') ? componentData.attrs?.fallback ? componentData.attrs.fallback : '/kgb.png' : data.src
        // } else {
        //     src = data.src
        // }

        return (
            <Image src={componentData.props.image ?? componentData.attrs.src}
                   alt={componentData.props.alt ?? ''}
                   width={componentData.attrs.width}
                   height={componentData.attrs.height}
                   className={componentData.attrs.className}
                   loading={'eager'}
                   priority
                   {...handleEvents(componentData, {customPrefix: 'executeOn'})}
            />
        )
    }

export default ImageRenderer;

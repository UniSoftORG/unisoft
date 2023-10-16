import {ComponentData} from "@/types";
import Image from "next/image";
import {handleEvents} from "@/Builder/utils/eventUtils";
import {replaceDynamic} from "@/Builder/utils/replacerUtils";

const ImageOrImage: React.FC<ComponentData> =
    ({children, componentData, events}) => {
        const data = componentData.dynamicAttributes ? replaceDynamic(componentData, 'attrs', 'dynamicAttributes') : componentData
        const fallback = componentData.attrs.fallback ?
            componentData.attrs.fallback : '/kgb.png';

        const link = data.backSrc && !data.backSrc.includes('false') ? data.backSrc : !data.src.includes('false') ? data.src.startsWith('icons')
            ? `/${data.src}.svg`
            : `/react-icons${data.src}.svg` : fallback

        return (
            <Image src={componentData.props.image ?? link}
                   alt={componentData.props.alt ?? ''}
                   width={componentData.attrs.width}
                   height={componentData.attrs.height}
                   className={'svg-color white ' + componentData.attrs.className}
                   loading={'eager'}
                   priority
                   {...handleEvents(componentData, {customPrefix: 'executeOn'})}
            />
        )
    }

export default ImageOrImage;

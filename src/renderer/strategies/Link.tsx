import React, {createElement, ReactNode} from 'react';
import ChildRenderer from '@/renderer/renderers/ChildRenderer';
import {IComponentType} from '@/types';
import {handleEvents} from '@/utils/Renderer/events';
import Link from "next/link";

const UniLink: React.FC<{
    children?: IComponentType[];
    componentData: IComponentType;
}> = ({children, componentData}) => {
    return <Link
        href={'/'} {...handleEvents(componentData, {customPrefix: 'executeOn'})} {...componentData.elementAttributes}>
        {children ? <ChildRenderer parentData={componentData}>{children}</ChildRenderer> : undefined}
    </Link>
};

export default UniLink;

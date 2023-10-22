export const createTimeOut = (event: string, name: string, attributes?: string[]) => {
    return {
        [`executeOn${event.charAt(0).toUpperCase() + event.slice(1)}`]: {
            function: name,
            attributes
        }
    }
}

export const createEvent = (event: string, name: string, attributes?: string[]) => {
    return {
        [`executeOn${event.charAt(0).toUpperCase() + event.slice(1)}`]: {
            function: name,
            attributes
        }
    }
}

export const createFunction = (event: string, functionName: string, props?: any[]) => {
    return {
        [`execute${event.charAt(0).toUpperCase() + event.slice(1)}`]: {
            function: functionName,
            props
        }
    }
}
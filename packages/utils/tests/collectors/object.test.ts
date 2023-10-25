import {efficientPluck} from "../../src/collectors";

describe('Object Collector Module', () => {
    describe('efficientPluck', () => {
        it('efficientPlucks keys from an object', () => {
            const obj = {key1: 'value1', key2: 'value2', key3: 'value3'};
            const keys: ('key1' | 'key3')[] = ['key1', 'key3'];

            const efficientPlucked = efficientPluck(obj, keys);

            expect(efficientPlucked).toEqual({key1: 'value1', key3: 'value3'});
        });

        it('efficientPlucks properties from an object', () => {
            const obj = {key1: 'value1', key2: 'value2', key3: 'value3', key4: 'value4'};
            const keys: ('key1' | 'key2')[] = ['key1', 'key2'];

            const efficientPlucked = efficientPluck(obj, keys);

            expect(efficientPlucked).toEqual({key1: 'value1', key2: 'value2'});
        });
    });
});

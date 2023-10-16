import {MapOption} from "@utils";
import {createObjectFromMapOptions} from "../../src/creators";

describe('Object Creator Module', () => {
    describe('createObjectFromMapOptions', () => {
        it('generates an object from an array of map options', () => {
            const mapOptions = [
                'key1',
                {key: 'key2', value: 'value2'},
                {key: 'key3', value: 'value3', beforeValue: 'before_', afterValue: '_after'},
            ];

            const result = createObjectFromMapOptions(mapOptions);

            expect(result).toEqual({
                key1: 'key1',
                key2: 'value2',
                key3: 'before_value3_after',
            });
        });

        it('handles map options with missing values', () => {
            const mapOptions: MapOption[] = [
                'key1',
                {key: 'key2', value: ''},
                {key: 'key3', value: '', beforeValue: 'before_', afterValue: '_after'},
            ];

            const result = createObjectFromMapOptions(mapOptions);

            expect(result).toEqual({
                key1: 'key1',
                key2: '', // Empty string value
                key3: 'before__after',
            });
        });
    });
});

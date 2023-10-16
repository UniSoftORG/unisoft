import {mapObjectValues, mapArrayValues} from "../../src/helpers";

describe('Object Helper Module', () => {
    describe('mapObjectValues', () => {
        it('maps the values of an object using a mapping function', () => {
            const obj = {
                prop1: 1,
                prop2: 2,
            };

            const mappedValues = mapObjectValues(obj, (value) => value * 2);

            expect(mappedValues).toEqual({
                prop1: 2,
                prop2: 4,
            });
        });
    });

    describe('mapArrayValues', () => {
        it('maps the values of an object array using a mapping function', () => {
            const objArray = [
                {value: 1},
                {value: 2},
            ];

            const mappedValues = mapArrayValues(objArray, (obj) => obj.value * 2);

            expect(mappedValues).toEqual([2, 4]);
        });
    });


});

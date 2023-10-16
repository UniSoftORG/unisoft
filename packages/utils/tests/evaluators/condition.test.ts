import {Conditional} from "@types";
import {
    evaluateCondition,
    evaluateConditions
} from '../../src/evaluators';

describe('condition evaluators Module', () => {
    describe('evaluateCondition', () => {
        it('evaluates conditions based on the main object', () => {
            const mainObj = {value1: 5, value2: 10};
            expect(evaluateCondition('value1 === value2', mainObj)).toBe(false);
            expect(evaluateCondition('value1 !== value2', mainObj)).toBe(true);
            expect(evaluateCondition('value1 < value2', mainObj)).toBe(true);
            expect(evaluateCondition('value1 <= value2', mainObj)).toBe(true);
            expect(evaluateCondition('value2 > value1', mainObj)).toBe(true);
            expect(evaluateCondition('value2 >= value1', mainObj)).toBe(true);
        });
    });

    describe('evaluateConditions', () => {
        it('evaluates conditions in the array and returns conditional classes', () => {
            const conditionsArray: Conditional[] = [
                {
                    condition: 'value1 < value2',
                    value: 'class1'
                },
                {
                    condition: 'value1 > value2',
                    value: 'class2'
                }
            ];

            type MainObjType = {
                value1: number;
                value2: number;
            };

            const mainObj: MainObjType = {
                value1: 5, value2: 10
            };

            const options = {mainObj};

            const conditionalClasses = evaluateConditions<MainObjType>(conditionsArray, options);
            expect(conditionalClasses).toBe('class1');
        });
    });
});

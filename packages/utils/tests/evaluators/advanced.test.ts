import {evaluate} from '../../src/evaluators';

describe('evaluate function', () => {

    it('should correctly evaluate basic comparisons', () => {
        expect(evaluate("1 > 2")).toBe(false);
        expect(evaluate("2 > 1")).toBe(true);
        expect(evaluate("'a' === 'a'")).toBe(true);
        expect(evaluate("'a' === 'b'")).toBe(false);
    });

    it('should evaluate ternary expressions', () => {
        expect(evaluate("1 > 2 ? 'yes' : 'no'")).toBe('no');
        expect(evaluate("2 > 1 ? 'yes' : 'no'")).toBe('yes');
    });

    it('should evaluate logical AND and OR', () => {
        expect(evaluate("true && true")).toBe(true);
        expect(evaluate("true && false")).toBe(false);
        expect(evaluate("false || true")).toBe(true);
        expect(evaluate("false || false")).toBe(false);
    });

    it('should evaluate combined expressions', () => {
        expect(evaluate("1 > 2 && 'a' === 'a'")).toBe(false);
        expect(evaluate("(2 > 1 && 'a' === 'a') || ('c' === 'd' && 3 < 4)")).toBe(true);
    });

    it('should evaluate nested and combined ternaries', () => {
        expect(evaluate("1 > 2 ? 'yes' : 3 < 4 ? 'maybe' : 'no'")).toBe('maybe');
        expect(evaluate("1 > 2 ? 'yes' : 3 < 4 && 'a' === 'a' ? 'maybe' : 'no'")).toBe('maybe');
    });

    it('should evaluate nullish coalescing', () => {
        expect(evaluate("'' ?? 'default'")).toBe('');
        expect(evaluate("'value' ?? 'default'")).toBe('value');
        expect(evaluate("null ?? 'default'")).toBe('default');
        expect(evaluate("undefined ?? 'default'")).toBe('default');
    });

    it('should evaluate logical NOT', () => {
        expect(evaluate("!true")).toBe(false);
        expect(evaluate("!!false")).toBe(false);
        expect(evaluate("!false")).toBe(true);
        expect(evaluate("!(1 > 2)")).toBe(true);
    });

    it('should handle combination of multiple operators', () => {
        expect(evaluate("1 < 2 && 'a' !== 'b' || false")).toBe(true);
        expect(evaluate("(1 < 2 || 3 > 4) && 'a' === 'a'")).toBe(true);
        expect(evaluate("(1 > 2 || 3 < 4) && 'a' !== 'a'")).toBe(false);
    });

    it('should correctly handle unquoted strings', () => {
        expect(evaluate("apple === apple")).toBe(true);
        expect(evaluate("apple === 'apple'")).toBe(true);
        expect(evaluate("apple !== orange")).toBe(true);
        expect(evaluate("apple !== apple")).toBe(false);
    });

    // it('should throw an error for invalid expressions', () => {
    //     expect(() => evaluate("1 <")).toThrow();
    //     expect(() => evaluate("true &&")).toThrow();
    //     expect(() => evaluate("false ||")).toThrow();
    //     expect(() => evaluate("'a' >")).toThrow();
    //     expect(() => evaluate("1 $$$ 2")).toThrow('Unknown operator');
    // });
});


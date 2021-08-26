const stairs = require('../src/stairs');

describe('stairs', () => {
    
    test('should print 2 if they receive a stair with 2 steps', () => {
        const expected = 2;
        const result = stairs(2);
        expect(expected).toBe(result);
    });

    test('should print 3 if they receive a stair with 3 steps', () => {
        const expected = 3;
        const result = stairs(3);
        expect(expected).toBe(result);
    });

    test('should print 5 if they receive a stair with 4 steps', () => {
        const expected = 5;
        const result = stairs(4);
        expect(expected).toBe(result);
    });

    test('should print 8 if they receive a stair with 5 steps', () => {
        const expected = 8;
        const result = stairs(5);
        expect(expected).toBe(result);
    });

    test('should print "You must enter a number greater than or equal to 1" if they receive a stair with -1 steps', () => {
        const expected = "You must enter a number greater than or equal to 1";
        const result = stairs(-1);
        expect(expected).toEqual(result);
    });
    
});
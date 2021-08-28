const { 
    diffInDays, 
    getNextPurchaseDateWithAverage,
    getNextPurchaseDateWithMedian
} = require('../src/replenishment');

describe('replenishment', () => {
    
    test('should print 35 if they receive as start date 2020-01-01 and finish date 2020-02-05', () => {
        const expected = 35;
        const result = diffInDays("2020-01-01", "2020-02-05");
        expect(expected).toBe(result);
    });

    test('should print "2021-01-07" if they receive ["2020-01-01", "2020-02-05", "2020-03-03", "2020-09-03", "2020-10-01", "2020-11-06"]', () => {
        const expected = "2021-01-07";
        const result = getNextPurchaseDateWithAverage([
            "2020-01-01", 
            "2020-02-05", 
            "2020-03-03", 
            "2020-09-03", 
            "2020-10-01", 
            "2020-11-06"
        ]);
        expect(expected).toBe(result);
    });

    test('should print "2021-12-11" if they receive ["2020-01-01", "2020-02-05", "2020-03-03", "2020-09-03", "2020-10-01", "2020-11-06"]', () => {
        const expected = "2020-12-11";
        const result = getNextPurchaseDateWithMedian([
            "2020-01-01", 
            "2020-02-05", 
            "2020-03-03", 
            "2020-09-03", 
            "2020-10-01", 
            "2020-11-06"
        ]);
        expect(expected).toBe(result);
    });
    
});
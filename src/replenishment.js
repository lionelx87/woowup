const MODE = require('./constants/replenishment.constants');
const fs = require('fs');
function replenishment(mode = MODE.AVERAGE) {
    const shopping = JSON.parse(fs.readFileSync('api/purchases.json', 'utf8'));
    
    const purchases = shopping.customer.purchases;
    
    const regularProductsBySKU = getRegularProductsBySKU(purchases);

    const purchasesDatesBySKU = getPurchaseDatesBySKU(regularProductsBySKU, purchases);

    const nextPurchases = [];
    
    purchasesDatesBySKU.forEach( purchase => {
        nextPurchases.push({
            name: purchase.name,
            nextPurchase: mode === MODE.MEDIAN ? getNextPurchaseDateWithMedian(purchase.dates) : getNextPurchaseDateWithAverage(purchase.dates)
        })
    });

    return nextPurchases;
}

function getRegularProductsBySKU(purchases) {
    const productsBySKU = [];
    const regularProductsBySKU = new Set();
    
    purchases.forEach( purchase => {
        purchase.products.forEach( product => {
            productsBySKU.push(product.sku);
        });
    });

    productsBySKU.forEach( productBySKU => {
        if(productsBySKU.filter( sku => sku === productBySKU ).length > 1) {
            regularProductsBySKU.add(productBySKU);
        }
    });
    return [...regularProductsBySKU];
}

function diffInDays(start, end) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    start = new Date(start);
    end = new Date(end);

    const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    return Math.floor( (utcEnd - utcStart) / MS_PER_DAY );
}

function getPurchaseDatesBySKU(skuProducts, purchases) {
    const purchasesDates = [];
    skuProducts.forEach( sku => {
        const purchasesBySKU = purchases.filter( purchase => purchase.products.some( product => product.sku === sku ));
        purchasesDates.push({
            sku,
            name: purchasesBySKU.map( purchase => purchase.products.find( product => product.sku === sku).name)[0],
            dates: purchasesBySKU.map( purchase => purchase.date)
        });
    });
    return purchasesDates;
}

function getNextPurchaseDateWithAverage(dates) {
    let acc = 0;
    for(let i = 0; i < dates.length - 1; i ++) {
        acc += diffInDays(dates[i], dates[i + 1]);
    }
    const average = Math.round(acc / (dates.length - 1));
    let lastPurchaseDate = new Date(dates[dates.length - 1]);
    let nextPurchaseDate = new Date(lastPurchaseDate);
    nextPurchaseDate.setDate(lastPurchaseDate.getDate() + average);
    return nextPurchaseDate.toISOString().split('T')[0];
}

function getNextPurchaseDateWithMedian(dates) {
    
    const diffBetweenDates = [];
    
    for(let i = 0; i < dates.length - 1; i ++) {
        diffBetweenDates.push(diffInDays(dates[i], dates[i + 1]));
    }
    const middle = Math.floor(diffBetweenDates.length / 2);
    
    diffBetweenDatesSort = [...diffBetweenDates].sort( (a,b) => a - b);
    
    const median = diffBetweenDatesSort.length % 2 !== 0 ? diffBetweenDatesSort[middle] :  (diffBetweenDatesSort[middle - 1] + diffBetweenDatesSort[middle]) / 2;
    
    let lastPurchaseDate = new Date(dates[dates.length - 1]);

    let nextPurchaseDate = new Date(lastPurchaseDate);
    nextPurchaseDate.setDate(lastPurchaseDate.getDate() + median);
    return nextPurchaseDate.toISOString().split('T')[0]
}

replenishment();

module.exports = {
    replenishment, 
    getRegularProductsBySKU,
    diffInDays,
    getPurchaseDatesBySKU,
    getNextPurchaseDateWithAverage,
    getNextPurchaseDateWithMedian
};
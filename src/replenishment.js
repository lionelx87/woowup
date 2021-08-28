const fs = require('fs');

async function replenishment() {
    const shopping = JSON.parse(fs.readFileSync('api/purchases.json', 'utf8'));
    
    const purchases = shopping.customer.purchases;
    
    const regularProductsBySKU = getRegularProductsBySKU(purchases);

    const purchasesDatesBySKU = getPurchaseDatesBySKU(regularProductsBySKU, purchases);

    purchasesDatesBySKU.forEach( purchase =>{
        console.log(`Probablemente la proxima compra del producto ${purchase.name} sea el ${getNextPurchaseDateWithAverage(purchase.dates)}`);
    });
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
    start = new Date(start);
    end = new Date(end);
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

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
    const average = Math.round(acc / dates.length);
    let lastPurchaseDate = new Date(dates[dates.length - 1]);
    let nextPurchaseDate = new Date(lastPurchaseDate);
    nextPurchaseDate.setDate(lastPurchaseDate.getDate() + average);
    return nextPurchaseDate.toISOString().split('T')[0];
}

replenishment();

module.exports = replenishment;
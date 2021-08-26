const fs = require('fs');

async function replenishment() {
    const shopping = JSON.parse(fs.readFileSync('api/purchases.json', 'utf8'));
    
    const purchases = shopping.customer.purchases;
    
    const regularProductsBySKU = getRegularProductsBySKU(purchases);

    const purchasesDatesBySKU = getPurchaseDatesBySKU(regularProductsBySKU, purchases);

    // console.log(diffInDays("2020-10-01", "2020-11-06"));
    // console.log(diffInDays("2020-09-03", "2020-10-01"));
    // console.log(diffInDays("2020-03-03", "2020-09-03"));
    // console.log(diffInDays("2020-02-05", "2020-03-03"));
    // console.log(diffInDays("2020-01-01", "2020-02-05")); // 62


    // TODO: Cacular promedio
    
     // TODO: Tiempo de recompra de cada sku, generar un array con los tiempos

     // TODO: Sumar a la ultima fecha el tiempo estimado
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
            dates: purchasesBySKU.map( purchase => purchase.date)
        });
    });
    return purchasesDates;
}


replenishment();

module.exports = replenishment;
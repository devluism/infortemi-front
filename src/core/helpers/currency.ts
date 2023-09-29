// /**
//  * Number.prototype.format(n, x, s, c)
//  * 
//  * @param integer n: length of decimal
//  * @param integer x: length of whole part
//  * @param mixed   s: sections delimiter
//  * @param mixed   c: decimal delimiter
//  */
// Number.prototype.format = function(n, x, s, c) {
//     var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
//         num = this.toFixed(Math.max(0, ~~n));

//     return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
// };
// Create our number formatter.
const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export { currency };
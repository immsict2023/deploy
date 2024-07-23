class currency {

    static formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP' 
    });
}

export default currency;
mndot = {

    moreInfo: function(pin) {
        var more_info_div = document.getElementById(pin+'-more-info');
        more_info_div.innerHTML = 'Loading...';

        // as this returns "instantly", I added a delay 
        //  to demo the "loading..." actually working.
        setTimeout(function() {
            gm3.util.xhr({
                method: 'GET',
                url: './index.html',
                data: {
                    pin: pin
                }
            }).then(function(response) {
                more_info_div.innerHTML = 'More info about: '+pin;
            });
        }, 2000);
    }
};

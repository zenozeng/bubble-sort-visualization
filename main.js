var bubbleSortAsync = function(array, onsort) {
    var len = array.length;
    array = array.concat();
    var iterIJ = function(i, j) {
        if(i < len) {
            if(j < len - 1 - i) {
                if(array[j] > array[j+1]) {
                    var tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }
                onsort(i, j, j + 1, array.concat()).then(function() {
                    iterIJ(i, j + 1);
                });
            } else {
                iterIJ(i + 1, 0);
            }
        } else {
            console.log('done');
        }
    };
    iterIJ(0, 0);
};

var setData = function(data) {
    // init bubbles
    $('#bubbles li').each(function() {
        var $this = $(this),
            val = $this.text(),
            r = Math.sqrt(10 / val) * 40;
        $this.css({width: r, height: r, lineHeight: r + 'px'});
    });
};

$(function() {

    // get data
    var array = $('#bubbles li').map(function() {
        return $(this).text();
    }).toArray();

    // sort bubbles
    bubbleSortAsync(array, function(i, j1, j2, array) {
        var $bubbles = $('#bubbles li');
        // mark current step
        $($bubbles[i]).addClass('step');
        // mark current cmp
        $('#bubbles li.cmp').removeClass('cmp');
        $($bubbles[j1]).addClass('cmp');
        $($bubbles[j2]).addClass('cmp');
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 1000);
        });
    });
});

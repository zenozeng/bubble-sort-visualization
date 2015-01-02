// async version of bubble sort
var bubbleSortAsync = function(array, onsort) {
    var len = array.length;
    array = array.concat();
    var iter = function(i, j) {
        if(i < len) {
            if(j < len - 1 - i) {
                if(array[j] > array[j+1]) {
                    var tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }
                onsort(i, j, j + 1, array.concat()).then(function() {
                    iter(i, j + 1);
                });
            } else {
                iter(i + 1, 0);
            }
        } else {
            // done
        }
    };
    iter(0, 0);
};

var setData = function(data) {
    // init bubbles
    var $bubbles = $('#bubbles li');
    data.forEach(function(val, i) {
        var $this = $($bubbles[i]);
        $this.text(val);
        var r = Math.sqrt(10 / val) * 40;
        $this.css({width: r, height: r, lineHeight: r + 'px'});
    });
};

$(function() {

    // get data & init bubbles
    var data = $('#bubbles li').map(function() {
        return parseInt($(this).text());
    }).toArray();

    setData(data);

    // sort bubbles
    bubbleSortAsync(data, function(i, j1, j2, array) {
        var $bubbles = $('#bubbles li');
        // mark current step
        $($bubbles[i]).addClass('step');
        // mark current cmp
        $('#bubbles li.cmp').removeClass('cmp');
        $($bubbles[j1]).addClass('cmp');
        $($bubbles[j2]).addClass('cmp');
        // update bubbles
        setTimeout(function() {
            setData(array);
        }, 500);
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 2000);
        });
    });
});

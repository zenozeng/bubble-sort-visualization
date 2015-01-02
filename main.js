// async version of bubble sort
var bubbleSortAsync = function(array, onsort, callback) {
    var len = array.length;
    array = array.concat();
    var iter = function(i, j) {
        if(i < len) {
            if(j < len - 1 - i) {
                var swap = false;
                if(array[j] > array[j+1]) {
                    swap = true;
                    var tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }
                onsort(i, j, j + 1, swap, array.concat()).then(function() {
                    iter(i, j + 1);
                });
            } else {
                iter(i + 1, 0);
            }
        } else {
            callback(array);
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
        var r = val * 20;
        $this.css({paddingTop: r});
    });
};

$(function() {

    // get data & init bubbles
    var data = $('#bubbles li').map(function() {
        return parseInt($(this).text());
    }).toArray();

    setData(data);

    // sort bubbles
    bubbleSortAsync(data, function(i, j1, j2, swap, array) {
        var $bubbles = $('#bubbles li');
        // mark current step
        $($bubbles[i]).addClass('step');
        // mark current cmp
        $('#bubbles li.cmp').removeClass('cmp');
        $($bubbles[j1]).addClass('cmp');
        $($bubbles[j2]).addClass('cmp');
        // update bubbles
        if(swap) {
            $($bubbles[j1]).animate({right: -50}, 500, function() {
                $(this).css({right: ''});
            });
            $($bubbles[j2]).animate({left: -50}, 500, function() {
                $(this).css({left: ''});
                $bubbles[j1].parentNode.insertBefore($bubbles[j2], $bubbles[j1]);
            });
        }
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 1000);
        });
    }, function() {
        $('#bubbles li.cmp').removeClass('cmp');
    });
});

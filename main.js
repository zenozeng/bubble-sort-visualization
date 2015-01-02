$(function() {
    $('#bubbles li').each(function() {
        var $this = $(this),
            val = $this.text(),
            r = Math.sqrt(val / 10) * 70;
        $this.css({width: r, height: r, lineHeight: r + 'px'});
    });
});

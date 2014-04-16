$(function() {
    var base = $('base').attr('href');
    $('input:radio').change(function() {
        if ($(this).val() == "vertical") {
            $('iframe').attr('src',base+"/informer?type=v").height(175).width(190);
            var code = "<iframe src='"+ base+"/informer?type=v' width='190' height='175' frameborder='0'></iframe>";
            $('#informer_code').text(code);
        } else {
            $('iframe').attr('src',base+"/informer?type=h").height(60).width(405);
            var code = "<iframe src='"+ base+"/informer?type=h' width='405' height='60' frameborder='0'></iframe>";
            $('#informer_code').text(code);
        }
    })
    var code = "<iframe src='"+ base+"/informer?type=v' width='190' height='175' frameborder='0'></iframe>";
    $('#informer_code').text(code);
})
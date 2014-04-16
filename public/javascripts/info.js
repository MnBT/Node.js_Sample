$(function () {
    $("body select").msDropDown({
        width: 15
    });

    $('.arr img').on('click', function() {
        getRate();
    })
    getRate();
})

function getRate() {
    var rate =  $('.from_value').val();
    var from =  $('select.from').val();
    var to =    $('select.to').val();
    $.getJSON( "/currency?to="+to+"&from="+from, function( data ) {
        $( ".result" ).html( data.rate * rate );
    });
}
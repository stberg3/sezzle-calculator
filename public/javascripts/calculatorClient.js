$(function () {
    var socket = io();
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        var eqRegex = /(\d*\.?\d+)(([+\-/*%]|\*\*)(\d*\.?\d+))+/;
        var input = $('#user_input').val();
        input = input.replace(/[\(\)\s]/g, "");

        console.log(input);
        console.log(input.search(eqRegex));

        if (input === '' || input.search(eqRegex) < 0) {
            $('#user_input').val('INVALID INPUT');
        } else {
            socket.emit('calculation_input', $('#user_input').val());
            $('#user_input').val('');
        } 

        return false;
    });

    socket.on('calculation_output', function (calc) {
        if ($('#calculations_output_table > tbody:first > tr').length > 9) {
            $('#calculations_output_table > tbody:first > tr:first').remove();
        }
        
        $('#calculations_output_table')
            .append($('<tr>')
                .append($('<td>').text(calc.calc))
                .append($('<td>').text(calc.answer)));
    });
});
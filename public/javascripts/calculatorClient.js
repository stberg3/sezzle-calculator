$(function () {
    var socket = io();
    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading
        if ($('#user_input').val() != '') {
            socket.emit('calculation_input', $('#user_input').val());
        }
        $('#user_input').val('');
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
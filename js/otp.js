$(document).ready(function () {
    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });

    // OTP Verification Form
    $("#otp-verification-form").validate({
        ignore: [],
        errorClass: 'invalid',
        errorPlacement: function (error, element) {
            var errorText = error.text();
            if (element.closest('.form-group').find('.help-block').length < 1) {
                element.closest('.form-group').append('<span class="help-block">');
            }
            element.closest('.form-group').addClass('has-error');
            element.closest('.form-group').find('.help-block').html(errorText);
        },
        highlight: function (element, errorClass) {
            $(element).addClass(errorClass).parent().prev().children("select").addClass(errorClass);
            if ($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox') {
                $(element).parent().parent().addClass(errorClass);
            }
        },
        rules: {
            otp: {
                required: true,
                minlength: 4,
                maxlength: 4
            }
        },
        messages: {
            otp: {
                required: "OTP is required",
                minlength: "Minimum 4 digits",
                maxlength: "Maximum 4 digits"
            }
        },
        submitHandler: function (form) {
            // form.submit();
        }
    });
});

// OTP Digit Values 
$('.digit-group').find('.digit').each(function () {
    $(this).attr('maxlength', 1);
    var otpTypedVal = '';

    $(this).on('keyup', function (e) {
        if ($(this).val().length < 1) {
            return false;
        }
        if ($('#digit-1').val().length > 0 && $('#digit-2').val().length > 0 && $('#digit-3').val().length > 0 && $('#digit-4').val().length > 0) {
            $('.digit-group .form-group').removeClass('has-error');
        }
        otpTypedVal = $('#digit-1').val() + $('#digit-2').val() + $('#digit-3').val() + $('#digit-4').val();

        $('#otp').val(otpTypedVal);
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find('input#' + $(this).data('previous'));
            if (prev.length) {
                $(prev).select();
            }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
            var next = parent.find('input#' + $(this).data('next'));
            if (next.length) {
                $(next).select();
            }
        }
    });
});

// OTP Forword & Backward
$(".digit").keyup(function() {
    if (this.value.length == this.maxLength) {
        $(this).next(".digit").focus();
    } else {
        $(this).prev(".digit").focus();
    }
});
// numeric Input Only
function numOnly(evt) {
    var k;
    document.all ? k = evt.keyCode : k = evt.which;
    return (k == 0 || k == 9 || k == 8 || k == 32 || (k >= 48 && k <= 57));
}
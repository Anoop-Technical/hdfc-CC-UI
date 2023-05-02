$( document ).ready(function() {
    $('input[name="addresssameAs').on('click', function () {
        var value = $("[name=addresssameAs]:checked").val();
        if(value == 0){
            $(".officeAddress").show();
        }else{
            $(".officeAddress").hide();
        }
    })
    $('.form-control').not('.fakeinput').on('keyup blur', function (e) {
        $(this).closest('.form-group').removeClass('has-error');
        $(this).removeClass("invalid");
    });
    $('input[type="checkbox"],input[type="radio"]').on('click', function () {
        $(this).removeClass("invalid");
        $(this).closest('.form-group').removeClass('has-error');
        $(this).closest('.radio-option').removeClass('invalid');
        $(this).closest('.check-field').removeClass('invalid');
    });
    $('select').selectmenu();
    $('select').on('change selectmenuchange', function () {
        $(this).closest('.form-group').removeClass('has-error');
    });
    $(".form-group .ui-selectmenu-button").on("focus", function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-group .ui-selectmenu-button").on("focusout", function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });
    $(".form-control").focusin(function () {
        $(this).closest(".form-group").addClass("is-focused");
    });
    $(".form-control").focusout(function () {
        $(this).closest(".form-group").removeClass("is-focused");
    });
    $.validator.addMethod(
        "email",
        function (value, element) {
            return (
                this.optional(element) ||
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value
                    )
                    );
                },
        "Enter valid email address !"
    );
    $.validator.addMethod("addressSpecialChar", function (value, element) {
        return this.optional(element) || value.match(/[A-Za-z0-9'\.\-\s\,]/gm);
    }, "Special characters not allowed except = , / @ . : - &'");

    $("#regaliaForm").validate({
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
            currentAddress1: {
                required: true,
                addressSpecialChar:true,
            },
            currentAddress2: {
                required: true,
                addressSpecialChar:true,
            },
            currentPincode: {
                required: true,
            },
            currentCity: {
                required: true,
            },
            residenceType: {
                required: true,
            },
            addresssameAs: {
                required: true,
            },
            officeAddress1: {
                required: true,
                addressSpecialChar:true,
            },
            officeAddress2: {
                required: true,
                addressSpecialChar:true,
            },
            officePincode: {
                required: true,
            },
            officeCity: {
                required: true,
            },
            officeemailId: {
                required: true,
                email: true,
            },
            landlineNumber: {
                required: true,
                email: true,
            },
            designation: {
                required: true,
            },
            education: {
                required: true,
            },
            nameonCard: {
                required: true,
            },
            preferredAddress: {
                required: true,
            },
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});
$(".NumericFormat").autoNumeric({
    mDec: "0",
    lZero: "deny",
    vMax: "9999999"
});
function OnlyCharSpace(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[a-zA-Z ]+$/i);
    return pattern.test(value);
}
function OnlyNumeric(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/^[0-9]*$/i);
    return pattern.test(value);
}
$('#designation').bind('keypress', OnlyCharSpace);
$('#nameonCard').bind('keypress', OnlyCharSpace);
$('#officePincode').bind('keypress', OnlyNumeric);
$('#currentPincode').bind('keypress', OnlyNumeric);
$('#landlineNumber').bind('keypress', OnlyNumeric);
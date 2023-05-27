/**
 * File Name: ndutil.js
 *
 * Revision History:
 *       Nehal Dogra, 2022-02-18 : Created
 */
function doValidate_frmAdd(){
    var form = $("#frmAdd");
    form.validate({
        rules:{
            BStextAdd: {
                required: true,
                rangelength: [2, 20]
            },
            REmailAdd: {
                required: true,
                emailcheck: true
            },
            dateAdd: {
                required: true
            },
            FQAdd: {
                required: true,
                min: 0,
                max: 5
            },
            SvcAdd: {
                required: true,
                min: 0,
                max: 5
            },
            ValueAdd: {
                required: true,
                min: 0,
                max: 5
            }
        },
        messages:{
            BStextAdd: {
                required: "Business name is mandatory",
                rangelength: "Length must be 2-20 characters long"
            },
            REmailAdd: {
                required: "Reviewer email is mandatory",
                emailcheck: "Email entered is invalid"
            },
            dateAdd: {
                required: "Review date is mandatory"
            },
            FQAdd: {
                required: "Please select the value between 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            SvcAdd: {
                required: "Please select the value between 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            ValueAdd: {
                required: "Please select the value between 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("emailcheck",
    function(value, element){
        var regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/;
        return this.optional(element) || regexp.test(value);
    },
    "Our custom email pattern checker");


function doValidate_frmModify(){
    var form = $("#frmModify");
    form.validate({
        rules: {
            BStextModify: {
                required: true,
                rangelength: [2, 20]
            },
            REmailModify: {
                required: true,
                emailcheck: true
            },
            dateModify: {
                required: true
            },
            FQModify: {
                min: 0,
                max: 5
            },
            SvcModify: {
                min: 0,
                max: 5
            },
            ValueModify: {
                min: 0,
                max: 5
            }
        },
        messages: {
            BStextModify: {
                required: "Business name is mandatory",
                rangelength: "Length must be 2-20 characters long"
            },
            REmailModify: {
                required: "Reviewer email is mandatory",
                emailcheck: "Email entered is invalid"
            },
            dateModify: {
                required: "Review date is mandatory"
            },
            FQModify: {
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            SvcModify: {
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            ValueModify: {
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            }
        }
    });
    return form.valid();}


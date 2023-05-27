/**
 * File Name: ndglobal.js
 *
 * Revision History:
 *       Nehal Dogra, 2022-02-18 : Created
 */
function ratingsAdd_click() {
    if ($("#ratingsAdd").prop('checked')) {
        $("#calculateAdd").show();
    } else {
        $("#calculateAdd").hide();
        $("#FQAdd").val("0");
        $("#SvcAdd").val("0");
        $("#ValueAdd").val("0");
        $("#ORatingsAdd").val("0");
    }
}

function ratingsModify_click() {
    if ($("#ratingsModify").prop('checked')) {
        $("#calculateModify").show();
    } else {
        $("#calculateModify").hide();
        $("#FQModify").val("0");
        $("#SvcModify").val("0");
        $("#ValueModify").val("0");
        $("#ORatingsModify").val("0");
    }
}

function saveAdd_click() {
    addFeedback();
}

function updatemodify_click() {
    updateFeedback();
}

function savesettings_click() {
    var x = $("#DefaultEmail").val();
    localStorage.setItem("DefaultEmail", x);
    localStorage.getItem("DefaultEmail");
    alert("Default reviewer email saved.");

}

function FQAdd_click() {
    showOverallRatings();
}


function SvcAdd_click() {
    showOverallRatings();
}

function ValueAdd_click() {
    showOverallRatings();
}

function FQModify_click() {
    showOverallRatingsModify();
}

function SvcModify_click() {
    showOverallRatingsModify();
}

function ValueModify_click() {
    showOverallRatingsModify();
}

function clearDB_click() {
    confirm("Really want to clear database?");
    clearDBfunction();
    localStorage.clear();
}

function deletemodify_click() {
    deleteFeedback();
}

function ndAddFeedbackPage_click() {
    updateTypesDropdown("Add");
    Addpageshow();
}

function ndModifyFeedbackPage_click() {
    updateTypesDropdown("Modify");
    showCurrentReview();
}

function ndViewFeedbackPage_click() {
    getReviews();
}

function init() {
    $("#ratingsAdd").on("click", ratingsAdd_click);
    $("#ratingsModify").on("click", ratingsModify_click);
    $("#saveAdd").on("click", saveAdd_click);
    $("#savesettings").on("click", savesettings_click);
    $("#FQAdd").on("change", FQAdd_click);
    $("#SvcAdd").on("change", SvcAdd_click);
    $("#ValueAdd").on("change", ValueAdd_click);
    $("#FQModify").on("change",FQModify_click);
    $("#SvcModify").on("change", SvcModify_click);
    $("#ValueModify").on("change", ValueModify_click);
    $("#clearDB").on("click", clearDB_click);


    $("#deletemodify").on("click", deletemodify_click);
    $("#updatemodify").on("click", updatemodify_click);

    $("#ndAddFeedbackPage").on("pageshow", ndAddFeedbackPage_click);
    $("#ndModifyFeedbackPage").on("pageshow", ndModifyFeedbackPage_click);
    $("#ndViewFeedbackPage").on("pageshow", ndViewFeedbackPage_click);

}

$(document).ready(function () {
    init();
    initDB();
});

function initDB(){
    try{
        DB.createDatabase();
        if (db) {
            console.info("Creating tables..");
            DB.createTables();
        }
        else{
            console.error("Cannot create tables: database does not exist!");
        }
    } catch(e){
        console.error("Error: (Fatal) Error in initDB(), can not proceed.");
    }
}
/**
 * File Name: ndfacade.js
 *
 * Revision History:
 *       Nehal Dogra, 2022-02-18 : Created
 */
function addFeedback() {
    if (doValidate_frmAdd()) {
        console.log("Add Form is valid");
        var businessName = $("#BStextAdd").val();
        var typeID = $("#cmbAdd").val();
        var reviewerEmail = $("#REmailAdd").val();
        var reviewerComments = $("#RcommAdd").val();
        var reviewDate = $("#dateAdd").val();
        var hasRating = $("#ratingsAdd").prop("checked");
        var rating1 = $("#FQAdd").val();
        var rating2 = $("#SvcAdd").val();
        var rating3 = $("#ValueAdd").val();


        var options = [businessName, typeID, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3];
        console.info(`${businessName} ${typeID} ${reviewerEmail}  ${reviewerComments}  ${reviewDate} ${hasRating} ${rating1} ${rating2} ${rating3}`);


        function callback() {
            console.info("Success: Record Inserted successfully");
            alert("New Feedback Added");
        }

        Review.insert(options, callback);

    } else {
        console.log("Add Form is invalid")
    }
}

function updateFeedback() {
    if (doValidate_frmModify()) {
        console.log("Modify Form is valid")

        // var id = $("#txtId").val();
        var id = localStorage.getItem("id");

        var businessName = $("#BStextModify").val();
        var typeID = $("#cmbModify").val();
        var reviewerEmail = $("#REmailModify").val();
        var reviewerComments = $("#RcommModify").val();
        var reviewDate = $("#dateModify").val();
        var hasRating = $("#ratingsModify").prop("checked");
        var rating1 = $("#FQModify").val();
        var rating2 = $("#SvcModify").val();
        var rating3 = $("#ValueModify").val();


        var options = [businessName, typeID, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, id];
        console.info(`${businessName} ${typeID} ${reviewerEmail}  ${reviewerComments}  ${reviewDate} ${hasRating} ${rating1} ${rating2} ${rating3}`);


        function callback() {
            console.info("Updating...");
            console.info("Success: Update successful");
            alert("Feedback updated successfully");

        }

        Review.update(options, callback);
    } else {
        console.log("Modify Form is invalid")
    }
}

function showOverallRatings() {
    var FQ = parseInt($("#FQAdd").val());
    var services = parseInt($("#SvcAdd").val());
    var value = parseInt($("#ValueAdd").val());
    var overallr = ((FQ + services + value) * 100) / 15;
    $("#ORatingsAdd").val(overallr + '%');
}

function showOverallRatingsModify() {
    var FQModify = parseInt($("#FQModify").val());
    var servicesmodify = parseInt($("#SvcModify").val());
    var valuemodify = parseInt($("#ValueModify").val());
    var overallrmodify = ((FQModify + servicesmodify + valuemodify) * 100) / 15;
    $("#ORatingsModify").val(overallrmodify + '%');
}

function clearDBfunction() {
    dropTables();
    alert("Database cleared: All tables dropped");
}

function deleteFeedback() {
    // var id = $("#txtId").val();
    var id = localStorage.getItem("id");

    var options = [id];

    function callback() {
        console.info("Deleting...");
        console.info("Success: Delete successful");
        alert("Feedback deleted successfully");
        $(location).prop("href", "#ndViewFeedbackPage");

    }

    Review.delete(options, callback);
}

function updateTypesDropdown(form) {

    var options = [];

    function callback(tx, results) {
        if (form === "Add") {
            var htmlCode1 = "";
            for (var y = 0; y < results.rows.length; y++) {
                var row1 = results.rows[y];
                htmlCode1 += `<option value = ${row1['id']}> ${row1['name']}</option>`
            }
            var lv1 = $("#cmbAdd");
            lv1 = lv1.html(htmlCode1);
            lv1.selectmenu("refresh");
        } else if (form === "Modify") {
            var htmlCode = "";
            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows[i];
                htmlCode += `<option value = ${row['id']}> ${row['name']}</option>`
            }
            var lv = $("#cmbModify");
            lv = lv.html(htmlCode);
            lv.selectmenu("refresh");
        }
    }


    Type.selectAll(options, callback);


}


function Addpageshow() {
    var defaultEmail = localStorage.getItem("DefaultEmail");
    $("#REmailAdd").val(defaultEmail);
    $("#BStextAdd").val("");
    $("#RcommAdd").val("");
    $("#dateAdd").val("");
    $("#ratingsAdd").prop("checked", false);
    $("#calculateAdd").hide();
    $("#FQAdd").val("0");
    $("#SvcAdd").val("0");
    $("#ValueAdd").val("0");
    $("#ORatingsAdd").val("0");
    $("#ndAddFeedbackPage :checkbox").checkboxradio("refresh");

}

function calculate(r1, r2, r3) {
    return (r1 + r2 + r3) * 100 / 15;
}

function getReviews() {
    var options = [];

    function callback(tx, results) {
        console.info("Selecting all Feedback");
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var businessName = row['businessName'];
            var reviewerEmail = row['reviewerEmail'];
            var reviewerComments = row['reviewerComments'];
            var rating1 = row['rating1'];
            var rating2 = row['rating2'];
            var rating3 = row['rating3'];


            calculate(rating1, rating2, rating3);


            htmlCode += `<li>
                            <a data-role="button" data-row-id=${row['id']} href="#">
                                <h1>Business Name: ${businessName}</h1>
                                <p>Reviewer Email: ${reviewerEmail}</p>
                                <p>Comments: ${reviewerComments}</p>
                                <p>Overall Rating: ${calculate(rating1, rating2, rating3)}%</p>
                                
                            </a>
                        </li>`
        }

        if (results.rows.length === 0) {
            htmlCode = `<h4>No Records found</h4>`
        }


        var lv = $("#lstviewFeedback");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop("href", "#ndModifyFeedbackPage");
        }

        $("#lstviewFeedback a").on("click", clickHandler);
    }

    Review.selectAll(options, callback);
}

function showCurrentReview() {

    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, results) {
        console.info("Selecting a Feedback");
        var row = results.rows[0];
        var businessName = row['businessName'];
        var typeId = row['typeId'];
        var reviewerEmail = row['reviewerEmail'];
        var reviewerComments = row['reviewerComments'];
        var reviewDate = row['reviewDate'];
        var hasRating = row['hasRating'];
        var rating1 = row['rating1'];
        var rating2 = row['rating2'];
        var rating3 = row['rating3'];
        calculate(rating1, rating2, rating3);


        $("#txtId").val(id);
        $("#BStextModify").val(businessName);
        $("#cmbModify").val(typeId);
        $("#REmailModify").val(reviewerEmail);
        $("#RcommModify").val(reviewerComments);
        $("#dateModify").val(reviewDate);
        $("#cmbModify").selectmenu("refresh");
        $("#FQModify").val(rating1);
        $("#SvcModify").val(rating2);
        $("#ValueModify").val(rating3);

        if (hasRating === 'true') {
            $("#ratingsModify").prop("checked", true);
            $("#calculateModify").show();
            $("#ORatingsModify").val(calculate(rating1, rating2, rating3 )+ '%');
        } else {
            $("#ratingsModify").prop("checked", false);
            $("#calculateModify").hide();
            $("#ORatingsModify").val("0");
        }
        $("#ratingsModify").checkboxradio("refresh");


    }

    Review.select(options, callback);

}

/**
 * File Name: ndDAL.js
 *
 * Revision History:
 *       Nehal Dogra, 2022-02-18 : Created
 */
var Review = {
    insert: function (options, callback) {
        function txFunction(tx) {
            var createReview = "INSERT INTO review(businessName, typeID, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3) VALUES(?,?,?,?,?,?,?,?,?);";

            tx.executeSql(createReview, options, callback, errorHandler);

        }

        function successTransaction() {
            console.info("Success: Insert Transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options, callback) {
        function txFunction(tx) {
            var createReview = "UPDATE review SET businessName=?, typeID=?, reviewerEmail=?, reviewerComments=?, reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3=? WHERE id=?;";
            tx.executeSql(createReview, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Update Transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function (options, callback) {
        function txFunction(tx) {
            var createReview = "DELETE FROM review WHERE id=?;";
            tx.executeSql(createReview, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Delete Transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function (options, callback) {
        function txFunction(tx) {
            var createReview = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(createReview, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: Select Transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (options, callback) {
        function txFunction(tx) {
            var createReview = "SELECT * FROM review;";
            tx.executeSql(createReview, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: SelectAll Transaction successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }

};

var Type = {
    selectAll: function(options, callback){
        function txFunction(tx) {
            var createType = "SELECT * FROM type;";
            tx.executeSql(createType, options, callback, errorHandler);
        }
        function successTransaction() {
            console.info("Success: selectAll Transaction is successful");
        }
        db.transaction(txFunction, errorHandler, successTransaction);

    }

};
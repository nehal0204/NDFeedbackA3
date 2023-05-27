/**
 * File Name: nddatabase.js
 *
 * Revision History:
 *       Nehal Dogra, 2022-02-18 : Created
 */
var db;

function errorHandler(error) {
    console.error("SQL Error: " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "NDFeedbackA3";
        var version = "1.0";
        var displayName = "DB for NDFeedbackA3 app";
        var dbSize = 2 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }

        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },
    createTables: function () {
        function txFunction(tx) {

            var dropType = "DROP TABLE type;";
            console.info("Dropping Table: type if exists...")

            var createType = "CREATE TABLE IF NOT EXISTS type( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            console.info("Creating Table: type...");

            console.info("Inserting data to Table: type...")
            var typeOthers = "INSERT INTO type (name) VALUES ('Others')";
            var typeCanadian = "INSERT INTO type (name) VALUES ('Canadian')";
            var typeAsian = "INSERT INTO type (name) VALUES ('Asian')";
            var typeEuropean = "INSERT INTO type (name) VALUES ('European')";
            var typeAustralian = "INSERT INTO type (name) VALUES ('Australian')";
            var options = [];

            var createReview = "CREATE TABLE IF NOT EXISTS review( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(30) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES type(id));";

            console.info("Creating Table: review...")

            function successDropTableType() {
                console.info("Success: Type table dropped");
            }

            function successCreateTableType() {
                console.info("Success: Type table created successfully");
            }

            function successInsertRowType() {
                console.info("Success: row inserted successfully to type table");
            }

            function successCreateTableReview() {
                console.info("Success: review table created successfully");
            }

            tx.executeSql(dropType, options, successDropTableType, errorHandler);
            tx.executeSql(createType, options, successCreateTableType, errorHandler);
            tx.executeSql(typeOthers, options, successInsertRowType, errorHandler);
            tx.executeSql(typeCanadian, options, successInsertRowType, errorHandler);
            tx.executeSql(typeAsian, options, successInsertRowType, errorHandler);
            tx.executeSql(typeEuropean, options, successInsertRowType, errorHandler);
            tx.executeSql(typeAustralian, options, successInsertRowType, errorHandler);
            tx.executeSql(createReview, options, successCreateTableReview, errorHandler);
        }

        function successTransaction() {
            console.info("Success transaction: All tables created successfully");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
}
    function dropTables(){
        function txFunction(tx) {
            var DropType = "DROP TABLE IF EXISTS type;"
            var DropReview = "DROP TABLE IF EXISTS review;"
            var options = [];

            function successCallback1() {
                console.info("Success: table dropped successfully");
            }
            function successCallback2() {
                console.info("Success: table dropped successfully");
            }

            tx.executeSql(DropType, options, successCallback1, errorHandler);
            tx.executeSql(DropReview, options, successCallback2, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Transaction is successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);


}
<?php

namespace mutall;
//
//Catch all errors, including warnings.
\set_error_handler(function($errno, $errstr, $errfile, $errline /*, $errcontext*/) {
    throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
});

//The schema is the base of all our applications; it is primarily used for
//supporting the database class
include_once $_SERVER['DOCUMENT_ROOT'].'/schema/v/code/schema.php';
//
//Resolve the questionnaire reference (for loading large tables)
include_once $_SERVER['DOCUMENT_ROOT'].'/schema/v/code/questionnaire.php';
//
//Define the name of the database to write to
const db = 'mutallco_rental';
//
//Define the table lookup function
const lookup = 'capture\\lookup';
//
//The name of the econnection table
//const econnection =
//
//Define the layout for migrating data from peters econnection query to the 
//mutall rental database
$layouts_test = [
    [db, 'room', [], 'uid', 'wycliffe'],
    [db, 'emeter', [], 'num', '57100152743'],
    [db, 'econnection', [], 'end_date', '9999-12-31'],
    [db, 'econnection', [], 'sharing', 1]
];
//
//Define the sql table that is the source of our data
//
//Create a new table object
$table = new \stdClass();
//
//Set the class name of the table to be an sql query
$table -> class_name = "\\capture\\query";
//
//Get the sql from the econection file
$sql_econnection = file_get_contents('sql_econnections.sql');
//
//Set the constructor arguments of the query class
$table -> args = ['t1', $sql_econnection, db];
//
//
$layout = [
    $table,
    [db, 'room', [], 'uid', [lookup,'t1', 'room_uid']],
    [db, 'emeter', [], 'num', [lookup,'t1', 'emeter_num']],
    [db, 'econnection', [], 'end_date', [lookup,'t1', 'econnection_closing_date']],
    [db, 'econnection', [], 'sharing', [lookup,'t1', 'econnection_share']]
];
//
//Use the layouts to create the questionnaire object. 
$q = new questionnaire($layouts_test);
//
//Export the data referenved by ythe questionnaire to the appropriate database
//and log the progress to the given xml file
$html = $q->load_common(__DIR__."\\log.xml");
//
//Show whether the process was successful or not
echo $html;

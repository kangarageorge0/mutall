<?php
//
//Catch all errors, including warnings.
\set_error_handler(function($errno, $errstr, $errfile, $errline /*, $errcontext*/) {
    throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
});

//Set the root directory manually
if ($_SERVER['DOCUMENT_ROOT']==='') $_SERVER['DOCUMENT_ROOT']='d:/mutall_projects';

//The schema is the base of all our applications; it is primarily used for
//supporting the database class. 
include_once $_SERVER['DOCUMENT_ROOT'].'/schema/v/code/sql.php';

//
$selector = new selector('agreement', 'mutallco_rental');

$selector->execute();

echo "<pre>".$selector->stmt()."</pre>";

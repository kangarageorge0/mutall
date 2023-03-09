<?php
//
//Catch all errors, including warnings.
\set_error_handler(function($errno, $errstr, $errfile, $errline /*, $errcontext*/) {
    throw new \ErrorException($errstr, 0, $errno, $errfile, $errline);
});
//
//The schema is the base of all our applications; it is primarily used for
//supporting the database class. 
include_once $_SERVER['DOCUMENT_ROOT'].'/schema/v/code/schema.php';
include_once $_SERVER['DOCUMENT_ROOT'].'/schema/v/code/sql.php';
//
$editor = new \mutall\editor("client", "mutallco_rental");
//
$result = $editor->describe();

//Show the results
echo "<pre>".json_encode($result)."</pre>";

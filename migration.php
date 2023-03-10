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
//Use the layouts to create the questionnaire object. 
$q = new questionnaire([...$layouts]);
//
//Export the data referenved by ythe questionnaire to the appropriate database
//and log the progress to the given xml file
$html = $q->load_common(__DIR__."\\log.xml");
//
//Show whether the process was successful or not
echo $html;

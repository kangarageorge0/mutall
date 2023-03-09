<?php

include_once 'e:/mutall_projects/schema/v/code/schema.php';

$dbase = new mutall\database('school_2', false);

//Get the contents of file /schoo/sqls/ranking.sql;
$sql = $dbase->read_sql('e:/mutall_projects/school/v/sql/ranking.sql');
//
//Show the contents on the screen
echo $sql;

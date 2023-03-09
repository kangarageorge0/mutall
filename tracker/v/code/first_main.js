//Import app from the outlook library.
//
//Resolves reference to the asset.products data type
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//Resolves the app than main extends
import * as app from "../../../outlook/v/code/app.js";
//
//Import the test msg class.
import * as msg from "./msg.js";
//
//Resolves the tree and ear classes
import * as tree from "../../../schema/v/code/tree.js";
import * as ear from "../../../schema/v/code/ear.js";
//
//Import server.
import * as server from "../../../schema/v/code/server.js";
//Resolve references to a database
import * as schema from "../../../schema/v/code/schema.js";
//
export default class main extends app.app {
    //
    //Initialize the main application.
    constructor(config) {
        super(config);
    }
    //
    //Retuns all the products that are specific to this application. They are
    //used to exapnd those from the base application
    get_products_specific() {
        return [
            {
                title: "Actions",
                id: 'actions',
                solutions: [
                    {
                        title: "View due assignments",
                        id: "view_due_assignments",
                        listener: ["event", () => this.vue_due_assignments()]
                    },
                    {
                        title: "Manage Events",
                        id: "events",
                        listener: ["crud", 'event', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Manage Messages",
                        id: "messages",
                        listener: ["crud", 'msg', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Create Message",
                        id: "create_msg",
                        listener: ["event", () => { this.new_msg(); }]
                    },
                    {
                        title: "Row Students",
                        id: "row_students",
                        listener: ["event", async () => {
                                //
                                //Create the exam results view, i.e., page;
                                const exam_1 = new row_students(this);
                                //
                                //Display the exam results view 
                                await exam_1.administer();
                            }]
                    },
                    {
                        title: "Row Students Stream",
                        id: "row_students_stream",
                        listener: ["event", async () => {
                                //
                                //Create the exam results view, i.e., page;
                                const exam_2 = new row_students_stream(this);
                                //
                                //Display the exam results view 
                                await exam_2.administer();
                            }]
                    },
                    {
                        title: "Row Students Stream Year",
                        id: "row_students_stream_year",
                        listener: ["event", async () => {
                                //
                                //Create the exam results view, i.e., page;
                                const exam_3 = new row_students_stream_year(this);
                                //
                                //Display the exam results view 
                                await exam_3.administer();
                            }]
                    },
                    {
                        title: "Page School Students",
                        id: "page_school_students",
                        listener: ["event", async () => {
                                //
                                //Create the exam results view, i.e., page;
                                const exam_4 = new page_school_students(this);
                                //
                                //Display the exam results view 
                                await exam_4.administer();
                            }]
                    },
                    {
                        title: "Filled Exam Results",
                        id: "filled_exam_results",
                        listener: ["event", async () => {
                                //
                                //Create the exam results view, i.e., page;
                                const exam = new filled_exam_results(this);
                                //
                                //Display the exam results view 
                                await exam.administer();
                            }]
                    },
                    {
                        title: "View Form",
                        id: "view_form",
                        listener: ["event", async () => {
                                //
                                //Create the exam results view, i.e., page;
                                const form = new view_form(this);
                                //
                                //Display the exam results view 
                                await form.administer();
                            }]
                    }
                ]
            },
            {
                title: "Manage Hierarchical Data",
                id: 'hierarchies',
                solutions: [
                    {
                        title: "View Directory",
                        id: "view_directory",
                        listener: ["event", async () => await this.view_directory()]
                    },
                    {
                        title: "View XML File",
                        id: "view_xml",
                        listener: ["event", async () => await this.view_xml()]
                    },
                    {
                        title: "View Accounts",
                        id: "view_accounts",
                        listener: ["event", async () => await this.view_records()]
                    },
                    {
                        title: "View CAQ",
                        id: "view_caq",
                        listener: ["event", async () => await this.view_caq()]
                    },
                    {
                        title: "View Products",
                        id: "view_products",
                        listener: ["event", async () => await this.view_services()]
                    },
                    {
                        title: "Viirectory",
                        id: "vieirectory",
                        listener: ["event", async () => await this.view_directory()]
                    }
                ]
            },
            {
                title: "Manage Hierarchical Data",
                id: 'hierarchies',
                solutions: [
                    {
                        title: "View Directory",
                        id: "view_directory",
                        listener: ["event", async () => await this.view_directory()]
                    },
                    {
                        title: "View XML File",
                        id: "view_xml",
                        listener: ["event", async () => await this.view_xml()]
                    },
                    {
                        title: "View Accounts",
                        id: "view_accounts",
                        listener: ["event", async () => await this.view_records()]
                    },
                    {
                        title: "View CAQ",
                        id: "view_caq",
                        listener: ["event", async () => await this.view_caq()]
                    },
                    {
                        title: "View Products",
                        id: "view_products",
                        listener: ["event", async () => await this.view_services()]
                    }
                ]
            },
        ];
    }
    //
    //Allow the user to create a new message and save it in the database.
    async new_msg() {
        //
        //1. Create a pop that facilitates sending a new message.
        const Msg = new msg.msg(this);
        //
        //Collect all the data from the user.
        const result = await Msg.administer();
        //
        //Check the validity of the data.
        if (result === undefined)
            return;
        //
        //Use the questionnare in php class to save the data to the database.
        //
    }
    //
    //List all assignments that are due and have not been reported.
    //Ordered by Date. 
    vue_due_assignments() {
        alert("This method is not implemented yet.");
    }
    //View the root directory using the tree system
    async view_directory() {
        //
        //Formulate the root nolde
        //The root directory is named.... 
        const path = "d:/mutall_projects";
        //
        //Get root content of the directory; its not a file 
        const root = new tree.directory.root(path, false);
        //
        //Create a new explorer, using this main page as the mother. Initially,
        //open the /chama folder 
        const Explorer = new tree.explorer(root, this, ['/', 'chama', 'v', 'code']);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();
    }
    //View an xml document
    async view_xml() {
        //
        //Formulate the (xml) root node
        //Get the filename
        const filename = "d:/mutall_projects/tracker/v/test/log.xml";
        //
        //Read the file content
        const xml = await server.exec('path', [filename, true], 'get_file_contents', []);
        //
        //Get root content of the xml document 
        const root = new tree.xml.root(xml);
        //
        //Create a new explorer, using this main page as the mother. Display
        //the attributes in the tree view 
        const Explorer = new tree.explorer(root, this);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();
    }
    //View records from a hierarchical table in a database
    async view_records() {
        //
        //Formulate the (record) root node
        //Formulate the subject
        const subject = {
            dbname: 'mutall_users',
            ename: 'account'
        };
        //
        //Get root content of a record. Use the 'name' field to access the
        //tagnames. Assume that the process is recursive
        const root = new tree.record.root(subject, 'name', true);
        //
        //Create a new explorer, using this main page as the mother. 
        const Explorer = new tree.explorer(root, this);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();
    }
    //View related (non-hierarchical) records from a database based
    //on the mutall-compliant E-A-R model, to support the CAQ project
    async view_caq() {
        //
        //Formulate the root node
        //
        //Define the starting entity name for the  explorer
        const ename = 'school';
        //Get the named entity from the current 
        const entity = this.dbase.entities[ename];
        //
        //Its an error if the entity id not defined
        if (entity === undefined)
            throw new schema.mutall_error(`Entity '${ename}' cannot be found in database ${this.dbase.name}`);
        //
        //Create the root node
        const root = new ear.root(entity);
        //
        //Create a new explorer, using this main page as the mother.
        const Explorer = new tree.explorer(root, this);
        //
        //Do the administration and ignore the selection
        await Explorer.administer();
    }
    //For saving the last service selected in this application
    selection;
    //View mutall products in a using a tree view
    async view_services() {
        //
        //Convert the this products into tree fashion
        const products = Array.from(this.products.values());
        //
        //Create the root product node with a defined selection. Do we need
        //to initialize it or not? Perhaps we do to complete its definition 
        //before use. Consider re-using teh last slection if any
        const root = new tree.service.content(
        //
        //The root node is named services
        "services", 
        //
        //The root node has no properties
        {}, 
        //
        //The root node corresponds to the un-indexed (list of) products 
        products, 
        //
        //Consider the root node as a product
        true, 
        //
        //Te root node has no listener
        undefined, 
        //
        //
        //The parent of a root node is undefined
        undefined);
        //
        //Do the exploration, and return the new selection
        const Explorer = new tree.explorer(
        //
        //The root product
        root, 
        //
        //The mother page for explorer
        this, 
        //
        //The menu that comes to view initially
        ['hierarchies', 'view_products']);
        //
        //Perform the administraton
        const selection = await Explorer.administer();
        //
        //Save the selection for the next time round, if adminsitrationwas not 
        //aborted 
        if (selection !== undefined)
            this.selection = selection;
    }
}
//display the registration form
class view_form extends outlook.baby {
    //
    //class constructor
    constructor(mother) {
        super(mother, './interns_reg-form copy.html');
    }
    async check() {
        return true;
    }
    async get_result() {
    }
    //
    //Modify the form template so that the body has the data we
    //are interested in. 
    async show_panels() {
    }
}
//Tabulate exam results .......View exam results in a given sitting
class empty_exam_results extends outlook.baby {
    //
    //The the table we want to fill with the exam results (when we load the page)
    table;
    //
    //The data used for filling the tables header is set when we load the page
    subject_data;
    //
    //The data to used to fill the tables body is set when we load the page
    body_data;
    //
    //The row that determines the horizontal size of a tables
    header;
    //The page data
    page_data;
    //
    page_selector_element;
    //
    //All the factors
    factors = ['school', 'year', 'class', 'exam', 'stream', 'student', 'date'];
    //
    //The page factors
    page_factors;
    //
    //The base query
    base_query;
    //The row factors are all the facttprs without the page factorss
    get row_factors() {
        //
        return this.factors.filter(factor => !(this.page_factors.includes(factor)));
    }
    //Filters are an array of selector elements indxed by a factor
    filters = {};
    //Tabulate exem results using a set of page and row factors
    constructor(mother, page_factors) {
        super(mother, "./table.html");
        this.page_factors = page_factors;
    }
    async check() {
        return true;
    }
    async get_result() {
    }
    //Create the table that the results will be populated
    async show_panels() {
        //
        //Se the overall base query (its the shared by all oue other queries)
        this.base_query = await this.get_base_query();
        //
        //Create the page factors in the page section
        await this.show_page();
        //
        //Ensure that the first item on the page selector is selected
        this.page_selector_element.selectedIndex = 0;
        //
        //Show table
        await this.show_table();
    }
    //Fill in the page factor selectors with results from the queries executing
    //the factors
    async fill_filter_options() {
        //
        //Get the base quety
        const base = `
            with page as (
                select
                   school.id as school,
                   year.value as year,
                   class.name as class,
                   exam.name as exam,
                   sitting.date as date,
                   stream.id as stream,
                   student.name as student,
                   subject.name as subject
               from score 
                   inner join candidate on score.candidate=candidate.candidate
                   inner join progress on candidate.progress =progress .progress
                   inner join student on progress.student = student.student
                   inner join year on progress.year = year.year
                   inner join stream on year.stream = stream.stream
                   inner join class on stream.class = class.class
                   inner join school on class.school = school.school
                   inner join performance on score.performance=performance.performance
                   inner join subject on performance.subject=subject.subject
                   inner join sitting on performance.sitting=sitting.sitting
                   inner join exam on sitting.exam=exam.exam
               )`;
        //
        //There as many selectors as there are page factors (use for loop)
        //For each page factor...
        for (const factor of this.page_factors) {
            //
            //Get the selector that corresponds to this factor
            const filter = this.filters[factor];
            //
            //Compile the sql for the selector
            const sql = `
               ${base}
               select distinct
                   ${factor} as fname
               from page;
               `;
            //
            //Execute the sql to get the selectot data
            const data = await server.exec('database', ['school_2', false], 'get_sql_data', [sql]);
            //
            //Use the data to fill the filter options
            //
            //For each data row...
            for (const row of data) {
                //
                //Create the option element for the selector
                this.create_element(
                //
                //The name of the element
                'option', 
                //
                //Add the option to the selector
                filter, 
                //
                {
                    //
                    //Set Option value to the item selected 
                    value: String(row.fname),
                    //
                    //Set the text content of the option to the result from the sql
                    textContent: String(row.fname)
                });
            }
        }
    }
    //
    //Reading the base query from the sqls folder
    async get_base_query() {
        //
        //Get the string query from the sqls folder that is in the ranking.sql
        const sql = `
            with
            #
            #PRESENT THE RAW VALUES NEEDED FOR CALCULATING THE TOTAL
            #
            #Getting the percentages on each subject
            percent as (
                select
                    school.id as school,
                    year.value as year,
                    class.name as class,
                    exam.name as exam,
                    sitting.date as date,
                    stream.id as stream,
                    student.name as student,
                    subject.id as subject,
                    subject.name as subject_name,
                    null as value,
                    null as percent
                from candidate
                    inner join progress on candidate.progress =progress .progress
                    inner join student on progress.student = student.student
                    inner join year on progress.year = year.year
                    inner join stream on year.stream = stream.stream
                    inner join class on stream.class = class.class
                    inner join school on class.school = school.school
                    inner join sitting on candidate.sitting=sitting.sitting
                    inner join exam on sitting.exam=exam.exam
                    inner join performance on performance.sitting=sitting.sitting
                    inner join subject on performance.subject=subject.subject
                order by school,year,class,exam,date,stream,student,subject
            ),
            # 
            #Grading all the percent scores
            grading as(
                select percent.*,
                    #
                    #Add grading using the Expectation system
                    case 
                        when percent >=90 and percent <= 100 then 'E.E'
                        when percent >=50 and percent < 90 then 'M.E'
                        when percent >=30 and percent < 50 then 'A.E'
                        when percent >=0 and percent < 30 then 'B.E'
                        else 'null'
                    end as expectation,
                    #
                    #Add grading using the Abc system
                    case 
                        when percent >=80 and percent <= 100 then 'A'
                        when percent >=75 and percent < 80 then 'A-'
                        when percent >=71 and percent < 75 then 'B+'
                        when percent >=65 and percent < 71 then 'B'
                        when percent >=61 and percent < 65 then 'B-'
                        when percent >=55 and percent < 61 then 'C+'
                        when percent >=51 and percent < 55 then 'C'
                        when percent >=45 and percent < 51 then 'C-'
                        when percent >=41 and percent < 45 then 'D+'
                        when percent >=35 and percent < 41 then 'D'
                        when percent >=31 and percent < 35 then 'D-'
                        else 'E'
                    end as abc                      
                from percent
            ),
            #
            #Collect the raw values as a json object
            raw_values as (
                select
                    #
                    #Select all the fields from percent table
                    grading.*,
                    #
                    #Compile the object using 4 keys, viz., subject, score, percent and
                    #grading(using the expectation format)
                    json_object('subject',subject, 'value',value, 'percent',percent,'grade',expectation) as raw_value
                from grading
            ),
            #
            #Get the total summary of all the scores for each student in each sitting
            #including the raw values
            total as (
                 select 
                    school,
                    year,
                    class,
                    exam,
                    stream,
                    date,
                    student,
                    #
                    #Collect all the raw values into an array
                    json_arrayagg(raw_value) as raw_values,
                    #
                    #Sum of all the percentages for a given sitting
                    sum(percent) as total
                from raw_values
                group by school,year,class,exam,stream, date,student
            ),
            #
            #Ranking the students within a sitting
            rank_students as (
                select total.*,
                    null as ranking,

                    #
                    #NOT GIVING OUT THE CORRECT EXPECTED VALUES WHEN THERE IS ORDERING
                    count(*) over (partition BY  ${this.page_factors.join(',')}) as count
                from total
                window w as (partition BY  ${this.page_factors.join(',')} order by total desc)
            ),
            ######################################-
            #
            #CALCULATING THE MEAN SCORE FOR EACH SUBJECT
            #
            #Getting the mean standard score for each subject
            mean as (
                 select
                    school,
                    year,
                    class,
                    exam,
                    stream,
                    date,
                    subject,
                    sum(percent)/count(percent) as mean,
                    count(*)
                from percent
                group by school,year,class,exam,stream, date,subject

            ),
            #
            #Rank the subjects within a sitting
            rank_subjects as(
                select mean.*,mean,
                    rank() OVER w as ranks
                from mean
                window w as (partition BY school,year,class,exam,stream, date order by mean desc)
            )
    
        `;
        //
        //Return the sql string
        return sql;
    }
    //
    //Show the items on the page section. Here is an example of an item
    //in terms of HTML tags
    /*
        <label>
            <span>School</span>
            <select />
        </label>
     */
    async show_page() {
        //
        //Get the page section
        const header = this.get_element('header');
        //
        //Fill the paginator selector and add the onchange event listener to refresh
        //the page
        await this.fill_paginator_selector();
        //
        //Create the filters
        //
        //Thers are as many page ites as there are page factors
        const items = this.page_factors;
        //
        //For each item create an labeled select element as follows:-
        for (const item of items) {
            //
            //Use the page section to add the label element
            const label = this.create_element('label', header);
            //
            //Use the label element to add a span tag showing the name
            //of the item
            this.create_element('span', label, { textContent: item });
            //
            //Use the same label element to add the input element whose id is the same as
            //item
            const filter = this.create_element('select', label, { id: item });
            //
            this.filters[item] = filter;
        }
        //Fill the filter selectors with optionds
        await this.fill_filter_options();
    }
    //Display the table that matches the current sitting number
    async show_table() {
        //
        //Set the subject data using the subject sql.
        this.subject_data = await this.get_subject_data();
        //
        //Set the body data using the ranking sql.
        this.body_data = await this.get_body_data();
        //
        //Set the table element
        this.table = this.get_element('mytable');
        //
        //Set the filter item values
        this.set_filter_values();
        //
        //Show the row and the column headers
        this.show_header();
        //
        //Show the table's body
        this.show_body();
    }
    //
    //Get the data required for painting the page selector
    async get_page_data() {
        //
        //Compile the sql that exracts the page selector
        const sql = `
            ${this.base_query}
            select distinct
                ${this.page_factors.join(',')},
                concat_ws('/', ${this.page_factors.join(',')} ) as joint 
            from
                rank_students`;
        //
        //Execute the sql to retrieve the actual data
        let data = await server.exec('database', ['school_2', false], 'get_sql_data', [sql]);
        //
        //Return the extracted data
        return data;
    }
    //Fill the page selector options with results from out executing the page
    //selector query and add the onchange event listener to refresh the page
    async fill_paginator_selector() {
        //
        //Get the page data
        this.page_data = await this.get_page_data();
        //
        //Get the page selector element
        this.page_selector_element = this.get_element('selector');
        //
        //Use the results to add options to the selector
        this.fill_paginator_options();
        //
        //Add the onchange event listener
        this.page_selector_element.onchange = async () => await this.show_table();
    }
    //Set the filter values to match the current selection
    async set_filter_values() {
        //
        //Get the current selection index from the sitting selector
        const current_selection = this.page_selector_element.selectedIndex;
        //
        //Use the selection index to get the corresponding page data row
        const row = this.page_data[current_selection];
        //
        //For each page item....
        for (const item of this.page_factors) {
            //
            //Get the item's value
            const item_value = row[item];
            //
            //Get the item's input elememt
            const item_element = this.get_element(item);
            //
            //Set the text content of the input element to the item's value
            item_element.value = String(item_value);
        }
    }
    //
    //Use the the given data  to add options to the given selector
    //Example of a selector filled with options
    /*
        <option value="school='kaps' and year='2014' and class='8' and stream='R'... etc">KAPS/2019/8/R</option>
        <option value="school='aps' and year='2019' and...">KAPS/2019/7/Y</option>
     */
    fill_paginator_options() {
        //
        //For each data element...
        for (const page of this.page_data) {
            //
            //Create the option element for the page selector
            this.create_element(
            //
            //The name of the element
            'option', 
            //
            //Add the option to the selector
            this.page_selector_element, 
            //
            {
                //
                //Set Option value to the page number 
                value: this.get_page_condition(page),
                //
                //Set the text content of the option to the joint string
                textContent: String(page.joint)
            });
        }
    }
    //It returns the condition for selecting one page. E.g.,
    //school='kaps' and year='2014' and class='8' and stream='R'... etc
    //The page data looks like:-
    //{school:'kaps', year:2014, class:8...}
    get_page_condition(page) {
        //
        //Start with an empty result list of factor/value pairs
        const result = [];
        //
        //For each page factor...
        for (const key of this.page_factors) {
            //
            //Get the factor/value pair, formated in the way we would like it 
            //for the condition e.g. year='2014'
            const pair = key + '=' + `'` + page[key] + `'`;
            //
            //Add the factor/value pair into a result list
            result.push(pair);
        }
        //Use the result list to join the factor/value pairs using the 
        //'and' oparator
        return result.join(' and ');
    }
    //Get the subject data using the subject sql.
    async get_subject_data() {
        //
        //Compile the sql that extracts the subject query
        const sql = `
            ${this.base_query}
            select distinct
                subject as id,
                subject_name as name
            from
                percent
            where ${this.page_selector_element.value}`;
        //
        //Execute the sql to the the data
        let data = await server.exec('database', ['school_2', false], 'get_sql_data', [sql]);
        //
        //Return the data
        return data;
    }
    //Get the body data using the ranking sql.
    async get_body_data() {
        //
        //Complie the sql that extracts the body query
        const sql = `
            ${this.base_query}
            select
                rank_students.*
            from
                rank_students
            where
                ${this.page_selector_element.value}`;
        //Execute the sql to retrieve the actual data
        let data = await server.exec('database', ['school_2', false], 'get_sql_data', [sql]);
        //
        //Return the extracted data
        return data;
    }
    //Use the subject data to show the header.
    show_header() {
        //
        //Clear the table header
        this.table.tHead.innerHTML = "";
        //
        //Show the score columns comprising of value/grade/percent triples
        this.show_score_row();
    }
    //4. Use the body data to show the body.
    show_body() {
        //
        //Clear the body
        this.table.tBodies[0].innerHTML = "";
        //
        //Created the empty table matrix
        this.create_empty_body();
        //
        //Populate the matrix with the body values
        this.fill_body();
    }
    //
    //Show the top row. It has 3 columns, viz., id, raw_values, summary. The id
    //column has a span of 1. The raw values column has a span of number of 3
    //times subjects and the summary has a span of 2. The titles for these 3 
    //sections are 'id', 'raw values' and summary, respectively  
    //Created the empty table matrix based on the columns of the header row and 
    //throws in the table's body
    create_empty_body() {
        //
        //For each body row...
        for (let row = 0; row < this.body_data.length; row++) {
            //
            //Create a new row
            const tr = this.table.tBodies[0].insertRow();
            //
            //For each header column...
            for (let col = 0; col < this.header.cells.length; col++) {
                //
                //The first column is a row header cell, th
                if (col === 0)
                    this.create_element('th', tr);
                //
                //The rest are normal (td) cells
                else
                    this.create_element('td', tr);
            }
        }
    }
    //Show the header row that determines the horizontal dimension of the table
    show_score_row() {
        //
        //Create the score type row
        this.header = this.table.tHead.insertRow();
        //
        //Show the row headers
        for (const key of this.row_factors) {
            this.create_element('th', this.header, { id: key, textContent: key });
        }
        //
        //Show as many columns as the product of subjects and score types
        this.show_score_cells();
    }
    //Construct and display the cells in the score row, the 3rd row of our table
    show_score_cells() {
        //
        //For each subject....
        for (const subject of this.subject_data) {
            //
            //For each score type...
            for (const name of ['value']) {
                //
                //Formulate the id of the cell
                const id = `${subject.id}_${name}`;
                const names = subject.name;
                //
                //Create a header cell, with the given name and id 
                this.create_element('th', this.header, { id: id, textContent: names });
            }
        }
    }
    //Fill the empty table with the available data for table's body
    fill_body() {
        //
        //For each body row...
        for (let row = 0; row < this.body_data.length; row++) {
            //
            //Get the referenced table body row
            const tr = this.table.tBodies[0].rows[row];
            //
            //Destructure the body row
            const row_data = this.body_data[row];
            //
            //Set the row header cells
            for (const rh of this.row_factors) {
                this.set_cell(rh, row_data[rh], tr);
            }
            //
            //Set the cells for score type names
            this.set_score_cells(String(row_data.raw_values), tr);
        }
    }
    //Lookup the identified header cell and set it the matching body cell
    //to the given value
    set_cell(id, value, tr) {
        //
        //Get the identified cell
        const th = this.get_element(id);
        //
        //Get the matching cell from the body row
        const td = tr.cells[th.cellIndex];
        //
        //Set the body cell to the given value
        td.textContent = String(value);
    }
    //Set the body cells that are part of the score values
    set_score_cells(raw_values, tr) {
        //
        //Convert the string to an array of subject values
        const subjects = JSON.parse(raw_values);
        //
        //For each subject....
        for (const subject of subjects) {
            //
            //For each named score type
            for (const name of ['value']) {
                //
                //Formulate the cell id
                const id = `${subject.subject}_${name}`;
                //
                //Set the identified ccell
                this.set_cell(id, subject[name], tr);
            }
        }
    }
}
//
//Populate the empty exam results
class filled_exam_results extends empty_exam_results {
    //
    //
    constructor(mother) {
        super(mother, []);
    }
}
//Tabulate exem results using the page factors 'school', 'year', 'class', 'exam',
// 'stream', 'date' as  and row factors as student
class row_students extends empty_exam_results {
    //
    //The 
    constructor(mother) {
        super(mother, ['school', 'year', 'class', 'exam', 'stream', 'date']);
    }
}
//Tabulate exem results using the page factors 'school', 'year', 'class', 'exam',
// 'date' as  and row factors as student and stream
class row_students_stream extends empty_exam_results {
    //
    //
    constructor(mother) {
        super(mother, ['school', 'year', 'class', 'exam', 'date']);
    }
}
//Tabulate exem results using the page factors 'school', 'class', 'exam',
// 'date' as  and row factors as student and stream
class row_students_stream_year extends empty_exam_results {
    //
    //
    constructor(mother) {
        super(mother, ['school', 'class', 'exam', 'date']);
    }
}
//Tabulate exem results using the page factors 'school', 'class', 'exam',
// 'date' as  and row factors as student and stream
class page_school_students extends empty_exam_results {
    //
    //
    constructor(mother) {
        super(mother, ['school', 'student']);
    }
}
;

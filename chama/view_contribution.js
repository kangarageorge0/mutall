//Accessing the mutall library
import * as server from "../../../schema/v/code/server.js";
//Show contributions by users for all the events as a matrix
export async function create_matrix() {
    //
    //Show the header section of contriobutions matrix
    const events = await create_header();
    //
    //Show the body section of the contribtions matrix
    await create_body(events);
    //
    //Show the body section of the contribtions matrix
    await create_footer();
}
//Show contributions by users for all the events as a matrix
export async function create_matrix2() {
    //
    //Show the header section of contriobutions matrix
    const events = await create_header();
    //
    //Show the body section of the contribtions matrix
    await create_body2(events);
    //
    //Show the body section of the contribtions matrix
    await create_footer();
}
//Show the header section of contributions matrix, returning the number of events
//which is the crumb size
async function create_header() {
    //
    //1. Get data for the header section of the contribution matrix
    const header_data = await server.exec('database', ['mutall_chama'], 'get_sql_data', ['select name, title from event order by date asc']);
    //
    //2. Use the data to show the header row and its cells
    //
    //2.1 Get the header element
    const header_elem = get_element('header');
    //
    //2.2 Create the header table row element as a child of the header
    const header_tr = create_element('tr', header_elem);
    //
    //Membership
    create_element('th', header_tr, 'Membership', 'membership');
    //
    //
    //2.3 Create the CREST cells; there is only one: the name of the 
    ////contributor
    create_element('th', header_tr, 'Contributor', 'name');
    //
    //2.4 Create the CRUMB cells; there as many as there are events
    header_data.forEach(row => create_element('th', header_tr, row.title, row.name));
    //
    //Create the SUMMARY cells, i.e., the total and count
    create_element('th', header_tr, 'Total', 'total');
    const count = create_element('th', header_tr, 'Count', 'count');
    //
    //onclick
    //count.onclick = ()=>  alert('hi');
    count.onclick = () => create_new();
    //
    return header_data.length;
}
function create_new() {
    //Clear table'
    const header = get_element('header');
    //
    //
    header.innerHTML = '';
    //Clear table'
    const body = get_element('body');
    //
    //
    body.innerHTML = '';
    //Clear table'
    const footer = get_element('footer');
    //
    //
    footer.innerHTML = '';
    create_matrix2();
}
//
//Return the identified element, if it exists. If it does not, then throw an
//exception 
function get_element(id) {
    //
    //Get the identified element from the current browser context.
    const element = document.querySelector(`#${id}`);
    //
    //Check the element for a null value
    if (element === null)
        throw new Error(`The element identified by #${id} not found`);
    //
    //Return (found) the element       
    return element;
}
//The general procedure for crreating an element    
function create_element(type, parent, textContent, id) {
    //
    //Use the document object to create one of its element
    const elem = document.createElement(type);
    //
    //Attach the alement to the parent
    parent.appendChild(elem);
    //
    //Add the text content if available
    elem.textContent = textContent === undefined ? '' : textContent;
    //
    //Add an id if available
    elem.id = id === undefined ? '' : id;
    //
    //Rteurn the element
    return elem;
}
//Create the body region of the contribution matrix in 2 phases. Phase 1 create
////the empty body cells. Phase 2 fills them with data
async function create_body(events) {
    const sql = `with
    base as (
        select 
            contributor.membership as membership,
            user.name as name,
            json_arrayagg(json_object('event', event.name, 'amount', contribution.amount)) as amount,
            sum(contribution.amount) as total,
            count(contribution.amount) as count
        from 
            contribution
            inner join event on contribution.event = event.event
            inner join contributor on contribution.contributor = contributor.contributor
            inner join membership on contributor.membership = membership.membership
            inner join user on membership.user = user.user
        group by user.name, contributor.membership
     ) 
     select * from base order by count desc`;
    //
    //1. Get the data for filling the BODY region of the contribution matrix
    const body_data = await server.exec('database', ['mutall_chama'], 'get_sql_data', [sql]);
    //
    //2. Use the data to show the body 
    //
    //2.1 Get the body table section
    const body_elem = get_element('body');
    //
    //2.2 Guided by the data and header column sizes, create the empty body
    body_data.forEach(row => create_body_row(body_elem, events));
    //
    //2.3 Fill the empty BODY skeleton with the data
    body_data.forEach((row, index) => fill_body_row(row, index, body_elem));
    //
}
//Create the body region of the contribution matrix in 2 phases. Phase 1 create
////the empty body cells. Phase 2 fills them with data
async function create_body2(events) {
    const sql = `with
    base as (
        select 
            contributor.membership as membership,
            user.name as name,
            json_arrayagg(json_object('event', event.name, 'amount', contribution.amount)) as amount,
            sum(contribution.amount) as total,
            count(contribution.amount) as count
        from 
            contribution
            inner join event on contribution.event = event.event
            inner join contributor on contribution.contributor = contributor.contributor
            inner join membership on contributor.membership = membership.membership
            inner join user on membership.user = user.user
        group by user.name, contributor.membership
     ) 
     select * from base order by count asc`;
    //
    //1. Get the data for filling the BODY region of the contribution matrix
    const body_data = await server.exec('database', ['mutall_chama'], 'get_sql_data', [sql]);
    //
    //2. Use the data to show the body 
    //
    //2.1 Get the body table section
    const body_elem = get_element('body');
    //
    //2.2 Guided by the data and header column sizes, create the empty body
    body_data.forEach(row => create_body_row(body_elem, events));
    //
    //2.3 Fill the empty BODY skeleton with the data
    body_data.forEach((row, index) => fill_body_row(row, index, body_elem));
    //
}
//Create an empty body row with the CREST, CRUMB and SUMMARY sections
function create_body_row(body, events) {
    //
    //Create a body row element
    const body_tr = create_element('tr', body);
    body_tr.onclick = () => body_tr.style.backgroundColor = 'lime';
    //
    //Add the CREST section cells. There is only one: the membership.
    create_element('th', body_tr);
    //
    //Add the CREST section cells. There is only one: the name.
    create_element('th', body_tr);
    //
    //Add the CRUMB section cells. There are as may as events
    for (let i = 0; i < events; i++)
        create_element('td', body_tr);
    //
    //Add the SUMMARY section cells. There are 2: total and summary
    create_element('th', body_tr);
    create_element('th', body_tr);
}
//Fill the body row with data
function fill_body_row(row, index, body_elem) {
    //
    //Use the index to get the body row
    const tr = body_elem.rows[index];
    //
    //Show the only crest cell, name of the membership
    const membership = get_element('membership');
    tr.cells[membership.cellIndex].textContent = String(row.membership);
    //
    //Show the only crest cell, name of the contributor
    const td = get_element('name');
    tr.cells[td.cellIndex].textContent = row.name;
    //
    //Decode the crumb data, the amounts
    const crumb_data = JSON.parse(row.amount);
    //
    //Show the crumb cells
    crumb_data.forEach(record => fill_crumb_body_cell(record, tr));
    //
    //Show the summary cells, total and count
    const total = get_element('total');
    tr.cells[total.cellIndex].textContent = String(row.total);
    //
    const count = get_element('count');
    tr.cells[count.cellIndex].textContent = String(row.count);
}
//Fill the crumb cell that matches the contributionevent with teh maount
function fill_crumb_body_cell(amount, tr) {
    //
    //Get the header cell that matches the event
    const header_td = get_element(amount.event);
    //
    //Get cell in the current tr, that matces the header cell
    const td = tr.cells[header_td.cellIndex];
    //
    //Set the text content of the header cell
    td.textContent = String(amount.amount);
}
//Show the footer section of contributions matrix, returning the number of events
//which is the crumb size
async function create_footer() {
    //
    //1. Get data for the header section of the contribution matrix
    const footer_data = await server.exec('database', ['mutall_chama'], 'get_sql_data', [` with
        footer as(
        select 
            event.title,
            event.date,
            sum(contribution.amount) as bottom,
            count(contribution.amount) as count
        from 
            contribution
            inner join event on contribution.event = event.event
        group by event.title,event.date
        )
        select * from footer order by date asc;  `]);
    //
    //2. Use the data to show the footer row and its cells
    //
    //2.1 Get the footer element
    const footer_elem = get_element('footer');
    //
    //2.2 Create the footer table row element as a child of the header
    const footer_tr = create_element('tr', footer_elem);
    //
    //2.3 Create the bottom cells; 
    create_element('th', footer_tr, 'Total', 'total2');
    create_element('th', footer_tr, 'Total', 'total3');
    //
    //2.4 Create the bottom cells; there as many as there are events   
    footer_data.forEach(row => create_element('th', footer_tr, String(row.bottom), String(row.bottom)));
    create_element('th', footer_tr, '', 'count');
    //
    //Create another row for the count
    //
    //2.2 Create the footer table row element as a child of the header
    const count_tr = create_element('tr', footer_elem);
    //
    //Create the SUMMARY cells, i.e., the total and count
    create_element('th', count_tr, 'Count', 'count1');
    create_element('th', count_tr, 'Count', 'count2');
    footer_data.forEach(row => create_element('th', count_tr, String(row.count), String(row.count)));
    //
    //  
    return footer_data.length;
}

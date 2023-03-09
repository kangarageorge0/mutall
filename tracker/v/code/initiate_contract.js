export class initiate_contract {
    //
    //Method for constructing this actitvity
    constuctor(){}
    //
    //
    schedule():void{
        //
        //2. Save the activity to the database.
        const save= app.app.current.writer.save(this);
        //
        //3. Use the activity start date, end date and deletion status to decide
        //if it is necessary to refresh the scheduler or not.
        const file:'crontab'|'atcommands'|null = this.get_refresh_file();
        //
        //4. If it is necessary, i.e., the activity is active then refresh the 
        //scheduler.
        if (file!==null) app.app.scheduler.refresh(file);
    }
    
    get_refresh_file():'crontab'|'atcommands'|null{
        //
        //Do an sql that get activities that are repetitive.
        const crontab=
            select 
                name from   
            activity    
                where recursion like 'yes';
        //
        //do an sql that gets the activities that are non-repetitive
        const atcommands=
            select 
                name from   
            activity    
                where recursion like 'no'= new atcommands;
    }
}


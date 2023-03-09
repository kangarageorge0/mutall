with 
    recursive x as (
        select account, id, child_of from account where account = 294
    
        union
        select account.account, account.id, account.child_of 
        from account
        inner join x on x.child_of = account.account
    )    

select x.*, row_number() over () as counter  
from x
order by counter desc;

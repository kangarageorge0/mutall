with
    recursive x as (
        select account as master, account, id, child_of from account
        union all
        select x.account as master, account.account, account.id, account.child_of 
            from account
            inner join x on x.child_of = account.account 
    ) ,
    y as (
        select x.master, id, row_number() over(partition by master) as num from x
    ),
    z as (
        select * from y order by master, num desc
    ),
    a as (
        select master, json_arrayagg(id) as layout from z group by master
    ),
    layout as (
        select json_array('mutall_users', 'account', layout, 'id', account.id) 
        from a
        inner join account on account.account = a.master
    ),
    b as (
        select master, id, num, json_arrayagg(id) over(partition by master order by num desc) as layout
        from y
    )
    select * from b where num=1;
     
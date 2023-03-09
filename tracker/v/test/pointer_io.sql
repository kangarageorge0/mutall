with
    -- agreement selector query
    agreement as (
        select
            agreement.agreement,
            client.client,
            --
            -- A row counter, within a client
            row_number() over(partition by client.client order by agreement.agreement) as counter,
            --
            --The agrrement id and friendy name
            json_object(
                "pk", agreement.agreement,
                "id", concat(client.name,'-',room.uid)
            ) as id
            
        from 
            agreement
            inner join client on agreement.client = client.client
            inner join room on agreement.room = room.room
        where agreement.terminated is null    
    ),
    -- counter and sampled array aggregates
    counter as (
        select 
            client,
            count(agreement) as size
        from
            agreement
        group by
            client
    ),
    --
    --Select from he pool all the agreements with 2 or less records
    subset as (
        select
            client,
            json_arrayagg(id) as id
        from
            agreement
        where
            counter<=2
        group by
            client
    )
    
select * from subset;
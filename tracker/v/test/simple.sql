select
    intern.name as intern,
    intern.email as intern_email,
    intern.number as intern_mobile,
    intern.start_date as start_date,
    intern.attachment as attachment,
    intern.requirement as requirement,
    intern.availability as availability,
    intern.residence as residence,
    intern.language as programming_language,
    kin.name as kin_name,
    referee.name as referee_name,
    referee.phone as referee_mobile,
    sponsor.name as sponsor_name,
    sponsor.phone as sponsor_mobile
from intern
    inner join kin on intern.kin=kin.kin
    inner join referee on intern.referee=referee.referee
    inner join sponsor on intern.sponsor=sponsor.sponsor;



select name from activity where recursion like 'repetitive';

select recursion from activity where end_date !'today';

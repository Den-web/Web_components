$(function(){
    
    var time = new Date();
    var target_time = new Date(time.getFullYear(), time.getMonth(), time.getDate());

    var note = $('#note'),
        ts = new Date(2014, 06, 28),
        newYear = true;
    
    if((new Date()) > ts){
    //  // The new year is here! Count towards something else.
    //  // Notice the *1000 at the end - time must be in milliseconds
    ts = target_time.valueOf()+1000*60*60*24;
    newYear = false;
    }
        
    $('.countdown').countdown({
        timestamp   : ts,
        callback    : function(days, hours, minutes, seconds){
            
            var message = "";
            
            message += days + " дней" + ( days==1 ? '':'' ) + ", ";
            message += hours + " часов" + ( hours==1 ? '':'' ) + ", ";
            message += minutes + " минут" + ( minutes==1 ? '':'' ) + " и ";
            message += seconds + " секунд" + ( seconds==1 ? '':'' ) + " <br />";
            
            if(newYear){
                message += "";
            }
            else {
                message += "";
            }
            
            note.html(message);
        }
    });
    
});
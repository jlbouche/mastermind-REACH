init()

function init(){
    $(document).ready(function(){
        if(!Cookies.get('alert')) {
            $('#infoModal').modal({show:true});
            Cookies.set('alert', true);
        }
    })
}
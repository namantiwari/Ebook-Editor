var el;
var pages;


function updateSlideShow(dir){


    var slide_holder=el.parentElement;
    var slide_array=[];
    var index=-1;

    for(var i=2;i<slide_holder.children.length;i++){
        slide_array[i-2]=slide_holder.children[i];
        if($(slide_holder.children[i]).hasClass('active_slide')){
            index=i;
        }
    }

    var slide_id=parseInt(slide_holder.id.substring(slide_holder.id.length-1));
    if(dir!=0 && index-2>=0 && !(dir==-1 && index-2==0) && !(dir==1 && index-1==slide_array.length)){
        
        if($(slide_holder.children).hasClass('active_slide')){
            $(slide_holder.children).removeClass('active_slide');
            $(slide_holder.children).addClass('inactive_slide');
            
        }
    }
    if(dir==-1 && index-2>0){
        $(slide_array[index-3]).removeClass('inactive_slide');
        $(slide_array[index-3]).addClass('active_slide');
    }
    if(dir==1 && index-2<slide_array.length-1){
        $(slide_array[index-1]).removeClass('inactive_slide');
        $(slide_array[index-1]).addClass('active_slide');
    }
        
    

}


$('#left').click(function(e){
    el=document.getElementById(e.target.id);
    updateSlideShow(-1);
});
$('#right').click(function(e){
    el=document.getElementById(e.target.id);
    updateSlideShow(1);
});

$(document).ready(function(){

pages=document.getElementById('main').children;

for(var i=0;i<pages.length;i++){
    var page=pages[i];
    var p_width=$(page).width();
    var p_height=$(page).height();
    page.style.width=100+'vw';
    page.style.height=100+'vh';
    var page_elements=page.children;

    for(var j=0;j<page_elements.length;j++){

        var scale_w,scale_h;
        scale_w=$(page).width()/$(page_elements[j]).width();
        scale_h=$(page).height()/$(page_elements[j]).height();
        $(page_elements[j]).css({
            transform:'scale('+scale_w+','+scale_h+')',
        });

        /*var w_ratio=$(page_elements[j]).width()/p_width;
        var aspect_ratio=$(page_elements[j]).height()/$(page_elements[j]).width();
        page_elements[j].style.width=100*w_ratio+'vw';
        page_elements[j].style.height=aspect_ratio*(parseInt(page_elements[j].style.width.substring(0,page_elements[j].style.width.length-2)))+'vh';*/

    }

    //page.style.width=100+'vw';
    //page.style.height=100+'vh';
    //page.style.left=0;
}

});








var drag_id;
var text_id=0;
var page_id=0;
var current_page=0;
var active_page_id='';
var count_page=0;
var image_id=0;
var active_image_id;
var delete_item=-1;
var active_text_id;
var video_id=0;
var active_video_id;


function drag(event){
    drag_id=event.target.id;
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(drag_id,
    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY))
}
function allowdrag(event){
    event.preventDefault();
}



function onDrop(event){
    var offset = event.dataTransfer.getData(drag_id).split(',');
    var dm = document.getElementById(drag_id);
    dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
    event.preventDefault();
}

function getSelection(){
    if(document.getSelection()){
    select=document.getSelection();
    return select;
    }
}



function changeFontSize(select,s){
    console.log(select);
    var span=document.createElement('span');
    span.innerHTML=select.toString();
    span.style.fontSize=s+"px";
    var range=select.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);    
}


window.currFocus = document;

$(document).on( 'focusin', function () {
  window.prevFocus = window.currFocus;
  console.log('previous focus set to:')
  console.log(window.currFocus);
  window.currFocus = document.activeElement;
  if(window.prevFocus==document.getElementById('input_image')){
    var file=document.getElementById('input_image').files[0];
    console.log('hello world '+file)
    var reader=new FileReader();
    reader.onloadend=function(){
        $('#input_image').remove();
        document.getElementById(active_image_id).style.background='url('+reader.result+')';
        document.getElementById(active_image_id).style.backgroundRepeat='no-repeat';
        delete_item=2;
    }
    if(file){
        reader.readAsDataURL(file);
    }
  }

  
});


$('#main').on('click',function(event){
    if(event.target.id.includes('page_holder')){
        delete_item=0;
        active_page_id=event.target.id;
    }
    if(event.target.id.includes('text_holder')){
        delete_item=1
        active_text_id=event.target.id;
    }
    if(event.target.id.includes('image_holder')){
        delete_item=2
        active_image_id=event.target.id;
    }
    if($('.menuListSize,.menuSize,.size-button').hasClass('visible')){
        $('.menuListSize,.menuSize,.size-button').removeClass('visible');
        $('.menuListSize,.menuSize,.size-button').addClass('invisible');
    }
    if($('.menuListStyle,.menuStyle,.style-button').hasClass('visible')){
        $('.menuListStyle,.menuStyle,.style-button').removeClass('visible');
        $('.menuListStyle,.menuStyle,.style-button').addClass('invisible');
    }
})


$('#Fsize').on('click',function(event){
    event.stopPropagation();
    $(this).keydown(function(event){
        if(event.which==13){
            $("#toolbar").trigger('click');
        }
    })
})




$("#toolbar").on('click',function(event){
    if(event.originalEvent!=undefined)
    var _id=event.target.id;
    else
    var _id="Fsize";

    $("toolbar").off('keydown','#Fsize');
    var select=getSelection();

    if(_id=="b_button"){
        document.execCommand('bold');
    }
    if(_id=="i_button"){
        document.execCommand("italic");
    }
    if(_id=="u_button"){
        document.execCommand("underline");
    }
    if(_id=="Fsize_button" ||_id== "Fsize"){
        $('.menuListSize,.menuSize,.size-button').removeClass('invisible');
        $('.menuListSize,.menuSize,.size-button').addClass('visible');
        $('.size-button').click(function(ev){
            ev.stopPropagation();
            $('.size-button').removeClass("activesize");
            $(this).addClass("activesize");
            
            if($('.menuListSize,.menuSize,.size-button').hasClass('visible')){
              $('.menuListSize,.menuSize,.size-button').removeClass('visible');
              $('.menuListSize,.menuSize,.size-button').addClass('invisible');
            }
            size=$('button.activesize').text();
            changeFontSize(select,size);
            document.getElementById('Fsize').value=size;
        });

        if(_id=="Fsize"){
        var size=document.getElementById(_id).value;
        changeFontSize(select,size);
        }
        
        
    }
    if(_id=="Fstyle_button" || _id=="Fstyle"){
        $('.menuListStyle,.menuStyle,.style-button').removeClass('invisible');
        $('.menuListStyle,.menuStyle,.style-button').addClass('visible');
        $('.style-button').click(function(ev){
            ev.stopPropagation();
            $('.style-button').removeClass("activestyle");
            $(this).addClass("activestyle");
            if($('.menuListStyle,.menuStyle,.style-button').hasClass('visible')){
              $('.menuListStyle,.menuStyle,.style-button').removeClass('visible');
              $('.menuListStyle,.menuStyle,.style-button').addClass('invisible');
            }
            var fontname=$('button.activestyle').text();
            document.execCommand('fontname',false,fontname);
            document.getElementById('Fstyle').value=fontname
        });
    }

    if(_id=='l_align'){
        document.execCommand('justifyLeft',false,select.toString());
    }
    if(_id=='c_align'){
        document.execCommand('justifyCenter',false,select.toString());
    }
    if(_id=='r_align'){
        document.execCommand('justifyRight',false,select.toString());
    }
});



$('#widgetbar').on('click',function(event){
    var _id=event.target.id;

    if(_id=='new_page'){
        count_page=count_page+1;
        page_id=page_id+1;
        delete_item=0;

        if(count_page>1){
            $('html').css('height',($('html').css('height'))*count_page);
            $('body').css('height',($('body').css('height'))*count_page);
            $('#main').css('height',($('#main').css('height'))*count_page);


        }

        var el=document.createElement('div'); 
        $(el).attr({
            id:'page_holder'+page_id,
            draggable:false,
            contenteditable:false,
        });
        $(el).css({
            position:'relative',
            backgroundColor:'white',
            width:800+'px',
            height:1000+'px',
            borderStyle:'solid',
            borderWidth:1+'px',
            margin:'auto',
            top:100+'px',
            bottom:100+'px',
            marginTop:100+'px',

        });
        document.getElementById('main').appendChild(el); 
        active_page_id=el.id;
    }
    
    if(_id=='new_button'){
        text_id=text_id+1;
        delete_item=1;
        var el=document.createElement('div');
        $(el).attr({
            id:'text_holder'+text_id,
            draggable:true,
            contenteditable:true,
        });
        $(el).css({
            position:'absolute',
            width:100+'px',
            height:100+'px',
            borderStyle:'dashed',
            borderWidth:1+'px',
            resize:'both',
            overflow:'auto',
            margin:'auto',
            zIndex:20,

        });
        el.addEventListener('dragstart',function(e){
            drag(e);
        })
        active_text_id=el.id;
        document.getElementById(active_page_id).appendChild(el);

    }
    if(_id=='image_button'){
        image_id=image_id+1;
        var el=document.createElement('div');
        $(el).attr({
            id:'image_holder'+image_id,
            draggable:true,
            contenteditable:true,
        });
        $(el).css({
            position:'absolute',
            width:300+'px',
            height:300+'px',
            borderStyle:'dashed',
            borderWidth:1+'px',
            resize:'both',
            overflow:'auto',
            margin:'auto',
        });
        el.addEventListener('dragstart',function(e){
            drag(e);
        })
        document.getElementById(active_page_id).appendChild(el);
        active_image_id=el.id;
        var input=document.createElement('input');
        $(input).attr({
            id:'input_image',
            type:'file',
            margin:'auto',
        })
        document.getElementById(active_image_id).appendChild(input);
        
    }
    if(_id=='video-button'){
        video_id=video_id+1;
    }
    if(_id=='delete_button'){
        if(delete_item==0){
            $('#'+active_page_id).remove();
            count_page=count_page-1;
        }
        else if(delete_item==1){
            $('#'+active_text_id).remove();
        }
        else if(delete_item==2){
            $('#'+active_image_id).remove();
        }
    }
});










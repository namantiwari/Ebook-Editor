var drag_id;
var text_id = 0;
var page_id = 0;
var page_no = 0;
var last_page = 0;
var active_page_id = '';
var count_page = 0;
var img_id = 0;
var active_img_id;
var delete_item = -1;
var active_text_id;
var video_id = 0;
var active_video_id;
var resizer_array = [];
var resizer_status = [false, 'none'];
var page_array = [];
var init_height;
var default_height;
var media_type;
var count_media=0;
var active_media_id;
var slideshow_id=0;
var active_slideshow;
var holder_adj='';
var slide_no=0;




function drag(event) {
    drag_id = event.target.id;
    var drag_el=document.getElementById(drag_id);

    if($(drag_el).has('.c_resize').length!=0){
        if($('.c-resize').hasClass('resizer_on')){
            $('.c-resize').removeClass('resizer_on');
            $('.c-resize').addClass('resizer_off');
        }
        for (var i = 0; i < 8; i++) {
            drag_el.removeChild(resizer_array[i]);
        }
        resizer_status[0] = false;
    }

    var style = window.getComputedStyle(event.target, null);;
    
    style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData(drag_id,
        (parseInt(style.getPropertyValue("left"), 10) - event.pageX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.pageY) + ',');
}

function allowdrag(event) {
    event.preventDefault();
}



function onDrop(event) {
    var offset = event.dataTransfer.getData(drag_id).split(',');
    var dm = document.getElementById(drag_id);
    dm.style.left = (event.pageX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.pageY + parseInt(offset[1], 10)) + 'px';
    if(event.target.id.includes('page_holder') && (drag_id.includes('text_holder')||drag_id.includes('img_holder')||(drag_id.includes('video_holder'))||(drag_id.includes('temp_media_holder'))) ){
        UpdateParent(event.target.id);
    }
    event.preventDefault();
    event.stopPropagation();
}

function UpdateParent(new_parent_id){
    var new_parent=document.getElementById(new_parent_id);
    var drag_element=document.getElementById(drag_id);
    var drag_parent=drag_element.parentElement;
    var new_top=parseInt($(drag_element).css('top').substring(0,$(drag_element).css('top').length-2))+parseInt($(drag_parent).css('top').substring(0,$(drag_parent).css('top').length-2))-parseInt($(new_parent).css('top').substring(0,$(new_parent).css('top').length-2));
    $(drag_element).css('top',new_top+'px');
    var new_left=parseInt($(drag_element).css('left').substring(0,$(drag_element).css('left').length-2))+parseInt($(drag_parent).css('left').substring(0,$(drag_parent).css('left').length-2))-parseInt($(new_parent).css('left').substring(0,$(new_parent).css('left').length-2));
    $(drag_element).css('left',new_left+'px');
    drag_parent.removeChild(drag_element);
    new_parent.appendChild(drag_element);
}


function getSelection() {
    if (document.getSelection()) {
        select = document.getSelection();
        return select;
    }
}



function changeFontSize(select, s) {
    var span = document.createElement('span');
    span.innerHTML = select.toString();
    span.style.fontSize = s + "px";
    var range = select.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
}

function startResize(event, tar_id, parent_el) {

    event.stopPropagation();
    var add_left = -5;
    var add_top = -5;
    for (var i = 0; i < 8; i++) {
        parent_el.appendChild(resizer_array[i]);

        if (i < 3 && i >= 1) {
            add_left = add_left + ($(parent_el).width() / 2);
        }
        else if (i >= 3 && i < 5) {
            add_top = add_top + ($(parent_el).height() / 2);
        }
        else if (i >= 5 && i < 7) {
            add_left = add_left - ($(parent_el).width() / 2);
        }
        else if (i == 7) {
            add_top = add_top - ($(parent_el).height() / 2);
        }
        resizer_array[i].style.top = add_top + 'px';
        resizer_array[i].style.left = add_left + 'px';

    }



    if (tar_id == 'c_1') {

        offsetRight = $(window).width() - ($(parent_el).offset().left + $(parent_el).outerWidth());
        offsetBottom = $(window).height() - ($(parent_el).offset().top + $(parent_el).outerHeight());

        $(parent_el).css('bottom', $(parent_el).css('bottom'));
        $(parent_el).css('right', $(parent_el).css('right'));
        $(parent_el).css('top','');
        $(parent_el).css('left','');
        
        parent_el.style.width = (($(window).width() - event.pageX) - offsetRight) + 'px';
        parent_el.style.height = (($(window).height() - event.pageY) - offsetBottom) + 'px';
    }
    if (tar_id == 'c_2') {

        offsetBottom = $(window).height() - ($(parent_el).offset().top + $(parent_el).outerHeight());

        $(parent_el).css('bottom', $(parent_el).css('bottom'));
        $(parent_el).css('left', $(parent_el).css('left'));
        $(parent_el).css('right', $(parent_el).css('right'));
        $(parent_el).css('top', '');

        parent_el.style.height = (($(window).height() - event.pageY) - offsetBottom) + 'px';
    }

    if (tar_id == 'c_3') {

        offsetBottom = $(window).height() - ($(parent_el).offset().top + $(parent_el).outerHeight());

        $(parent_el).css('bottom', $(parent_el).css('bottom'));
        $(parent_el).css('left', $(parent_el).css('left'));
        $(parent_el).css('top', '');
        $(parent_el).css('right', '');

        parent_el.style.width = ((event.pageX - parent_el.offsetLeft - parent_el.offsetParent.offsetLeft) + 'px');
        parent_el.style.height = (($(window).height() - event.pageY) - offsetBottom) + 'px';

    }

    if (tar_id == 'c_4') {

        $(parent_el).css('bottom', $(parent_el).css('bottom'));
        $(parent_el).css('left', $(parent_el).css('left'));
        $(parent_el).css('top', $(parent_el).css('top'));
        $(parent_el).css('right', '');

        parent_el.style.width = (event.pageX - parent_el.offsetLeft - parent_el.offsetParent.offsetLeft) + 'px';

    }

    if (tar_id == 'c_5') {

        $(parent_el).css('top', $(parent_el).css('top'));
        $(parent_el).css('left', $(parent_el).css('left'));
        $(parent_el).css('bottom', '');
        $(parent_el).css('right', '');

        parent_el.style.width = (event.pageX - parent_el.offsetLeft - parent_el.offsetParent.offsetLeft) + 'px';
        parent_el.style.height = (event.pageY - parent_el.offsetTop - parent_el.offsetParent.offsetTop) + 'px';
    }

    if (tar_id == 'c_6') {

        $(parent_el).css('left', $(parent_el).css('left'));
        $(parent_el).css('top', $(parent_el).css('top'));
        $(parent_el).css('right', $(parent_el).css('right'));
        $(parent_el).css('bottom', '');

        parent_el.style.height = (event.pageY - parent_el.offsetTop - parent_el.offsetParent.offsetTop) + 'px';
    }

    if (tar_id == 'c_7') {

        offsetRight = $(window).width() - ($(parent_el).offset().left + $(parent_el).outerWidth());

        $(parent_el).css('top', $(parent_el).css('top'));
        $(parent_el).css('right', $(parent_el).css('right'));
        $(parent_el).css('bottom', '');
        $(parent_el).css('left', '');

        parent_el.style.width = (($(window).width() - event.pageX) - offsetRight) + 'px';
        parent_el.style.height = (event.pageY - parent_el.offsetTop - parent_el.offsetParent.offsetTop) + 'px';
    }

    if (tar_id == 'c_8') {

        offsetRight = $(window).width() - ($(parent_el).offset().left + $(parent_el).outerWidth());

        $(parent_el).css('bottom', $(parent_el).css('bottom'));
        $(parent_el).css('top', $(parent_el).css('top'));
        $(parent_el).css('right', $(parent_el).css('right'));
        $(parent_el).css('left', '');

        parent_el.style.width = (($(window).width() - event.pageX) - offsetRight) + 'px';
    }
    /*if(parent_el.id.includes('parent_'+media_type+'_holder')){
        var child_el=document.getElementById(media_type+'_holder_'+parent_el.id.substring(parent_el.id.length-1));
        child_el.style.width=parent_el.style.width;
        child_el.style.height=parent_el.style.height;
    }*/

}

function stopResize(e, parent_el) {
    e.stopPropagation();
    window.removeEventListener('mousemove', s_resize);
    window.removeEventListener('mouseup', st_resize);

}


function initialiseResize(tar_el, parent_el) {
    parent_el.draggable = false;
    parent_el.contenteditable = false;
    parent_el.offsetParent.draggable = false;
    var tar_id = tar_el.id;
    window.addEventListener('mousemove', s_resize = function (event) { startResize(event, tar_id, parent_el) });
    window.addEventListener('mouseup', st_resize = function (event) { stopResize(event, parent_el) });
}




function createResizer(el) {

    if($(el).has('.c_resize').length==0){
    for (var i = 0; i < 8; i++) {
        var r_el = document.createElement('div');

        if (i == 0)
            r_el.style.cursor = 'nw-resize';
        if (i == 1)
            r_el.style.cursor = 'n-resize';
        if (i == 2)
            r_el.style.cursor = 'ne-resize';
        if (i == 3)
            r_el.style.cursor = 'e-resize';
        if (i == 4)
            r_el.style.cursor = 'se-resize';
        if (i == 5)
            r_el.style.cursor = 's-resize';
        if (i == 6)
            r_el.style.cursor = 'sw-resize';
        if (i == 7)
            r_el.style.cursor = 'w-resize';

        $(r_el).attr({
            id: 'c_' + (i + 1),
            class: 'c_resize',
        });
        $(r_el).css({
            position: 'absolute',
            width: 10 + 'px',
            height: 10 + 'px',
            backgroundColor: 'black',
            zIndex: 22,
        });
        $(r_el).addClass('resizer_off');

        r_el.addEventListener('mousedown', function (event) {
            event.stopPropagation();
            initialiseResize(this, el);
        })
        resizer_array[i] = r_el;
    }
    displayResizer(el);
}
}

function displayResizer(el) {
    if (!(resizer_status[0])) {
        var add_left = -5;
        var add_top = -5;

        if(el.id.includes('video_holder')){
            $(el).removeAttr('controls');
            console.log('controls removed')
        }
        var height=$(el).height();
        var width=$(el).width();

        for (var i = 0; i < 8; i++) {
            el.appendChild(resizer_array[i]);

            if (i < 3 && i >= 1) {
                add_left = add_left + (width/2);
            }
            else if (i >= 3 && i < 5) {
                add_top = add_top + (height/ 2);
            }
            else if (i >= 5 && i < 7) {
                add_left = add_left - (width/2);
            }
            else if (i == 7) {
                add_top = add_top - (height/2);
            }
            resizer_array[i].style.top = add_top + 'px';
            resizer_array[i].style.left = add_left + 'px';
            $(resizer_array[i]).removeClass('resizer_off');
            $(resizer_array[i]).addClass('resizer_on');
            if(el.id.includes('video_holder') && (i+1)%2==0){
                $(resizer_array[i]).removeClass('resizer_on');
                $(resizer_array[i]).addClass('resizer_off');
            }
        }
    }
    resizer_status[0] = true;
    resizer_status[1] = el.id;
    el.contentEditable=false;
    el.draggable=false;
}


function removeResizer() {

    var el_resizer = document.getElementById(resizer_status[1]);
    if(el_resizer.id.includes('video_holder')){
        $(el_resizer).attr('controls','');
    }
    for (var i = 0; i < 8; i++) {
        $(resizer_array[i]).removeClass('resizer_on');
        $(resizer_array[i]).addClass('resizer_off');
        el_resizer.removeChild(resizer_array[i]);
    }
    resizer_status[0] = false;
    el_resizer.draggable=true;
    if(el_resizer.id.includes('text_holder'))
        el_resizer.contentEditable=true;
    
}


function content_manager(current_page, new_id) {

    var page_content = document.getElementById(current_page).children;
    var new_el = document.getElementById(new_id);
    var page_el = document.getElementById(current_page);

    for (var i = 0; i < page_content.length; i++) {

    }

}


function page_manager(current_page_id, new_page) {

    if(page_array.length==0){
        page_no=0;
        active_page_id='';
        current_page_id='';
    }
    var temp_page2;
    var current_page;

    if (current_page_id != null)
        current_page = document.getElementById(current_page_id);

    if (new_page != null) {


        if (page_no == 0 || current_page.page_no == last_page) {

            $(new_page).css('top',page_array.length*($(new_page).height()+100)+'px');

            if (page_no != 0)
                page_no = current_page.page_no;

            new_page.page_no = page_no + 1;
            page_array[page_no] = new_page;

            if(page_no==0)
            document.getElementById('main').appendChild(new_page);
            else
            $(page_array[page_no-1]).after(new_page);

            active_page_id = new_page.id;
            page_no = page_no + 1;
            last_page = page_no;
        }

        else {
            page_no = current_page.page_no;
            $(new_page).css('top',(page_no)*($(new_page).height()+100)+'px');
            var temp_page1 = page_array[page_no];
            page_array[page_no] = new_page;
            $(temp_page1).before(new_page);
            new_page.page_no = temp_page1.page_no;
            for (var i = page_no + 1; i < page_array.length; i++) {
                temp_page2 = page_array[i];
                page_array[i] = temp_page1;
                page_array[i].page_no = temp_page2.page_no;
                $(page_array[i]).css('top',(page_array[i].page_no)*($(page_array[i]).height()+100)+'px');
                temp_page1 = temp_page2;
            }
            page_array.push(temp_page1);
            temp_page1.page_no = page_array.length;
            $(temp_page1).css('top',(temp_page1.page_no-1)*($(temp_page1).height()+100)+'px');
           
            last_page = page_array.length
            active_page_id = new_page.id;
        }
    }

    else {
        var i = 0;
        var temp;
        while (i < page_array.length) {
            if (page_array[i] == current_page) {
                page_array.splice(i,1);
                break;
            }
            i++;
        }
        for (var j = i; j < page_array.length; j++) {
            page_array[j].page_no = page_array[j].page_no - 1;
            $(page_array[j]).css('top',(j)*($(page_array[j]).height()+100)+'px');
        }
        last_page = page_array.length;
    }

}

function uploadMedia(){
    count_media=count_media+1;
    var el = document.createElement('div');
    $(el).attr({
        id: 'temp_media_holder'+count_media,
        draggable: true,
        contenteditable: true,
    });
    $(el).css({
        position: 'absolute',
        width: 300 + 'px',
        height: 300 + 'px',
        borderStyle: 'dashed',
        borderWidth: 1 + 'px',
        zIndex:20
    });
    el.addEventListener('dragstart', function (e) {
        drag(e);
    })
    var form =document.createElement('form');
    $(form).attr({
        id:'uploadMedia',
        enctype:'multipart/form-data',
        action:'/upload/'+media_type,
        method:'post',
    });
    var input1 = document.createElement('input');
    $(input1).attr({
        id: 'select_media',
        type: 'file',
        margin: 'auto',
        name:media_type
    })
    var input2 = document.createElement('input');
    $(input2).attr({
        id:'submit_media',
        type: 'submit',
        margin: 'auto',
    });
    var span =document.createElement('span');
    $(span).attr('id','status');
    $(form).submit(function(e){
        e.preventDefault();
        $("#status").empty().text("File is uploading...");  
        var formData=new FormData(this);  
        $.ajax({
            type:'POST',
            url:'/upload/'+media_type,
            data:formData,
            processData:false,
            contentType:false,
            success:function(r){
                console.log('result :'+r);
            },
            error:function(e){
                console.log('some error: '+e)
            }
        });
        $("#status").empty().text("File Uploaded Successfully...");
    });
    form.appendChild(input1);
    form.appendChild(input2);

    el.addEventListener('dblclick', function (e) {
        e.stopPropagation();
        createResizer(this);
    })
    el.appendChild(form);
    el.appendChild(span);
    
    if(holder_adj=='')
    document.getElementById(active_page_id).appendChild(el);
    else
    document.getElementById(active_slideshow).appendChild(el);

    delete_item=4;
    active_media_id='temp_media_holder'+count_media;
}


function getMedia(){
    var file = document.getElementById('select_media').files[0].name;
    var media_div=document.createElement('div');
    var media = document.createElement(media_type);
    var media_id;
    var media_folder;
    var source;
    
    if(media_type=='img'){
        media_id=img_id;
        media_folder='/images/';
        delete_item=2;
        active_img_id=holder_adj+media_type+'_holder_' + media_id;
    }

    if(media_type=='video'){
        media_id=video_id;
        media_folder='/videos/';
        source=document.createElement('source');
        $(source).attr({
            src:media_folder+file,
            type:'video/mp4',
        })
        delete_item=3;
        active_video_id=holder_adj+media_type+'_holder_' + media_id;
    }
    
    $(media).attr({
        id: holder_adj+media_type+'_holder_' + media_id,
        draggable: false,
    });

    var top=$(document.getElementById('temp_media_holder'+count_media)).css('top');
    var left=$(document.getElementById('temp_media_holder'+count_media)).css('left');

    $(media).css({
        position:'absolute',
        width:100+'%',
        height:100+'%',
        top:0,
        left:0,
    });


    $(media_div).attr({
        id:holder_adj+'parent_'+media_type+'_holder_'+media_id,
        draggable:true,
    });
    $(media_div).css({
        position:'absolute',
        width:document.getElementById('temp_media_holder'+count_media).style.width,
        height:document.getElementById('temp_media_holder'+count_media).style.height,
        top:top,
        left:left,
        zIndex:20
    })


    if(media_type=='video'){
        $(media).attr('controls','');
        $(media).attr('autoplay','');
        $(media).css('height','');
        media.appendChild(source);
    }
    else
    media.src = media_folder+file;

    media_div.appendChild(media);

    if(holder_adj==''){
        media_div.addEventListener('dragstart', function (e) {
            drag(e);
       })
       media_div.addEventListener('dblclick', function (e) {
           e.stopPropagation();
           createResizer(this);
       })
        document.getElementById(active_page_id).appendChild(media_div);
        document.getElementById(active_page_id).removeChild(document.getElementById('temp_media_holder'+count_media));
    }
    else{
        media_div.draggable=false;
        media_div.style.width=100+'%';
        media_div.style.height=100+'%';
        //media_div.style.display='none';
        $(media_div).attr('class','slides'+slideshow_id);
        $(media_div).attr('class','active_slide');
        document.getElementById(active_slideshow).appendChild(media_div);
        document.getElementById(active_slideshow).removeChild(document.getElementById('temp_media_holder'+count_media));
        updateSlideShow(0);
    }

    
}

function createSlideMenu(slide_id){
    var slide_menu=document.createElement('div');

    $(slide_menu).attr('class','slide'+slide_id+' active_slide');
    $(slide_menu).css({
        position:'absolute',
        width:100+'%',
        height:100+'%',
        borderStyle:'solid',
        zIndex:20,
    });

    var img_button=document.createElement('button');
    img_button.innerHTML='Image';
    $(img_button).attr({
        id:'img_button',
    });
    $(img_button).css({
        position:'absolute',
        width:100+'px',
        height:50+'px',
        left:50+'px',
        top:125+'px',

    });
    var video_button=document.createElement('button');
    video_button.innerHTML='Video';
    $(video_button).attr({
        id:'video_button',
    });
    $(video_button).css({
        position:'absolute',
        width:100+'px',
        height:50+'px',
        left:150+'px',
        top:125+'px',

    });
    slide_menu.appendChild(img_button);
    slide_menu.appendChild(video_button);
    return slide_menu;
}


function updateSlideShow(dir){

    var slide_holder=document.getElementById(active_slideshow);
    var slide_array=[];
    var index=-1;

    for(var i=2;i<slide_holder.children.length;i++){
        slide_array[i-2]=slide_holder.children[i];
        if($(slide_holder.children[i]).hasClass('active_slide')){
            index=i;
        }
    }

    var slide_id=parseInt(slide_holder.id.substring(slide_holder.id.length-1));
    if(dir!=0 && index-2>=0 && !(dir==-1 && index-2==0)){
        
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

    if(dir==1 && index-2==slide_array.length-1){

        $(slide_array[index-2]).removeClass('active_slide');
        $(slide_array[index-2]).addClass('inactive_slide');
        var slide_menu=createSlideMenu(slide_id);
        slide_holder.appendChild(slide_menu);
    }
        
    

}

function SlideShowManager(){

    
    holder_adj='slide_'
    slideshow_id=slideshow_id+1;
    slide_no=slide_no+1;
    var slide_holder=document.createElement('div');
    $(slide_holder).attr({
        id:'slide_holder'+slideshow_id,
        draggable:true,
    });

    $(slide_holder).css({
        position:'absolute',
        width:300+'px',
        height:300+'px',
        borderStyle:'solid',
        zIndex:20,
    });

    slide_holder.addEventListener('dragstart',function(e){
        drag(e);
    });
    slide_holder.addEventListener('dblclick', function (e) {
        e.stopPropagation();
        createResizer(this);
    });

    var slide_menu=createSlideMenu(slideshow_id);

    var left=document.createElement('a');
    left.id='left';
    $(left).css({
        position:'absolute',
        top:$(slide_holder).height()/2-5+'px',
        left:0,
        zIndex:50,
        cursor:'pointer'
    });
    left.innerHTML='&#10094;';
    $(left).click(function(e){
        e.stopPropagation();
        updateSlideShow(-1);
    });

    var right=document.createElement('a');
    right.id='right';
    $(right).css({
        position:'absolute',
        top:$(slide_holder).height()/2-5+'px',
        right:0,
        zIndex:50,
        cursor:'pointer'
    });
    right.innerHTML='&#10095;';
    $(right).click(function(e){
        e.stopPropagation();
        updateSlideShow(1);
    });


    slide_holder.appendChild(left);
    slide_holder.appendChild(right);
    slide_holder.appendChild(slide_menu);
    document.getElementById(active_page_id).appendChild(slide_holder);

    active_slideshow=slide_holder.id;

    $(slide_holder).click(function(e){
        if(e.target.id=='img_button'){
            img_id=img_id+1;
            media_type='img';
            uploadMedia();
            $('.slide'+parseInt(slide_holder.id.substring(slide_holder.id.length-1))).remove();
        }
        if(e.target.id=='video_button'){
            video_id=video_id+1;
            media_type='video';
            uploadMedia();
            $('.slide'+parseInt(slide_holder.id.substring(slide_holder.id.length-1))).remove();
        }
        
        if(resizer_status[0])
        removeResizer();
    });
    delete_item=5;
    
}

$(document).ajaxComplete(function(){
    getMedia();
});


$('#main').on('click', function (event) {

    if (resizer_status[0]) {
        removeResizer();
    }

    if (event.target.id.includes('page_holder')) {
        delete_item = 0;
        active_page_id = event.target.id;
    }
    if (event.target.id.includes('text_holder')) {
        delete_item = 1;
        active_text_id = event.target.id;
    }
    if (event.target.id.includes('img_holder')) {
        delete_item = 2;
        active_img_id = event.target.id;
    }
    if (event.target.id.includes('video_holder')) {
        delete_item = 3;
        active_video_id = event.target.id;
    }
    if (event.target.id.includes('temp_media_holder')) {
        delete_item = 4;
        active_media_id = event.target.id;
    }
    if (event.target.id.includes('slide')) {
        delete_item = 5;
        active_slideshow = event.target.id;
    }

    if ($('.menuListSize,.menuSize,.size-button').hasClass('visible')) {
        $('.menuListSize,.menuSize,.size-button').removeClass('visible');
        $('.menuListSize,.menuSize,.size-button').addClass('invisible');
    }
    if ($('.menuListStyle,.menuStyle,.style-button').hasClass('visible')) {
        $('.menuListStyle,.menuStyle,.style-button').removeClass('visible');
        $('.menuListStyle,.menuStyle,.style-button').addClass('invisible');
    }
})


$('#Fsize').on('click', function (event) {
    event.stopPropagation();
    $(this).keydown(function (event) {
        if (event.which == 13) {
            $("#toolbar").trigger('click');
        }
    })
})




$("#toolbar").on('click', function (event) {
    if (event.originalEvent != undefined)
        var _id = event.target.id;
    else
        var _id = "Fsize";

    $("toolbar").off('keydown', '#Fsize');
    var select = getSelection();

    if (_id == "b_button") {
        document.execCommand('bold');
    }
    if (_id == "i_button") {
        document.execCommand("italic");
    }
    if (_id == "u_button") {
        document.execCommand("underline");
    }
    if (_id == "Fsize_button" || _id == "Fsize") {
        $('.menuListSize,.menuSize,.size-button').removeClass('invisible');
        $('.menuListSize,.menuSize,.size-button').addClass('visible');
        $('.size-button').click(function (ev) {
            ev.stopPropagation();
            $('.size-button').removeClass("activesize");
            $(this).addClass("activesize");

            if ($('.menuListSize,.menuSize,.size-button').hasClass('visible')) {
                $('.menuListSize,.menuSize,.size-button').removeClass('visible');
                $('.menuListSize,.menuSize,.size-button').addClass('invisible');
            }
            size = $('button.activesize').text();
            changeFontSize(select, size);
            document.getElementById('Fsize').value = size;
        });

        if (_id == "Fsize") {
            var size = document.getElementById(_id).value;
            changeFontSize(select, size);
        }


    }
    if (_id == "Fstyle_button" || _id == "Fstyle") {
        $('.menuListStyle,.menuStyle,.style-button').removeClass('invisible');
        $('.menuListStyle,.menuStyle,.style-button').addClass('visible');
        $('.style-button').click(function (ev) {
            ev.stopPropagation();
            $('.style-button').removeClass("activestyle");
            $(this).addClass("activestyle");
            if ($('.menuListStyle,.menuStyle,.style-button').hasClass('visible')) {
                $('.menuListStyle,.menuStyle,.style-button').removeClass('visible');
                $('.menuListStyle,.menuStyle,.style-button').addClass('invisible');
            }
            var fontname = $('button.activestyle').text();
            document.execCommand('fontname', false, fontname);
            document.getElementById('Fstyle').value = fontname
        });
    }

    if (_id == 'l_align') {
        document.execCommand('justifyLeft', false, select.toString());
    }
    if (_id == 'c_align') {
        document.execCommand('justifyCenter', false, select.toString());
    }
    if (_id == 'r_align') {
        document.execCommand('justifyRight', false, select.toString());
    }
});



$('#widgetbar').on('click', function (event) {
    var _id = event.target.id;

    if (_id == 'new_page') {
        count_page = count_page + 1;
        page_id = page_id + 1;
        delete_item = 0;

        if (count_page > 1) {
            $('html').css('height', ($('html').css('height')) * count_page + 'px');
            $('body').css('height', ($('body').css('height')) * count_page + 'px');
            $('#main').css('height', ($('#main').css('height')) * count_page + 'px');
        }

        var el = document.createElement('div');
        $(el).attr({
            id: 'page_holder' + page_id,
            draggable:false,
            contenteditable: false,
        });
        $(el).css({
            position: 'absolute',
            backgroundColor: 'white',
            width: 800 + 'px',
            height: 1000 + 'px',
            borderStyle: 'solid',
            borderWidth: 1 + 'px',
            marginTop: 100 + 'px',
            left:500+'px'

        });
        el.addEventListener('dragover',function(e){
            allowdrag(e);
        })
        el.addEventListener('drop',function(e){
            onDrop(e);
        })
        page_manager(active_page_id, el);
    }

    if (_id == 'new_button') {
        text_id = text_id + 1;
        delete_item = 1;
        var el = document.createElement('div');
        $(el).attr({
            id: 'text_holder' + text_id,
            draggable: true,
            contenteditable: true,
        });
        $(el).css({
            position: 'absolute',
            width: 100 + 'px',
            height:100+'px',
            borderStyle: 'dashed',
            borderWidth: 1 + 'px',
            zIndex: 20,

        });
        el.addEventListener('dragstart', function (e) {
            drag(e);
        })
        el.addEventListener('dblclick', function (e) {
            e.stopPropagation();
            createResizer(this);
        })
        el.addEventListener('click', function (e) {
            if (resizer_status[0])
                removeResizer();
        })
        el.addEventListener('keydown', function (e) {
            el.style.top=$(el).css('top');
            $(el).css('bottom','');
            el.style.minHeight=$(el).height()+'px';
            el.style.height='auto';
        });
        el.addEventListener('keyup', function (e) {
            el.style.height=$(el).height()+'px';
            $(el).css('min-height','');
        });
        active_text_id = el.id;
        document.getElementById(active_page_id).appendChild(el);

    }
    if (_id == 'image_button') {
        holder_adj='';
        img_id = img_id + 1;
        media_type='img';
        uploadMedia();
    }
    if (_id == 'video_button') {
        holder_adj='';
        video_id = video_id + 1;
        media_type='video'
        uploadMedia();

    }
    if(_id=='slide_button'){
        SlideShowManager();
    }
    if (_id == 'delete_button') {
        if (delete_item == 0) {
            page_manager(active_page_id, null);
            $('#' + active_page_id).remove();
            count_page = count_page - 1;
        }
        else if (delete_item == 1) {
            $('#' + active_text_id).remove();
            resizer_status[0] = false;
        }
        else if (delete_item == 2) {
            $('#parent_'+active_img_id).remove();
        }
        else if (delete_item == 3) {
            $('#parent_'+active_video_id).remove();
        }
        else if (delete_item == 4) {
            $('#'+active_media_id).remove();
        }
        else if (delete_item == 5) {
            $('#'+active_slideshow).remove();
        }
    }
});
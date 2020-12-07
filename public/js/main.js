const userID = $('#senderId').val();
const csrf = $('#token').val();

function jQFormSerializeArrToJson(formSerializeArr) {
    var jsonObj = {};
    jQuery.map(formSerializeArr, function (n, i) {
        jsonObj[n.name] = n.value;
    });

    return jsonObj;
}

$(function () {
    $('[data-toggle="popover"]').popover()
})
$('.popover-dismiss').popover({
    trigger: 'focus'
});

// $("#chatBox").hide();

$(document).ready(function () {

    // SideNav Initialization
    $(".button-collapse").sideNav();
    new WOW().init();
});


//Filter list

$(document).ready(function () {
    $("#listSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myList li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});






// chatting 
const $myForm = $('#myForm1');
$('#chat').on('click', function () {

    if ($myForm.hasClass('slim') || !$myForm.is(':visible')) {

        $myForm.css('display', 'block');
        $myForm.removeClass('slim');
    };
})

$('#closeButton').not('#toggleChat').on('click', function () {

    $myForm.hide();
})

$("#toggleChat").on('click', function () {
    $myForm.toggleClass('slim');
});

// send messages
$("#exampleForm2").on("keypress", function (e) {
    const $eTargetVal = $(e.target).val();

    if (e.keyCode === 13 && $eTargetVal.length > 0) {
        sendMsg($eTargetVal, this);

    }
});

function sendMsg($eTargetVal, e) {
    const text =
        `<div align="right" class="last"> 
             <div class="card bg-primary rounded z-depth-0 mb-1 message-text text-left">
                 <div class="card-body p-2">
                     <span class="card-text text-white">${$eTargetVal}</span>
                     <span class="waiting" style="font-size: 10px;" ><i class="far fa-clock"></i></span>
                 </div>
             </div>
         </div>`;

    //send msg to server
    let rid = $(e.parentNode.parentNode).attr('value');
    $(text).insertAfter(".last:last");
    $(e).val("");
    setScroll();
    $.ajax({
        type: "POST",
        url: "/Sendmassage",
        data: {
            senderId: userID,
            reciverId: rid,
            massage: $eTargetVal,
            _csrf: csrf
        },
        success: function (result) {
            let d = new Date(result);
            $('.waiting').html(d.getHours() + ":" + d.getMinutes());
            $('.waiting').removeClass("waiting");
        },
        error: function (result) {

            $('.waiting').html('<i class="fas fa-exclamation-circle red-text"></i>').removeClass('waiting');

            toastr.error('Failed! Some error occurred while sending your massage');

        }
    });

    //demo
    //receiveMsg($eTargetVal);
}

function receiveMsg(text) {
    // recieve messages
    let textWithoutAvater =
        `<div class="last">
        <div class="d-flex">
            <div class="profile-photo message-photo"></div>
            <div class="card bg-light rounded z-depth-0 mb-1 message-text">
                <div class="card-body p-2">
                    <p class="card-text black-text">${text}</p>
                </div>
            </div>
        </div>
    </div>`;

    let textWithAvater =
        `<div class="last">
            <div class="d-flex">
                <div class="profile-photo message-photo">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-6.jpg" alt="avatar" class="avatar rounded-circle mr-2 ml-0"/>
                    <span class="state"></span>
                </div>
                <div class="card bg-light rounded z-depth-0 mb-1 message-text">
                    <div class="card-body p-2">
                        <p class="card-text black-text">${text}</p>
                    </div>
                </div>
            </div>
        </div>`;
    let e = $('.last:last');
    if (e[0].align == 'right' || e[0].align == undefined) {
        $(textWithAvater).insertAfter(e);
    } else {
        $(textWithoutAvater).insertAfter(e);
    }
    setScroll();
}

function setScroll(letter) {
    var div = $("#message");
    div.scrollTop(div.prop('scrollHeight'));
}

$(function () {
    setScroll();
});


// Reactions menu
$('.reaction').on('click', function (e) {
    let text = e.currentTarget.innerText;
    msgArea = document.getElementById("exampleForm2");
    msgArea.value += text;
    msgArea.focus();
    e.stopPropagation();
});



function friendReq() {
    let e = document.getElementById('friend-req');
    if (e.hidden)
        e.hidden = "";
    else
        e.hidden = "true";
}

$('.fr-accept').click(function (e) {
    let uid = e.currentTarget.parentElement.parentElement.id;
    e = e.currentTarget;
    // Send request to server for friend accept

    $.ajax({
        type: "POST",
        url: "/acceptReq?userId=" + userID,
        data: {
            reqsenderId: $(e).val(),
            accepterId: uid,
            _csrf: csrf
        },
        success: function (result) {
            //alert('ok');
            e.parentElement.parentElement.remove();
            toastr.success('You are now friend');
        },
        error: function (result) {
            //alert('error');
            toastr.error('Failed to accept');

        }
    });






});
// friend request denied
$('.fr-cancel').click(function (e) {
    let uid = e.currentTarget.parentElement.parentElement.id;
    let userId_1 = document.getElementById("senderId").value;
    e = e.currentTarget;

    // Send request to server for friend denied

    //e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/cancleReq?userId=" + userId_1,
        data: {
            reqsenderId: $(e).val(),
            accepterId: uid,
            _csrf: csrf
        },
        success: function (result) {
            //alert('ok');
            e.parentElement.parentElement.remove();
            toastr.error('Cancelled.');
        },
        error: function (result) {
            //alert('error');
            toastr.error('Failed');

        }
    });







});

// suggested people send request

$('.send-req').click(function (e) {
    e.preventDefault();
    e = e.currentTarget;
    let data = jQFormSerializeArrToJson($(e.parentNode).serializeArray());
    let targetUrl = $(e.parentNode).attr('action')
    e.disabled = "true";
    e.innerText = "Sending Request...";
    // Send  request to server for friend req

    $.ajax({
        type: "POST",
        url: targetUrl,
        data: data,
        success: function (result) {
            //alert('ok');
            toastr.success('Friend Request Send');
            e.innerText = "Requested";
        },
        error: function (result) {
            //alert('error');
            toastr.error('Failed to Send');
            e.disabled = "";
            e.innerText = "Send Request";
        }
    });

});

$('.openProfile').click(function (e) {
    $('#news-feed').css('display', 'none');
    $('#profile-section').css('display', '');
    //    document.getElementById("profile-section").hidden = "";
});

$('.rem-friend').click(function (e) {
    e.preventDefault();
    e = e.currentTarget;
    let data = jQFormSerializeArrToJson($(e.parentNode).serializeArray());
    let targetUrl = $(e.parentNode).attr('action') + "?userId=" + userID;

    e.disabled = "true";
    e.innerText = "Removing";
    // send request to server
    //unfrnd
    $.ajax({
        type: "POST",
        url: targetUrl,
        data: data,
        success: function (result) {
            //alert('ok');
            e.innerText = "Removed";
            toastr.error('You are no longer friend!');
        },
        error: function (result) {
            //alert('error');
            toastr.error('Failed to Remove');
        }
    });
});

//new 
$(window).on("load", function () {
    // insert your code here
    if (window.innerWidth <= 1440 && window.innerWidth > 1080)
        $("#toggle").trigger("click");
});


// edit profile 


$("#edit_profile_alert").hide();

function showAlert(type, result) {
    if (type == 'error') {
        $('#edit_profile_alert').removeClass('alert-info').addClass('alert-danger');
    }
    $('#edit_profile_alert').html(result);
    $("#edit_profile_alert").show(300);
    $("#edit_profile_alert").delay(4000).hide(300);
}


$("#profession, #Campany-City, #College-HighSchool, #Current-City, #HomeTown, #Mobile-Number, #Date-of-Birth, #Gender, #RelationShiplevel").on("blur", function (e) {
    let jsonObjData = jQFormSerializeArrToJson($(e.currentTarget.parentNode.parentNode.parentNode).serializeArray());
    let targetUrl = $(e.currentTarget.parentNode.parentNode.parentNode).attr("action");
    let userId_1 = document.getElementById("senderId").value;

    $.ajax({
        type: "POST",
        url: targetUrl + "?userId=" + userId_1,
        data: jsonObjData,
        success: function (result) {
            //success
            showAlert("", result);
        },
        error: function (result) {
            //error
            showAlert("error", result);
        }
    });

});

$('.edit_tab').hide();
$('.btn_profile_edit').on('click', function (e) {
    node = e.currentTarget.parentNode.parentNode;
    $(node).find('.view_tab').hide();
    $(node).find('.edit_tab').show();
    $(e.currentTarget).hide();
});

$('#home').click(function (e) {
    $('#profile-section').css('display', 'none');
    // document.getElementById("news-feed").hidden = "";
    $('#news-feed').css('display', '');
});


// like btn 
$('.btn-like').on("click", function (e) {
    e.preventDefault();
    e = e.currentTarget;
    let jsonData = jQFormSerializeArrToJson($(e.parentNode).serializeArray());
    let targetUrl = $(e.parentNode).attr('action');
    $.ajax({
        type: "POST",
        url: targetUrl,
        data: jsonData,
        success: function (result) {
            //success

            $(e).html('<i class="fas fa-thumbs-up  mr-1"></i><span>' + result.Likes + '</span>');
        },
        error: function (result) {
            //error
            // console.log(result);
        }
    });
});
$('.btn-liked').html('<i class="fas fa-thumbs-up  mr-1"></i>Liked');

// comment update 

function setComments(e, target) {
    d = new Date(e[2]);
    d = d.toLocaleString();
    let commentText = `
                    <li class="media mb-2 p-2">    
                        <img class="d-flex rounded-circle avatar z-depth-1-half mr-3 comment-avatar" src="/images/profile.png"
                        alt="Avatar">
                    <div class="media-body">
                    <h5 class="mt-0 mb-0 font-weight-bold h6 blue-text">${e[1]}</h5>
                    <div class="text-muted small">at ${d}</div>
                    ${e[0]}
                    </div>                                     
                </li>`;
    $(target).append(commentText);

}

$('.btn-comment').on('click', function (e) {
    e.preventDefault();
    e = e.currentTarget;
    dataTarget = $(e).attr('data-target') + " > .user-comment";
    $('.comment-input').attr('value','');
    let jsonData = jQFormSerializeArrToJson($(e.parentNode).serializeArray());
    let targetUrl = $(e.parentNode).attr('action');
    if($(e).hasClass('submit')){
        let tar = $(e.parentNode).find('.comment-input');
        if($(tar).val().trim() == ''){
            $(tar).val('');
            return
        }
        $(tar).val('');
    }
    $(dataTarget).html(`<li class="text-center p-4">
    <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></li>`);
    $.ajax({
        type: "POST",
        url: targetUrl,
        data: jsonData,
        success: function (result) {
            //success
            if (result.length == 0) {
                $(dataTarget).html('<div class="no-comments text-center h6 bold p-4">No Comments Yet</div>');
            } else {
                $('.no-comments').hide();
                $(dataTarget).html('');
                result.forEach(element => {
                    setComments(element, dataTarget);
                });
            }

        },
        error: function (result) {
            //error
            $(dataTarget).html("Opps! Could not fetch comments!")
        }
    });
});

// Image Validation
$('.myAvatar').each(function () {
    testimage($(this).attr('src'), this);
});

function testimage(URL, e) {
    let tester = new Image();
    tester.onerror = function () {
        $(e).attr('src', '/images/profile.png');
    };
    tester.src = URL;
}

// search Event Handing 
$('#searchEvent').on('keyup', function (){
    let q = $(this).val();
    let id = 1000;
    if (q.length > 2) {
        $('#searchResultDropdown').show();
        // send req to server 
        $.ajax({
            type: "POST",
            url: '/searchbyNameorEmail?userId=' + userID,
            data: {
                search: q,
                _csrf: csrf
            },
            success: function (result) {
                //success
                $('#searchLoadingState').hide();
                $('#searchResults').html('');
                
                result.forEach(res =>{

                    let text = 
                        `<li class="d-flex mb-2">
                        <img src="/${res.imageUrl}" alt="avatar" id=${id} 
                            class="myAvatar comment-avatar rounded-circle align-self-center mr-3 z-depth-1">
                        <div>
                            <a href="/openfrndProfile/${res._id}?userId=${userID}" class="blue-text h6 p-0">${res.name}
                            <p class="text-muted mb-0 small ">
                                ${res.AboutProfession}</p>
                            </a>
                        </div>
                    </li>`
                    $('#searchResults').append(text);
                    testimage(res.imageUrl, $('#'+id));
                    id++;
                });
            },
            error: function (result) {
                //error
                $('#searchLoadingState').hide();
                $('#searchResults').html('<p class="text-center h6"> No result found!</p>');

            }
        });
    } else {
        $('#searchResultDropdown').hide();
    }
});

$('#settingGeneral').on('click', function () {
    $('#profile-setting-namechange').attr("hidden", false);
    $('#profile-setting-passchange').attr("hidden", true);
    $('#profile-setting-delaccchange').attr("hidden", true);

});

$('#settingChangePassword').on('click', function () {
    $('#profile-setting-namechange').attr("hidden", true);
    $('#profile-setting-passchange').attr("hidden", false);
    $('#profile-setting-delaccchange').attr("hidden", true);
});

$('#settingDeleteAccount').on('click', function () {
    $('#profile-setting-namechange').attr("hidden", true);
    $('#profile-setting-passchange').attr("hidden", true);
    $('#profile-setting-delaccchange').attr("hidden", false);
});

$('.setting-form-submit').on('click', function (e) {
    e.preventDefault();
    e = e.currentTarget;
    let targetUrl = $(e.parentNode).attr('action');
    let data = jQFormSerializeArrToJson($(e.parentNode).serializeArray());
    e.disabled = "true";
    $.ajax({
        type: "POST",
        url: targetUrl,
        data: data,
        success: function (result) {
            //success
            // console.log(result);

        },
        error: function (result) {
            //error
            // console.log(result);

        }
    });

});
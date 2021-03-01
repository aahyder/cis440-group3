// post-scripts.js
async function openModal(type, id) {
    document.getElementById("replyModal").style.display = "block";
    document.getElementById("staticReplyType").value = type;
    document.getElementById("staticReplyId").value = id;
    if(type === 'comment') {
        document.getElementById("replyTitle").innerHTML = "Post Comment";
        document.getElementById("replyLabel").innerHTML = "Comment Content";
    } else {
        document.getElementById("replyTitle").innerHTML = "Comment Reply";
        document.getElementById("replyLabel").innerHTML = "Reply Content";
    }
} 
  
function closeModal() {
    document.getElementById("replyModal").style.display = "none";
    document.getElementById("staticReplyBody").value = "";
}

var submitComment = function(form) {
    var type = document.getElementById("staticReplyType").value;
    var id = document.getElementById("staticReplyId").value;
    var content = document.getElementById("staticReplyBody").value;
    var post = document.getElementById("postId").value;
    console.log(type);
    console.log(id);
    if(type === 'comment') {
        console.log(id);
        form.action = "/comment?id="+id+"&content="+content+"&post="+post;
        window.alert("/comment?id="+id+"&content="+content+"&post="+post);
    } else {
        console.log(id);
        form.action = "/reply?id="+id+"&content="+content+"&post="+post;
        window.alert("/reply?id="+id+"&content="+content+"&post="+post);
    }
    form.submit();
}
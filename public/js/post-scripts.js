// post-scripts.js
const APIURL = "http://localhost:3000";

const getMyReactions = async function(id, callback) {
    const response = await fetch(`${APIURL}/my-reactions?id=`+id, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
        "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((reactions) => {
        console.log("API call: "+reactions);
        callback(reactions);
    });
};

const react = async function(id, type, callback) {
    const response = await fetch(`${APIURL}/react?id=`+id+"&type="+type, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
        "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((reaction) => {
        console.log("API call: "+reaction);
        callback(reaction);
    });
};

function openModal(type, id) {
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

var userReact = function(id, type) {
    var reaction = type;
    var liked = document.getElementById(id+"-thumbs-up").src
    var disliked = document.getElementById(id+"-thumbs-down").src
    console.log(liked);
    console.log(disliked);
    if(liked.includes("fill") == false && disliked.includes("fill") == false) {
        react(id, type, function(result) {
            var data = JSON.parse(result);
            console.log(data);
            if(data.length > 0) {
                if(reaction == 1) {
                    console.log("Total like "+data[0].TotalReactions)
                    document.getElementById(id+"-total-up").innerHTML = data[0].TotalReactions;
                    document.getElementById(id+"-thumbs-up").src = "/images/hand-thumbs-up-fill.svg";
                } else if(reaction == 2) {
                    console.log("Total dislike "+data[0].TotalReactions)
                    console.log(document.getElementById(id+"-thumbs-down"));
                    document.getElementById(id+"-total-down").innerHTML = data[0].TotalReactions;
                    document.getElementById(id+"-thumbs-down").src = "/images/hand-thumbs-down-fill.svg";
                }
            }
        });
    } else {
        window.alert("You've Already Reacted to this post!");
    }
}
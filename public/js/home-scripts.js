// home-scripts.js
const APIURL = "http://localhost:3000";

const getIssues = async function(callback) {
    const response = await fetch(`${APIURL}/my-issues`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((issues) => {
      console.log("API call: "+issues);
      callback(issues);
    });
  };

var submitIssue = function(form) {
    var title = document.getElementById('staticTitle').value;
    var content = document.getElementById('staticIssueBody').value;
    console.log(title+" "+content);
    window.alert("/user-post?subject="+title+"&content="+content);
    form.action = "/user-post?subject="+title+"&content="+content;
    form.submit();
}

function closeModal() {
    document.getElementById("submitIssueModal").style.display = "none";
    document.getElementById("viewIssuesModal").style.display = "none";
    document.getElementById('staticTitle').value = '';
    document.getElementById('staticIssueBody').value = '';
    var elems = document.getElementsByClassName('issue');
    for(var i=0; i<elems.length; i++) {
        elems[i].remove();
    }
}

async function openModal(caller) {
    if(caller == 'submitIssueModal') {
        document.getElementById("submitIssueModal").style.display = "block";
    } else if (caller == 'viewIssuesModal') {
        document.getElementById("viewIssuesModal").style.display = "block";
        document.getElementById("viewIssuesModal").style.maxWidth = "800px;"
        await getIssues(function (result) {
            var data = JSON.parse(result);
            console.log(data);
            var len = Object.keys(data).length;
            console.log(len);
            console.log(data[0]);
            if(len > 0) {
              for(var i=0; i<len; i++) {
                var card = document.createElement("div");
                var cardBody = document.createElement("div");
                var cardTitle = document.createElement("h5");
                var viewForm = document.createElement("form");
                var submitButton = document.createElement("button");
                card.className = "card issue";
                card.style.margin = "0 auto";
                card.style.marginBottom = "15px"
                card.style.width = "18rem";
                cardBody.className = "card-body";
                cardTitle.className = "card-title";
                cardTitle.innerHTML = data[i].SubjectLine;
                viewForm.action = "/view-post?id=" + data[i].UserPostID;
                viewForm.method = "post";
                submitButton.type = "submit";
                submitButton.className = "btn btn-link";
                submitButton.innerHTML = "View Full Issue";
                viewForm.appendChild(submitButton);
                cardBody.appendChild(cardTitle);
                cardBody.append(viewForm);
                card.appendChild(cardBody);
                document.getElementById("viewIssuesContent").appendChild(card);                
              }
            } else {
              var elem = document.createElement("p");
              elem.innerHTML = "No Issues Submitted";
              document.getElementById("viewIssuesContent").appendChild(elem);  
            }
        });
    }
}
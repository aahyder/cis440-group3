// admin-scripts.js
const APIURL = "http://localhost:3000";

const getRequest = async function(request, callback) {
  var id = request;
  const response = await fetch(`${APIURL}/new-request?id=${id}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => response.json())
  .then((request) => {
    console.log("API call: "+request);
    callback(request);
  });
};

function openModal(request) {
    document.getElementById("myModal").style.display = "block";
    var id = request;
    getRequest(id, function(result) {
        var data = result;
        document.getElementById("static").value = data.AccountRequestID;
    });
  }
  
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var submitApproval = function(form) {
    var dept = document.getElementById('staticDepartment').value;
    var job = document.getElementById('staticJob').value;
    var email = document.getElementById('staticEmail').value;
    var first = document.getElementById('staticFirstName').value;
    var last = document.getElementById('staticLastName').value;
    form.action = "/user?email="+email+"&dept="+dept+"&title="+job+"&fname="+first+"&lname="+last;
    console.log(form.action);
    form.submit();
  }
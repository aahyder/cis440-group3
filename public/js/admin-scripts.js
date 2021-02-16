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
    console.log("API call: "+JSON.stringify(request));
    callback(JSON.stringify(request));
  });
};

async function openModal(request) {
  document.getElementById("myModal").style.display = "block";
  var id = request;
  try {
    await getRequest(id, function(result) {
        var data = JSON.parse(result);
        console.log("client side get: "+data);
        document.getElementById("staticId").value = data.AccountRequestID;
        document.getElementById("staticFirstName").value = data.RequestFirstName;
        document.getElementById("staticLastName").value = data.RequestLastName;
        document.getElementById("staticEmail").value = data.RequestEmail;
        document.getElementById("staticDepartment").value = data.DepartmentName;
        document.getElementById("staticJob").value = data.JobTitle;
    });
  } catch (error) {
    alert(error.toString());
  }
}
  
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

var submitApproval = function(form) {
    console.log(document.getElementById("staticId"));
    var id = document.getElementById("staticId").value;
    form.action = "/approve?id="+id;
    window.alert("/approve?id="+id);
    form.submit();
  }
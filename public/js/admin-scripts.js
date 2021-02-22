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

async function openModal(request, caller) {
  if (caller === "myModal") {
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
  } else if (caller === "denyModal") {
    document.getElementById("denyModal").style.display = "block";
    var id = request;
    try {
      await getRequest(id, function(result) {
          var data = JSON.parse(result);
          console.log("client side get: "+data);
          document.getElementById("staticId").value = data.AccountRequestID;
          document.getElementById("staticDenyEmail").value = data.RequestEmail;
      });
    } catch (error) {
      alert(error.toString());
    }
  } else if (caller === "emailModal") {
    document.getElementById("emailModal").style.display = "block";
  }
} 
  
function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("denyModal").style.display = "none";
    document.getElementById("emailModal").style.display = "none";
    document.getElementById("staticReason").value = '';
    document.getElementById("staticDenyEmail").value = '';
}

var submitApproval = function(form) {
    console.log(document.getElementById("staticId"));
    var id = document.getElementById("staticId").value;
    form.action = "/approve?id="+id;
    window.alert("/approve?id="+id);
    form.submit();
  }

var submitDenial = function(form) {
    console.log(document.getElementById("staticId"));
    var id = document.getElementById("staticId").value;
    var reason = document.getElementById("staticReason").value;
    var email = document.getElementById("staticDenyEmail").value;
    form.action = "/deny?id="+id+"&reason="+reason+"&email="+email
    window.alert("/deny?id="+id+"&reason="+reason+"&email="+email);
    form.submit();
  }

  var submitEmail = function(form) {
    var subject = document.getElementById("staticSubject").value;
    var email = document.getElementById("staticEmailBody").value;
    form.action = "/email-managers?subject="+subject+"&email="+email
    window.alert("/email-managers?subject="+subject+"&email="+email);
    form.submit();
  }
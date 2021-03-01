const APIURL = "http://localhost:3000";

const jobTitles = async function(department, callback) {
  var id = department;
  const response = await fetch(`${APIURL}/job-titles?id=${id}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((response) => response.json())
  .then((jobs) => {
    console.log("API call: "+jobs);
    callback(jobs);
  });
};

var selectDepartment = function() {
  var selection = document.getElementById('department-dropdown').value;
  getJobTitles(selection);
}

var submitRequest = function(form) {
  var dept = document.getElementById('department-dropdown').value;
  var job = document.getElementById('job-dropdown').value;
  var email = document.getElementById('inputEmail').value;
  var first = document.getElementById('inputFirstName').value;
  var last = document.getElementById('inputLastName').value;
  if(job > 0 && dept > 0){
    window.alert("/request?email="+email+"&dept="+dept.toString()+"&title="+job.toString()+"&fname="+first+"&lname="+last);
    form.action = "/request?email="+email+"&dept="+dept.toString()+"&title="+job.toString()+"&fname="+first+"&lname="+last;
    form.submit();
  } else {
    window.alert('You must pick a department and job title');
  }
}

var getJobTitles = async function (value) {
    console.log('get jobs fired');
    var elements = document.getElementsByClassName('job-option');
    console.log(elements);
    if (elements.length > 0) {
      for(var i=0; i<elements.length; i++) {
        elements[i].remove();
        document.getElementById("job-dropdown").innerHTML = "<option value='' disabled selected>Select Department</option>";
      } 
    }
    try {
      var department = value;
      var jobSelect = document.getElementById("job-dropdown");
      if(department > 0) {
        await jobTitles(department, function(result) {
          var data = JSON.parse(result);
          console.log(data);
          var len = Object.keys(data).length;
          console.log(len);
          console.log(data[0]);
          if(len > 0) {
            for(var i=0; i<len; i++) {
              var elem = document.createElement("option");
              elem.className = "job-option";
              elem.value = data[i].JobTitleID;
              elem.innerHTML = data[i].JobTitle;
              console.log(elem);
              jobSelect.appendChild(elem);
            }
          } else {
            var elem = document.createElement("option");
            elem.className = "job-option";
            elem.value = data.JobTitleID;
            elem.innerHTML = data.JobTitle;
            console.log(elem);
            jobSelect.appendChild(elem);
          }
          console.log(jobSelect);
        });
      } else {
        alert('Please select department before selecting job title');
      }
    } catch (error) {
      throw error;
    }
};
// Script to get the cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Script to add/update the todo
$('#submitBtn').click(function(){
	let description = $('#desc').val();
	let csrftoken = getCookie('csrftoken');
	let snoEdit = $('#snoEdit').val();
	let msg = $('#msg');
	let output = "";

	let mydata = {snoEdit: snoEdit, description: description, csrfmiddlewaretoken: csrftoken};

	$.ajax({
		url: "/post/todo",
		method: "POST",
		data: mydata,
		dataType: "json",

		success: function(data){
			// console.log(data.msg_status);
			if (data.msg_status == "error")
			{
				msg.addClass('text-danger');
			}
			else
			{
				msg.addClass('text-success');
				let x = data.todo_data;

				for (i=0; i<x.length; i++){
					output += `
					<tr>
						<td>${x[i].sno}</td>
						<td>${x[i].description}</td>
						<td>
							<button class="edit btn btn-sm btn-secondary" id="${x[i].sno}">Edit</button>
							<button class="delete btn btn-sm btn-secondary" id="${x[i].sno}">Delete</button>
						</td>
					</tr>
					`;
				}
				$('#tbody').html(output);
			}
			msg.html(data.message);
			setTimeout(() => {
				msg.html("");
				msg.removeAttr("class");
			}, 3000)
		}
	})
	$('#todoForm')[0].reset();
	$("input[type=hidden]").val('');
})

// Script to edit the todo
$("tbody").on("click", ".edit", function(e) {
	let btnId = e.target.id;
	let csrftoken = getCookie('csrftoken')
	let mydata = {snoEdit: btnId, csrfmiddlewaretoken: csrftoken};

	$.ajax({
		url: "/edit/todo",
		method: "POST",
		data: mydata,
		dataType: "json",

		success: function(data){
			$('#snoEdit').val(data.todoId);
			$('#desc').val(data.todoDesc);
		}
	})	
})

// Script to delete the todo
$("tbody").on("click", ".delete", function(e) {
	if (confirm("Are you sure, you want to delete this todo ?")){
		let btnId = e.target.id;
		let csrftoken = getCookie('csrftoken');
		let mydata = {snoEdit: btnId, csrfmiddlewaretoken: csrftoken};
		let msg = $('#msg');
		let mythis = this;

		$.ajax({
			url: "/delete/todo",
			method: "POST",
			data: mydata,
			dataType: "json",

			success: function(data){
				if (data.msg_status == "error")
				{
					msg.addClass("text-danger");
				}
				else
				{
					msg.addClass("text-success");
					$(mythis).closest("tr").fadeOut();
				}
				msg.html(data.message);
				setTimeout(() => {
					msg.html("");
					msg.removeAttr("class");
				}, 3000)
			}
		})
	}
	else{
		return false;
	}
})
 var socket = new WebSocket("ws://" + window.location.host + "/");

var name = prompt("Your name?");

var dPar=$("<p>")
  socket.addEventListener('message', function(message) {
  	var data = JSON.parse(message.data);
  	var par=$("<p>")
  	var userType= data.dPar;
  	if(userType){
  	$("#writeTo").append(dPar)
  	dPar.text(userType)
  		window.setTimeout(function(){
  		$(dPar).detach();
  	}, 2000) }else{
  		par.text(data.name+": "+data.message) 
  		$("#writeTo").append(par)	
  		}
  	
  
  });


	$("#typeArea").keydown(function(){
  	
  	socket.send(JSON.stringify({dPar:(name+" is typing...") 
  	}))
  	});	  

// socket.onopen = function () {
//   socket.send('here is a message for the server!'); // Send the message 'Ping' to the server
// };



 $('#textual').submit(function(event) {
    event.preventDefault();
    $(dPar).detach();
    var message = $('#typeArea').val();
    socket.send(JSON.stringify({name: name, message: message}));
    $('#typeArea').val('');
  })


	// if(typeArea.keydown){
 //  		var dPar
 //  		write there is typing
 //  		timeout detach

 //  	}
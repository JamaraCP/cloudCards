function pageListarCards(){
	$("#divListaCards").show();
	$("#navBarCards").show();
	$("#txtTitulo").html("Lista de Cards");

	firebase
		.database()
		.ref("cards")
		.on("value",function(snapshot){
					var	colecao	=	"";
					snapshot.forEach(	function(child){
											colecao	+=	'<div class="col-md-4">'+
															'<div class="card" id="card_'+child.key+'">'+
																'<img class="card-img-top" src="'+child.val().url+'" alt="">'+
																'<div class="card-body">'+
																	'<h4 class="card-title"><span>'+parseInt(child.val().curtida)+' Curtidas</span></h4>'+
																	'<p class="card-text">'+child.val().descricao+'</p>'+
																	'<div style="float:left">'+
																		'<button class="btn btn-danger" onclick="excluir(\''+child.key+'\',\''+child.val().caminhoStorage+'\')" >Excluir</button>'+
																		'<button class="btn btn-success" onclick="curtir(\''+child.key+'\')">Curtir</button>'+
																	'</div>'+
																'</div>'+
																'<div></div>'+
															'</div>'+
														'</div>';	
										}
					);
					$("#listar").html(colecao);
					$("#listar").show();
				}
	);
	//$("#listarCard")
}

/*
codigo para pageLogin

firebase.auth().onAuthStateChanged(function(user){
	if(user){pageListar();}
});

firebase.storage.delete(key);
*/

function cadastrarCard(){
	var card			=	"";
	var imagem			=	$("#inpImg")[0].files[0];
	var caminhoStorage	=	"cards/"+imagem.name;	
	var processo		=	firebase.storage().ref(caminhoStorage).put(imagem);

	processo.on(	"state_changed", 
					function progress(status){
						$("#progressImg").val((status.bytesTransferred / status.totalBytes)*100);
					},
					function error(error){
						alert("a imagem se perdeu pelo caminho! q pena....");
						console.log(error.message);
					},
					function complete(){
						firebase
						.storage()
						.ref(caminhoStorage)
						.getDownloadURL()
						.then(	function(url){
									var card	=	{
														"url":url,
														"descricao":$("#inpDesc").val(),
														"caminhoStorage":caminhoStorage,
														"curtida":0
													}

									firebase
										.database()
										.ref("cards")
										.push(card)
										.then(	function(result){
													alert("Parabéns! Há um novo card em sua coleção!!");
													$("#cadastrarCard").trigger("reset");	
													$('#cadastrarCard').modal('toggle');
													pageListarCards();
													console.log(result);
												}
										).catch(	function(error){
														alert("Aparentemente, seu card fugiu...:( ...tente inserí-lo novamente");
														console.log(error.message);
													}
										);

								}
						)
						.catch(	function(error){
									console.log(error.message);
								}
						);
					}
				);

	
}

function excluir(keycard,pathimage){
	var confirmacaoDel	=	confirm("Está mesmo tão cansado(a) desse card?");
	if(confirmacaoDel){
		firebase
		.storage()
		.ref(pathimage)
		.delete()
		.then(
			function(result){
				firebase
				.database()
				.ref("cards/"+keycard)
				.remove()
				.then(	function(result){
							alert("Card Removido.");
						}
				)
				.catch(function(error){
							console.log(error.message);
						}
				);
			}
		).catch( function (error){
					console.log(error.message);
				}
		);
	}

}


function curtir(keycard){
	firebase.database()
		.ref("cards/"+keycard)
		.once('value')
		.then(	function(snapshot){
					var qtdAtual	=	(parseInt(snapshot.val().curtida) + 1);
					var incrementoCurtidas	=	{	"curtida": qtdAtual};
					firebase
					.database()
					.ref("cards/"+keycard).update(incrementoCurtidas)
					.then(	function(result){
								$('#card_'+keycard+' h4').html("<span>"+qtdAtual+" Curtidas </span>");
							}
					)
					.catch(	function(error){
								console.log(error.message);
							}
					);	
				}
		);

}




//ao remover o card é necessário apagar tanto no banco quanto a imagem no storage...para isso é necessário pegar o id da imagem no storage
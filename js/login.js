function pageLoginCards(){
	$("#listar").hide();
	$("#loginCard").hide();
	$("#navBarCards").hide();
	$("#txtTitulo").html("Login");
	

	firebase.auth().onAuthStateChanged(	function(user){
														if(user){
															$("#loginCard").hide();
															pageListarCards();
														}else{
															$("#loginCard").show();
														}
										}
									  );
}



function cadastrarUsuario(){
	var email	=	$("#email_login").val();
	var senha	=	$("#senha_login").val();

	firebase
		.auth()
		.createUserWithEmailAndPassword(email,senha)
		.then(function(user){
			alert("Novo usuário registrado! Agora é só logar!");
			$("#formlogin").trigger("reset");
			console.log(user);
		})
		.catch(function(error){
			alert("Hn...não conseguimos registrar seus dados... Pode tentar outro email?");
			console.log(error.message);
		});
}





function login(){
	var email	=	$("#email_login").val();
	var senha	=	$("#senha_login").val();

	firebase
		.auth()
		.signInWithEmailAndPassword(email,senha)
		.then(function(user){
			alert("Dados confirmados. Divirta-se!");
			$("#formlogin").trigger("reset");
			console.log(user);
			pageListarCards();
		})
		.catch(function(error){
			alert("Não encontramos seu registro...Tem certeza que os dados são esses?");
			console.log(error.message);
		});
}


function logout(){
	firebase.auth().signOut();
	pageLoginCards();
}


function logarComProvedor(provedor){
//duas formas: popup e redirecionamento para a pagina de login da aplçicação utilizada (face, git,etc) ..O pessoal do Firebase recomenda popup

	firebase.auth().signInWithPopup(provedor)
	.then(function(user){
		console.log(user);
		pageListarCards();
	})
	.catch(function(error){
		console.log(error.message);
	});

}

function logarComGoogle(){

	var provedor =	new firebase.auth.GoogleAuthProvider(); //se fosse google  : GoogleAuthProvider(), github: GitHubAuthProvider(),etc
	logarComProvedor(provedor);
}

function logarComGitHub(){

	var provedor =	new firebase.auth.GithubAuthProvider(); //se fosse google  : GoogleAuthProvider(), github: GitHubAuthProvider(),etc
	console.log("testando git...");
	logarComProvedor(provedor);

	//No avatar do usuário do git, ir em Settings, ir em DEvelopment Settings ao final do menu (lado esquerdo), inserir o nome da aplicação uma url (como https://localhost) e a url da aplicação(obtida no proprio firebase em Authentication/Metodos de login )
}


document.addEventListener('deviceready', onDeviceReady, false);

function inserir(){
    let userName = document.getElementById("txtLogin").value;
    let userPass = document.getElementById("txtPassword").value;

    db.transaction(
        function(txt){
            tx.executeSql('INSERT INTO usuarios VALUES (?,?)", [userName,userPass]);
        },
        function(err){
            alert(err.message);
        },
        function(){
            alert("Inserido com sucesso");
        }
    );
}

function listar(){
    db.transaction(
        function(txt){
            let sql = "SELECT login, pass FROM usuarios";
            tx.executeSql('SELECT login AS uLogin, pass AS uPass FROM usuarios',[],function(tx,rs){
                alert(JSON.stringify(rs));
                console.log("========");
                console.log(JSON.stringify(rs));
                console.log(rs.rows.length);
            });
    },
    function(err){
        alert(err.message);
    },
    function(){
        alert("Inserido com sucesso");
    }
);
}

function onDeviceReady() {
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    //aqui a gente só confere se temos realmente o objeto sqlitePlugin 
    console.log(window.sqlitePlugin);

    //add func pro evento click do btn inserir
    document.getElementById("btnInserir").addEventListener("click", inserir);

    //add func pro evento click do btn listar
    document.getElementById("btnListar").addEventListener("click", listar);

    //criar e abrir o banco de dados
    let dadosDoNossoBanco = {
        name: 'my.db',
        location: 'default',
        androidDatabaseProvider: 'system'
    }
    db = window.sqlitePlugin.openDatabase(dadosDoNossoBanco);

    //cria a tab com duas colunas usuário e senha
    db.transacation(function(txt){
                    console.log(tx);
                    tx.executeSql('CREATE TABLE IF NOT EXISTS usuario (login,pass)');
 
                    },
                    function(err){
                        console.log(err.message);

                    },

                    function(){
                         alert("Tabela criada com sucesso");   
                    }
    );
} //function onDeviceReady() {

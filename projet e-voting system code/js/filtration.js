async function captentObject(objectType) {
    let liste = [];

    // Importer les blocs
    try {
        const response = await fetch('http://localhost:3000/blocks');
        const blocks = await response.json();
        // console.log(blocks)

        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i];
            if (block && block.data) {
                for (let j = 0; j < block.data.length; j++) {
                    if (block.data[j].input && block.data[j].input.data) {
                        liste.push(block.data[j].input.data[objectType]);
                    }
                }
            }
        }
    } catch (error) {
        console.log('Erreur dans l\'importation des blocs:', error);
    }

    // Importer les transactions
    try {
        const resp = await fetch('http://localhost:3000/transactions');
        const transactions = await resp.json();
        for (let i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];
            if (transaction.input && transaction.input.data) {
                liste.push(transaction.input.data[objectType]);
            }
        }
    } catch (error) {
        console.log('Erreur dans l\'importation des transactions:', error);
    }

    //***************************************** module comparaison token  ***********************************/
    return liste;
}

async function verif(token) {
    liste= await captentObject('user')
    for (i=0;i<liste.length;i++){
        if((liste[i]!=null)&&(liste[i]['token']==token)){
            verite=true
        }else{
            verite=false
        }
    }
    return verite
    
}

async function cherche(nn,token){
    chercher=false
    var votes=await captentObject('vote')
    console.log(votes)
    for (i=0;i<votes.length;i++){
        if((votes[i]!=null)&&(votes[i]['token']==token)&&(votes[i]['election']==nn)){
            //console.log("ok")
            chercher=true
        }
    }
    return chercher
}








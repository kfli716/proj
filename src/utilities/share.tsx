import {Node} from './ui'

function shareUtil(output: Node[]){
    let validWords = "";
    for(let node of output){
        if(node.isWord){
            validWords = validWords + `%20${node.name}`;
        }
    }
    console.log(window.location.href);
    const ref =  window.location.href;
    let i = ref.lastIndexOf('/');
    const url = ref.substring(0, i + 1) + validWords.substring(3);
    if(navigator.share !== undefined){
        navigator.share({url})
        .then(
            () => console.log('shared')
        )      
        .catch(
            (err)=>  console.error(err)
        ) 
    }
    else{
        navigator.clipboard.writeText(url);
        alert('The address is copied, You can share this pronunciation by pasting it on other apps.')
    }
}

export default shareUtil;
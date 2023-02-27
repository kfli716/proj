import {Node} from './ui';

function shareUtil(output: Node[], hasURLParam: boolean){
    console.log(`has URL input? ${hasURLParam} `)
    let validWords = "";
    for(let node of output){
        console.log(node.name);
        if(node.isWord){
            validWords = validWords + node.name;
        }
    }
    let ref =  window.location.href;
    if(hasURLParam){
        ref = ref.substring(0, ref.lastIndexOf('/') + 1);
    }
    const url = ref + validWords;

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
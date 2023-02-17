import {Node} from './ui';
import audioList from '../audioList.json';

const list = audioList as {
    [key: string]: { offset: number, fileSize: number }
}


function playAudio(audio: HTMLAudioElement, source: Blob | undefined, nodes: Node[], i: number, end: number, setPlay: React.Dispatch<React.SetStateAction<number>>){
    if(i >= end){
        setPlay(Infinity);
        return;
    }
    if(!nodes[i].isWord){
        playAudio(audio, source, nodes, i + 1, end, setPlay);
        return;
    }
    let src = `./audio/${nodes[i].name}.mp3`
    if(source){
        const name = nodes[i].name;
        const offset = list[name].offset, fileSize = list[name].fileSize;
        const blob = source.slice(offset, offset + fileSize + 1, 'audio/mpeg');
        src = window.URL.createObjectURL(blob);
    }    
    audio.src = src;
    let element = document.getElementsByClassName('envelope')[i] as HTMLElement;
    element.style.color = 'blue';
    audio.play();
    audio.onended = () =>{
        playAudio(audio, source, nodes, i + 1, end, setPlay);
        element.style.color = 'black';
    }
}

export default playAudio;
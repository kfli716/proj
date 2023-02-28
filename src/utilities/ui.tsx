import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faUndo, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import './ui.css'
import audioList from '../audioList.json';
import playAudio from './audio';
import shareUtil from './share'
import Explantions from './explanations';

const list = audioList as {
    [key: string]: { offset: number, fileSize: number }
}

class Node {
    name: string;
    isWord: boolean;

    constructor(name: string, isWord: boolean) {
        this.name = name;
        this.isWord = isWord;
    }
}

type inputProps = {
    source: Blob | undefined;
    play: number;
    setPlay: React.Dispatch<React.SetStateAction<number>>;
}

const audio = new Audio();

function SearchPage({ source, play, setPlay }: inputProps) {
    const { urlParams } = useParams();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<Node[]>([]);
    const navigate = useNavigate();

    function resetColor() {
        for (let i = 0; i < output.length; i++) {
            let e = document.getElementsByClassName('envelope')[i] as HTMLElement;
            e.style.color = output[i].isWord ? 'black' : 'red';
        }
    }

    function playUtil() {
        if (input === '') return;
        let arr = input.split(' ').filter(s => s !== '');
        setOutput(arr.map(s => new Node(s, s in list)));
        setPlay(-1);
        setInput(arr.join(' '));
    }

    useEffect(() => {
        if (urlParams !== undefined) {            
            let str = urlParams.toLowerCase();
            let arr: string[] = [];
            for(let l = 0, r = 0; l < str.length; l++){
                if(str[l] == ' ') continue;
                r = l;
                while(r < str.length && (str[r] < '0' || str[r] > '9')) r++;
                arr.push(str.substring(l, r + 1));
                l = r;
            }
            console.log(arr);
            let cur = arr.join(' ');
            setOutput(arr.map(s => new Node(s, s in list)));
            setInput(cur);
        }
    }, [urlParams, navigate])

    useEffect(() => {
        if (play === Infinity) return;

        if (play === -1) {
            playAudio(audio, source, output, 0, output.length, setPlay);
        }
        else if (play !== Infinity) {
            playAudio(audio, source, output, play, play + 1, setPlay);
        }
    }, [play, setPlay, output])

    return (
        <div className='searchPage'>
            <div className='searchComponents'>
                <input
                    className='inputBar'
                    type='text'
                    value={input}
                    placeholder='please type here'
                    autoCorrect='off'
                    autoCapitalize='none'
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInput(event.target.value.toLowerCase());
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if(event.key == 'Enter'){
                            audio.pause();
                            resetColor();
                            playUtil();
                        }
                    }}
                />
                <FontAwesomeIcon
                    icon={faPlay}
                    className='button play'
                    style={{ display: play !== Infinity ? 'none' : 'inline-block' }}
                    onClick={() => {
                        playUtil();
                    }}
                />
                <FontAwesomeIcon
                    icon={faStop}
                    className='button stop'
                    style={{ display: play !== Infinity ? 'inline-block' : 'none' }}
                    onClick={() => {
                        audio.pause();
                        resetColor();
                        setPlay(Infinity);
                    }}
                />
                <FontAwesomeIcon
                    icon={faUndo}
                    className='button undo'
                    onClick={() => {
                        audio.pause();
                        setPlay(Infinity);
                        resetColor();
                        setInput('');
                    }}
                />
                <FontAwesomeIcon
                    icon={faShareAlt}
                    className='button share'
                    onClick={() => {
                        /*
                        if (input === '') return;
                        let arr = input.split(' ').filter(s => s !== '');
                        setOutput(arr.map(s => new Node(s, s in list)));
                        resetColor();
                        setInput(arr.join(' '));
                        */
                        shareUtil(output, urlParams !== undefined);}}
                />
            </div>

            <div className='resultComponents'>
                    {
                        output?.map((node, i: number) => {
                            return (
                                <div
                                    key={i}
                                    className='envelope'
                                    style={{ color: node.isWord ? 'black' : 'red' }}
                                    onClick={() => {
                                        resetColor();
                                        setPlay(i);
                                    }}
                                >
                                    {node.name}
                                </div>
                            )
                        })
                    }
            </div>
            <Explantions />
        </div>)
}

export {SearchPage, Node};

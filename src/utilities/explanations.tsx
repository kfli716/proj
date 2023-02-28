import { faUndo, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Explantions(){
    return (
        <div className='explanations'>
            <ol>
                <li>
                    Wrongly spelled words are red in color. You can click on the words to read it.
                </li>
                <li>
                    Use <FontAwesomeIcon icon={faUndo} /> to clear the input.
                </li>
                <li>
                    Use <FontAwesomeIcon icon={faShareAlt}/> to share the pronunciations of the words you entered, all wrongly spelled words will be removed.
                    <br></br>
                    <br></br>
                    If nothing pops up, the link is copied by the device.
                </li>
            </ol>
        </div>
    )
}

export default Explantions;
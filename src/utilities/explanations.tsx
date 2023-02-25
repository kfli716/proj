import { faUndo, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Explantions(){
    return (
        <div className='explanations'>
            <ol>
                <li>
                    Use <FontAwesomeIcon icon={faUndo} /> to clear the input.
                </li>
                <li>
                    Use <FontAwesomeIcon icon={faShareAlt}/> to share the pronunciations of the words you entered, all wrongly spelled words will be filtered.
                </li>
                <li>
                    If your browser does not support sharing, the website link will be copied by your device.
                </li>
            </ol>
        </div>
    )
}

export default Explantions;
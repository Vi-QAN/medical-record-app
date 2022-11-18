import { Container, Button } from 'react-bootstrap';
import * as Colors from '../constants/colors';

export default function ToggleDisplay({title, setVisible, state}){
    return (
        <Container className="d-flex flex-row justify-content-between mb-5">
            <h5>{title}</h5>
            {!state ?
            <Button onClick={() => setVisible(true)} style={{color: Colors.darkBlue, backgroundColor: Colors.white}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={Colors.darkBlue} class="bi bi-caret-left" viewBox="0 0 16 16">
                    <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
                </svg>
            </Button> 
            :
            <Button onClick={() => setVisible(false)} style={{color: Colors.darkBlue, backgroundColor: Colors.white}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={Colors.darkBlue} class="bi bi-caret-down" viewBox="0 0 16 16">
                    <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                </svg>
            </Button>
            }
        </Container>
    )
}
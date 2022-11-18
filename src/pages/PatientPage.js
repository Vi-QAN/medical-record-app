

export default function PatientPage() {
    
    const [visibleInfo, setVisibleInfo] = React.useState(false);
    return (
        <Container fluid className="d-flex flex-column align-items-center my-5 px-5" id="info" >
            <ToggleDisplay title="Profile" setVisible={setVisibleInfo} state={visibleInfo}/>
            {visibleInfo && 
            <Card className="d-flex flex-row" style={{ width: '80%'}}>
                <Card.Img style={{width: '20%', height: '80%'}} src={profileImg} />
                
                <Card.Body className="d-flex flex-column">
                    <Form>
                        <Form.Group>

                        </Form.Group>
                    </Form>
                </Card.Body>
                <CloseButton onClick={() => setVisibleInfo(false)} className='px-3 py-3'></CloseButton>  
            </Card>}
        </Container>
    )
}
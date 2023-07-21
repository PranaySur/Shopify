import React from 'react'
import { Container } from 'reactstrap';
import '../../styles/common-section.css';

const CommonSection = ({ title }) => {
    return (
        // CommonSection component representing a common section with a title
        <section className="common__section">
            <Container className='text-center'>
                <h1>{title}</h1> {/* Render the provided title */}
            </Container>
        </section>
    );
}

export default CommonSection
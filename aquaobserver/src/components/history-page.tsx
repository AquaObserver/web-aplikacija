// MyComponent.js
import React from 'react';
import './history-page.css';
import homeIcon from '../assets/home-icon-html-14.jpg';
import diagramIcon from '../assets/diagram.png';
import leftArrow from '../assets/left-arrow.png';
import rightArrow from '../assets/right-arrow.png';

export default function History() {

    const handleLeftButtonClick = () => {
        // Define the action for the left button click
        console.log('Left button clicked!');
        // Add your logic here
    };

    const handleRightButtonClick = () => {
        // Define the action for the right button click
        console.log('Right button clicked!');
        // Add your logic here
    };

    return (
        <div >
            <div className='history-container'>
                <div></div>
                <div>
                    <h1 className='povijest'>Povijest mjerenja</h1>
                    <h1 className='datum'>1.10.2023.-7.10.2023.</h1>
                </div>
                <img src={homeIcon} alt="home" />
            </div>
            <div className='diagram'>
                <img src={diagramIcon} alt="home" />
            </div>
            <div className='bottom'>
                <div className='left'>
                    <img
                        src={leftArrow}
                        alt="left"
                        className='leftButton'
                        onClick={handleLeftButtonClick}
                    />
                </div>
                <div className='minMax'>
                    <h2>Max razina</h2>
                    <h2>Min razina</h2>
                </div>
                <div className='right'>
                    <img
                        src={rightArrow}
                        alt="right"
                        className='rightButton'
                        onClick={handleRightButtonClick}
                    />
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react'
import '../../styles/clock.css'

const Clock = () => {
    const [days, setDays] = useState() // State variable to store days
    const [hours, setHours] = useState() // State variable to store hours
    const [minutes, setMinutes] = useState() // State variable to store minutes
    const [seconds, setSeconds] = useState() // State variable to store seconds
    let interval;
    const countDown = () => {
        const destination = new Date('April 5, 2024').getTime() // Set the countdown destination date
        interval = setInterval(() => {
            const now = new Date().getTime() // Get the current time
            const different = destination - now // Calculate the time difference
            const days = Math.floor(different / (1000 * 60 * 60 * 24)) // Calculate the remaining days
            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) // Calculate the remaining hours
            const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60)) // Calculate the remaining minutes
            const seconds = Math.floor(different % (1000 * 60) / 1000) // Calculate the remaining seconds

            if (destination < 0) {
                clearInterval(interval.current) // Stop the countdown if the destination time is reached
            } else {
                setDays(days) // Update the state variable with the remaining days
                setHours(hours) // Update the state variable with the remaining hours
                setMinutes(minutes) // Update the state variable with the remaining minutes
                setSeconds(seconds) // Update the state variable with the remaining seconds
            }
        });
    };
    useEffect(() => {
        countDown() // Start the countdown when the component mounts
    }, []) // Empty dependency array to ensure the effect runs only once

    return (
        <div className="clock__wrapper d-flex align-items-center gap-3">
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{days}</h1>
                    <h5 className='text-white fs-6'>Days</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{hours}</h1>
                    <h5 className='text-white fs-6'>Hours</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{minutes}</h1>
                    <h5 className='text-white fs-6'>Minutes</h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>
            <div className="clock__data d-flex align-items-center gap-3">
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{seconds}</h1>
                    <h5 className='text-white fs-6'>Seconds</h5>
                </div>
            </div>
        </div>
    );
}

export default Clock
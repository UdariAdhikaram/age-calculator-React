import React, { useState } from 'react'

const AgeCalculator = () => {

    //define states to manage user input and calculate age
    const [birthdate, setbirthdate] = useState('');
    const [age, setage] = useState(null);
    const [error, setError] = useState('');

    //function to calculate age
    const calculateAge = () => {
        const birthDate = new Date(birthdate); //convert the input to a Date object 
        const today = new Date(); //Get the current date
        
        if (birthDate > today) {
            // Display error message
            setError('Invalid input. Birth date cannot be in the future.');
            setage(null);
            return;
        }

        const yearsDiff = today.getFullYear() - birthDate.getFullYear();
        const monthsDiff = today.getMonth() - birthDate.getMonth();
        const daysDiff = today.getDate() - birthDate.getDate();

        let ageYears = yearsDiff;
        let ageMonths = monthsDiff;
        let ageDays = daysDiff;

        //handle cases where the day or month of birthday is  ahead of the day or month
        if(daysDiff < 0){
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, birthDate.getDate());
            ageMonths -= 1;
            ageDays = Math.floor((today - lastMonth) / (24 * 60 * 60 *1000));
        }

        if(monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)){
            ageYears -= 1;
            ageMonths += 12;
        }

        //set the calculated age in the state
        setage ({
            years: ageYears,
            months: ageMonths,
            days: ageDays,
        });

        setError('');
    };

  return (
    <div className='age-calculator'>
        <h1>Age Calculator</h1>
        
        <input 
        type='date' 
        value={birthdate}

        onChange={(e) => {
            //Ensure that the input value is no longer then 10 characters
            if(e.target.value.length <= 10){
                setbirthdate(e.target.value);
            }
        }}
        max = "9999-12-31" //set the max allowed date
        min = "0000-01-01" //set the min allowed date
        />

        {/* button to trigger age calculation function */}
        <button onClick={calculateAge}>Calculate Age</button>

        {/* Display error message if exists */}
        {error && <p className="errormsg">{error}</p>}


        {/* structure to display the result s */}
        
        {age && (
        <div class="content">
            <div class="year">
                  <p id="year">{age.years}</p> 
                  <h5>Year</h5>
            </div>
            <div class="month">
                    <p id="month">{age.months}</p>
                    <h5>Month</h5>
            </div>
            <div class="day">
                    <p id="day">{age.days}</p>
                    <h5>Day</h5>
            </div>
        </div>
         )}
        {age && (
            <div className='desc'>
            <p>You are {age.years} years, {age.months} months, and {age.days} days old.</p>
            </div>
        )}
        </div>
  )
}

export default AgeCalculator
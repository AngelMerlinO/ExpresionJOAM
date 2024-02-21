import React, { useState } from 'react';

function Af() {
    const Letters = ["J", "A", "O", "M"];
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase();
        if (value.length <= 4 && value.split('').every(char => Letters.includes(char))) {
            setInput(value);
        }
    };

    return (
        <>
            <div className="flex w-full bg-gray h-screen items-center justify-center">
                <div className="flex w-full p-9 flex-col items-center justify-center">
                    <label htmlFor="text" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                        Introduce combinación de las letras "JOAM"
                    </label>
                    <input
                        type="text"
                        className="m-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-blue-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        value={input}
                        onChange={handleChange}
                        placeholder="JOAM"
                    />
                    <div className="bg-black-700 w-full h-80 flex items-center justify-center space-x-5">
                        {input.length > 0 && <State label="q0" Start={true} />}
                        {input.length > 0 && <Arrow label={input[0] || ''} />}
                        {input.length > 0 && <State label="q1" />}
                        {input.length > 1 && <Arrow label={input[1] || ''} />}
                        {input.length > 1 && <State label="q2" />}
                        {input.length > 2 && <Arrow label={input[2] || ''} />}
                        {input.length > 2 && <State label="q3" />}
                        {input.length === 4 && <Arrow label={input[3] || ''} />}
                        {input.length === 4 && <State label="q4" finalState={true} />}
                    </div>
                </div>
            </div>
        </>
    );
}

function Arrow({ label }) {
    return (
        <div className="relative flex items-center">
            <svg className="h-10 w-16">
                <line x1="10" y1="5" x2="50" y2="5" stroke="yellow" strokeWidth="2" />
                <polyline points="45,0 50,5 45,10" stroke="yellow" strokeWidth="2" fill="none" />
            </svg>
            <span className="absolute -top-3 left-6 text-white">{label}</span>
        </div>
    );
}

function State({ label, finalState, Start }) {
    return (
        <div className={`relative flex items-center justify-center text-center rounded-full w-10 h-10 ${finalState ? 'border-4 border-double border-black' : Start ? 'border-4 border-dashed border-black' : ''} bg-green-700`}>
            {label}
        </div>
    );
}

export default Af;

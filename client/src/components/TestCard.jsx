import React from 'react';

const TestCard = ({ title, isPrivate, img, questions }) => {
    return (
        <div className="card max-w-[380px] border border-gray-200 shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105 hover:shadow-xl">
            <img src={img} alt={`${title} cover`} className="w-full h-[250px] object-cover" />
            <div className="p-4 space-y-2">
                <h3 className="text-2xl font-bold tracking-wide truncate">{title}</h3>
                <p className="text-gray-500">
                    Total Questions: <span className="font-semibold">{questions}</span>
                </p>
                <p className={`font-bold text-lg ${ isPrivate ? 'text-red-500' : 'text-green-500'}`} >
                    {isPrivate ? 'Private' : 'Public'}
                </p>
                <button className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg tracking-wide transition hover:bg-blue-700" >
                    Take Test
                </button>
            </div>
        </div>
    );
};

export default TestCard;

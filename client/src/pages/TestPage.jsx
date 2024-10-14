import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TestPage = () => {
    const location = useLocation();
    const { title, questions, isPrivate } = location.state || {};
    
    const [textEditor, setTextEditor] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(questions.map(q => q.answer || ''));

    useEffect(() => {
        console.log('Location state:', location.state);
    }, [location.state]);

    const handleTabClick = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleChange = (event) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = event.target.value;
        setAnswers(newAnswers);
    };

    return (
        <div className="pt-10 bg-gray-50 flex items-center justify-center px-[3%]">
            <div className="w-[100%] h-[70vh] grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Question Navigation and Details */}
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{title}</h1>
                    <div className="flex space-x-4 mb-4">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleTabClick(index)}
                                className={`py-2 px-4 rounded-md font-semibold ${
                                    currentQuestionIndex === index
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Question {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            {`Question ${currentQuestionIndex + 1}:`}
                        </h2>
                        <p className="text-lg">
                            {questions[currentQuestionIndex].question}
                        </p>
                    </div>
                    <p className="text-lg">
                        Test Type:{' '}
                        <span
                            className={`font-semibold ${
                                isPrivate ? 'text-red-500' : 'text-green-500'
                            }`}
                        >
                            {isPrivate ? 'Private' : 'Public'}
                        </span>
                    </p>
                </div>

                {/* Editor Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        Answer Editor
                    </h2>
                    <textarea
                        rows="12"
                        value={textEditor}
                        onChange={(e) => setTextEditor(e.target.value)}
                        placeholder="Write your answers here..."
                        className="w-full p-4 border border-gray-300 rounded-md outline-none focus:border-blue-500 resize-none"
                    ></textarea>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        Submit Answer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestPage;

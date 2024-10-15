import React, { useEffect, useRef, useState } from 'react';
import './Component.css';
import toast from 'react-hot-toast';

const CreateTest = ({ setDisplayCreateTest }) => {
    const [title, setTitle] = useState('');
    const [pass, setPass] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    const formRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setDisplayCreateTest(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setDisplayCreateTest]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            const testData = {
                email: localStorage.getItem('user'),
                testTitle: title,
                testPass: pass,
                testQuestions: questions,
                private: isPrivate,
            }
            console.log(testData);
            const response = await fetch("http://localhost:8080/user/coding_platform/test/createTest",{
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(testData),
            })

            const data = await response.json();
            console.log(data);

            setDisplayCreateTest(false);
            if(!data.success){
                toast.error("Error while creating test!");
            }
        }
        catch(error){
            setDisplayCreateTest(false);
            console.error(error);
        }
    }

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answer: '' }]);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-gray-100 z-[999] bg-opacity-60 flex items-center justify-center">
            <form
                onSubmit={handleFormSubmit}
                ref={formRef}
                className="w-full createTestForm max-h-[600px] md:w-[60%] lg:w-[28%] border mx-4 px-4 lg:px-6 py-6 bg-white drop-shadow-lg"
            >
                <p className="text-center text-2xl font-semibold">NEW TEST</p>

                <div className="createTestForm mt-6 flex flex-col gap-4">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Unique Test Name"
                        className="w-full border px-4 py-2 rounded-lg"
                        required
                    />

                    {questions.map((q, index) => (
                        <div key={index} className="flex flex-col gap-2 border-b pb-4 mb-4">
                            <textarea
                                rows={4}
                                placeholder={`Question ${index + 1}`}
                                className="w-full border px-4 py-2 rounded-lg"
                                value={q.question}
                                onChange={(e) =>
                                    handleQuestionChange(index, 'question', e.target.value)
                                }
                                required
                            />
                            <input
                                type="text"
                                placeholder={`Answer ${index + 1}`}
                                className="w-full border px-4 py-2 rounded-lg"
                                value={q.answer}
                                onChange={(e) =>
                                    handleQuestionChange(index, 'answer', e.target.value)
                                }
                                required
                            />
                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(index)}
                                    className="text-red-500 self-end"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addQuestion}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                        Add Question
                    </button>

                    <div className="Toggle mx-2 flex items-center mt-4">
                        <span>Private:</span>
                        <div
                            onClick={() => setIsPrivate(!isPrivate)}
                            className={`${
                                isPrivate ? 'bg-green-600' : 'bg-gray-300'
                            } h-6 w-14 rounded-full ml-4 flex items-center transition duration-500 ease-in-out`}
                        >
                            <div
                                className={`ball w-7 h-7 bg-white border-[1px] border-gray-500 rounded-full transition duration-500 ease-in-out ${
                                    isPrivate ? 'translate-x-7' : ''
                                }`}
                            ></div>
                        </div>
                    </div>

                    {isPrivate && (
                        <input
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            placeholder="Test Password"
                            className="w-full border px-4 py-2 rounded-lg transition duration-500 ease-in-out"
                            required
                        />
                    )}

                    <div className="flex justify-between gap-6 mt-4 text-white">
                        <button className="bg-green-500 w-full py-2 rounded-lg cursor-pointer" type="submit">
                            SUBMIT
                        </button>
                        <button
                            onClick={() => setDisplayCreateTest(false)}
                            className="bg-red-500 w-full py-2 rounded-lg cursor-pointer"
                            type="button"
                        >
                            CLOSE
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTest;

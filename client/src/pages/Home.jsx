import React, { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar';
import TestCard from '../components/TestCard';
import { Card1, Card2 } from '../assets';

const Home = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/coding_platform/test/getTests');
                if (!response.ok) {
                    throw new Error('Failed to fetch tests');
                }
                const data = await response.json();
                setTests(data.tests); // Assuming 'data.tests' contains the array of tests
                console.log(data.tests);
            } catch (error) {
                console.error('Error fetching tests:', error);
            }
        };

        fetchTests();
    }, []);

    return (
        <div className="HomePage px-[3%]">
            <HomeNavbar />
            <div className="testCards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {tests.length > 0 ? (
                    tests.map((test, index) => (
                        <TestCard key={test._id} title={test.testTitle} isPrivate={test.private} img={index%2==0 ? Card1 : Card2}/>
                    ))
                ) : (
                    <p>No tests available</p>
                )}
            </div>
        </div>
    );
};

export default Home;

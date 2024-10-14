import React, { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar';
import TestCard from '../components/TestCard';
import { Card1, Card2 } from '../assets';

const Home = () => {
    const [tests, setTests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch('http://localhost:8080/user/coding_platform/test/getTests');
                if (!response.ok) {
                    throw new Error('Failed to fetch tests');
                }
                const data = await response.json();
                setTests(data.tests);
                // console.log(data.tests);
                // console.log(tests[0].testQuestions);
            } catch (error) {
                console.error('Error fetching tests:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTests();
    }, []);

    return (
        <div className="HomePage w-[100%] px-4 sm:px-8 lg:px-12">
            <HomeNavbar />
            <div className="testCards xs:mb-4 md:mb-8 mt-6 grid gap-20 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-stretch">
                {isLoading ? (
                    <p>Loading tests...</p>
                ) : tests.length > 0 ? (
                    tests.map((test, index) => (
                        <TestCard
                            key={test._id}
                            title={test.testTitle}
                            questions={test.testQuestions}
                            isPrivate={test.private}
                            img={index % 2 === 0 ? Card1 : Card2}
                        />
                    ))
                ) : (
                    <p>No tests available</p>
                )}
            </div>
        </div>
    );
};

export default Home;

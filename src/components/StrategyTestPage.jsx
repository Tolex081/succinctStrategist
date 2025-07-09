import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { strategyTestScenarios, allMembers } from './gameData';

// Succinct color palette for consistent styling
const succinctColors = {
    purple: '#B753FF',
    orange: '#FF955E',
    green: '#B0FF6F',
    blue: '#61C3FF',
    pink: '#FF54D7',
    redNeon: '#FF073A', // Red neon for failure
    greenNeon: '#39FF14', // Green neon for success
};

// SVG Crown Icon component
const CrownIcon = ({ color = 'currentColor', size = '1em' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block align-middle mx-1"
        style={{ width: size, height: size }}
    >
        <path d="M12 2L10 6L14 6L12 2ZM8 6V10H16V6H8ZM6 10V22H18V10H6Z M7 10L6 12L7 14L6 16L7 18L6 20L7 22 M17 10L18 12L17 14L18 16L17 18L18 20L17 22 M10 22L12 20L14 22 M12 6C11 6 10 7 10 8C10 9 11 10 12 10C13 10 14 9 14 8C14 7 13 6 12 6Z" />
    </svg>
);


// Utility to shuffle an array
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// StrategyTestPage component
function StrategyTestPage({ playerSelections, onTestComplete }) {
    // Memoize selectedCharacters to prevent unnecessary re-computations and re-renders
    const selectedCharacters = useMemo(() => {
        return playerSelections.filter(s => s.selectedMemberId !== null).map(s => {
            const member = allMembers.find(m => m.id === s.selectedMemberId);
            return member ? { ...member, questionId: s.questionId } : null;
        }).filter(Boolean);
    }, [playerSelections]); // Dependencies for useMemo

    // State for the current scenario index
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    // State for the shuffled scenarios (limited to 5)
    const [shuffledScenarios, setShuffledScenarios] = useState([]);
    // State for feedback message
    const [feedbackMessage, setFeedbackMessage] = useState('');
    // State for score (number of correct answers)
    const [score, setScore] = useState(0);
    // State to disable clicks during feedback
    const [isClickDisabled, setIsClickDisabled] = useState(false);
    // State to track members already used in this test session
    const [usedMemberIds, setUsedMemberIds] = useState([]);
    // State for typing effect
    const [displayedPrompt, setDisplayedPrompt] = useState('');
    const TYPING_SPEED = 30; // Milliseconds per character
    // State for the shuffled members available for the current question's display
    const [shuffledMembers, setShuffledMembers] = useState([]); // Added this line

    // Effect to shuffle scenarios (limit to 5) on component mount
    useEffect(() => {
        setShuffledScenarios(shuffleArray([...strategyTestScenarios]).slice(0, 5)); // Limit to 5 random questions
    }, []);

    // Get the current scenario (derived state)
    const currentScenario = shuffledScenarios[currentScenarioIndex];

    // Effect for typing animation when scenario changes
    useEffect(() => {
        if (currentScenario) { // Use currentScenario directly as a dependency
            let i = 0;
            setDisplayedPrompt(''); // Clear previous prompt
            const typingInterval = setInterval(() => {
                if (i < currentScenario.prompt.length) {
                    setDisplayedPrompt(prev => prev + currentScenario.prompt.charAt(i));
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, TYPING_SPEED);

            return () => clearInterval(typingInterval); // Cleanup on unmount or re-render
        }
    }, [currentScenario]); // Dependency on currentScenario

    // Effect to shuffle and set available members for the current question
    useEffect(() => {
        if (!currentScenario) return; // Ensure currentScenario is defined before proceeding

        // Filter out members already used in this test session
        const membersForCurrentQuestion = allMembers.filter(member => !usedMemberIds.includes(member.id));

        // Shuffle these available members for display
        setShuffledMembers(shuffleArray([...membersForCurrentQuestion]));
        setIsClickDisabled(false); // Re-enable selections for new question
    }, [currentScenario, usedMemberIds, allMembers]); // Dependencies: currentScenario, usedMemberIds, allMembers (static)


    /**
     * Handles the selection of a character for the current scenario.
     * @param {object} selectedMember - The member object chosen by the player.
     */
    const handleCharacterSelect = (selectedMember) => {
        if (isClickDisabled || usedMemberIds.includes(selectedMember.id)) return; // Prevent multiple clicks or reusing members
        setIsClickDisabled(true);

        const isCorrect = selectedMember.roles.includes(currentScenario.requiredRole);

        // Update score immediately for the current selection
        const newScore = score + (isCorrect ? 1 : 0);
        setScore(newScore);

        if (isCorrect) {
            setFeedbackMessage('Perfect! Strategic Genius!');
        } else {
            setFeedbackMessage(`Oops! That wasn't the best fit. We needed a ${currentScenario.requiredRole}.`);
        }

        setUsedMemberIds(prev => [...prev, selectedMember.id]); // Mark member as used

        // Move to next scenario or complete test after a delay
        setTimeout(() => {
            if (currentScenarioIndex < shuffledScenarios.length - 1) {
                setCurrentScenarioIndex(prevIndex => prevIndex + 1);
                setFeedbackMessage(''); // Clear feedback for next question
                setIsClickDisabled(false);
            } else {
                // Test complete, pass final score and total questions to parent
                onTestComplete(newScore, shuffledScenarios.length); // Pass the updated score
            }
        }, 2000); // 2-second delay
    };

    if (!currentScenario) {
        return <div className="text-gray-200">Preparing strategy test...</div>;
    }

    // Determine if the selected characters array is empty
    if (selectedCharacters.length === 0) {
        return (
            <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full text-center sm:border-4"
                 style={{ borderColor: succinctColors.orange }}> {/* Apply border only on sm and above */}
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6" style={{ color: succinctColors.orange }}>
                    No Characters Selected!
                </h2>
                <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-8">
                    You need to complete the initial Chess Challenge to select your team before testing your strategy.
                </p>
                <button
                    onClick={() => onTestComplete(0, 0)} // Go back to preview (or start of main game)
                    className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    style={{
                        backgroundColor: succinctColors.blue,
                        color: 'white',
                        boxShadow: `0 8px 20px -5px ${succinctColors.blue}80`
                    }}
                >
                    Back to Start
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full text-center sm:border-4"
             style={{ borderColor: succinctColors.orange }}> {/* Apply border only on sm and above */}
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-4" style={{ color: succinctColors.orange }}>
                Strategy Test: Scenario {currentScenarioIndex + 1} of {shuffledScenarios.length}
            </h2>
            {/* Prompt with typing effect */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed min-h-[100px] flex items-center justify-center">
                <span className="font-mono text-left w-full">
                    {displayedPrompt}
                </span>
            </p>

            {/* Selected Characters Grid */}
            <div className="pfp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 justify-items-center mb-8">
                {shuffledMembers.map(member => { // Changed from selectedCharacters.map to shuffledMembers.map
                    const isUsed = usedMemberIds.includes(member.id);
                    return (
                        <div
                            key={member.id}
                            className={`pfp-card relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out
                                        flex items-center justify-center p-1.5
                                        ${isUsed || isClickDisabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer hover:scale-105 hover:shadow-xl'}
                                        `}
                            style={{
                                backgroundImage: `linear-gradient(45deg, ${succinctColors.blue}, ${succinctColors.green})`,
                                boxShadow: `0 8px 20px -5px ${succinctColors.green}50`
                            }}
                            onClick={() => handleCharacterSelect(member)}
                        >
                            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-xl"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/90x90/CCCCCC/000000?text=${member.name.charAt(0)}`; }}
                                />
                            </div>
                            <p className="absolute bottom-1 text-white text-xs sm:text-sm font-semibold bg-gray-900 bg-opacity-70 px-1 py-0.5 rounded-md">
                                {member.name}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Feedback Message */}
            {feedbackMessage && (
                <p className={`text-base sm:text-xl md:text-2xl font-bold min-h-[30px] mb-4 transition-colors duration-500 text-center`}
                   style={{ color: feedbackMessage.includes('Perfect') ? succinctColors.greenNeon : succinctColors.redNeon }}>
                    {feedbackMessage}
                </p>
            )}
        </div>
    );
}

export default StrategyTestPage;

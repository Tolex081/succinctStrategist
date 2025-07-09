import React, { useState, useEffect, useMemo } from 'react'; // Import useMemo
import { allMembers } from './gameData';
import { baseGameQuestions } from './gameData';
import ChessPieceSVG from './ChessPieceSVG';

// Succinct color palette for consistent styling
const succinctColors = {
    purple: '#B753FF',
    orange: '#FF955E',
    green: '#B0FF6F',
    blue: '#61C3FF',
    pink: '#FF54D7',
};

// Helper function to find a question by its ID from the baseGameQuestions object
const findQuestionById = (questionId) => {
    for (const pieceType in baseGameQuestions) {
        const foundQuestion = baseGameQuestions[pieceType].find(q => q.id === questionId);
        if (foundQuestion) {
            return foundQuestion;
        }
    }
    return null;
};

// Function to get SVG icon for a chess piece
const getPieceIcon = (pieceName, color = 'currentColor', size = '1em') => {
    let pathData = '';
    switch (pieceName) {
        case 'King':
            pathData = 'M12 2C10.8954 2 10 2.89543 10 4V6H14V4C14 2.89543 13.1046 2 12 2ZM8 6V10H16V6H8ZM6 10V22H18V10H6Z M7 10L6 12L7 14L6 16L7 18L6 20L7 22 M17 10L18 12L17 14L18 16L17 18L18 20L17 22 M10 22L12 20L14 22';
            break;
        case 'Queen':
            pathData = 'M12 2L10 6L14 6L12 2ZM8 6V10H16V6H8ZM6 10V22H18V10H6Z M7 10L6 12L7 14L6 16L7 18L6 20L7 22 M17 10L18 12L17 14L18 16L17 18L18 20L17 22 M10 22L12 20L14 22 M12 6C11 6 10 7 10 8C10 9 11 10 12 10C13 10 14 9 14 8C14 7 13 6 12 6Z';
            break;
        case 'Rook':
            pathData = 'M4 4H20V6H18V20H6V6H4V4ZM6 6V4H8V6H6ZM10 6V4H14V6H10ZM16 6V4H18V6H16Z';
            break;
        case 'Bishop':
            pathData = 'M12 2C10 2 8 4 8 6V18H16V6C16 4 14 2 12 2ZM12 2V10M6 18V22H18V18H6Z';
            break;
        case 'Knight':
            pathData = 'M10 2C8 2 6 4 6 6V10H8V6C8 5 9 4 10 4H14V6H16V10H18V6C18 4 16 2 14 2H10ZM6 10V22H18V10H6Z M10 10L12 12L10 14L12 16L10 18L12 20L10 22';
            break;
        case 'Pawn':
            pathData = 'M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4Z M6 12V18H18V12H6Z';
            break;
        default:
            return null;
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block align-middle mr-1"
            style={{ width: size, height: size }}
        >
            <path d={pathData} />
        </svg>
    );
};

// GamePage component displays questions and allows member selection
function GamePage({ questions, members, playerSelections, onSelection, currentQuestionIndex, setCurrentQuestionIndex, onGameComplete }) {
    // State to store the shuffled members for the current question's display
    const [shuffledMembers, setShuffledMembers] = useState([]);
    const [isSelectionDisabled, setIsSelectionDisabled] = useState(false);

    // Get the current question based on the index
    const currentQuestion = questions[currentQuestionIndex];

    // Find the currently selected member for this question, if any
    const selectedMemberForCurrentQuestion = playerSelections.find(
        (selection) => selection.questionId === currentQuestion?.id
    )?.selectedMemberId;

    // Memoize the list of used member IDs to ensure stability
    const usedMemberIds = useMemo(() => {
        return playerSelections
            .filter(s => s.questionId !== currentQuestion?.id && s.selectedMemberId !== null)
            .map(s => s.selectedMemberId);
    }, [playerSelections, currentQuestion]); // Dependencies: playerSelections, currentQuestion

    // Memoize the list of available members to ensure stability
    const availableMembers = useMemo(() => {
        return members.filter(member => !usedMemberIds.includes(member.id));
    }, [members, usedMemberIds]); // Dependencies: members (prop, should be stable), usedMemberIds (memoized)


    // Effect to shuffle members for each new question or when availableMembers list changes
    useEffect(() => {
        if (!currentQuestion) return; // Ensure currentQuestion is defined before proceeding
        if (availableMembers && availableMembers.length > 0) {
            // Only shuffle available members for the current question
            setShuffledMembers(shuffleArray([...availableMembers]));
            setIsSelectionDisabled(false); // Re-enable selections for new question
        }
    }, [currentQuestionIndex, availableMembers, currentQuestion]); // Removed 'members' as it's now a dependency of availableMembers


    /**
     * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
     * @param {Array} array The array to shuffle.
     * @returns {Array} The shuffled array.
     */
    const shuffleArray = (array) => {
        const newArray = [...array]; // Create a shallow copy to avoid mutating original
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    /**
     * Handles the selection of a member for the current question.
     * @param {string} memberId - The ID of the selected member.
     */
    const handleMemberSelect = (memberId) => {
        if (isSelectionDisabled || !currentQuestion) return; // Prevent multiple clicks and ensure currentQuestion is defined

        setIsSelectionDisabled(true); // Disable further selections immediately
        onSelection(currentQuestion.id, memberId); // Pass selection to parent

        // Automatically move to the next question after a short delay
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                onGameComplete(); // All questions answered, complete the game
            }
        }, 500); // Shorter delay for faster flow (0.5 seconds)
    };

    // Determine if the "Next" button should be enabled
    const isNextEnabled = playerSelections.some(s => s.questionId === currentQuestion?.id && s.selectedMemberId !== null);
    const isPreviousEnabled = currentQuestionIndex > 0;

    if (!currentQuestion) {
        return (
            <div className="text-gray-200">
                Loading questions... If you see this for long, please go back to start.
            </div>
        );
    }

    return (
        <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full text-center sm:border-4"
             style={{ borderColor: succinctColors.blue }}>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-4" style={{ color: succinctColors.orange }}>
                Challenge {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                {currentQuestion.question}
            </p>

            {/* Chess Piece and Attributes Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10">
                {/* Chess Piece SVG with rotation */}
                <div className="w-28 h-28 md:w-48 md:h-48 flex items-center justify-center p-2 rounded-full shadow-lg"
                     style={{ backgroundColor: succinctColors.purple + '20', border: `2px solid ${succinctColors.purple}` }}>
                    <ChessPieceSVG
                        piece={currentQuestion.piece}
                        className={`w-full h-full text-gray-200 chess-piece-svg ${currentQuestion.rotationClass}`}
                        style={{ color: succinctColors.purple }}
                    />
                </div>

                {/* Attributes List */}
                <div className="text-left max-w-md">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: succinctColors.pink }}>
                        Key Attributes:
                    </h3>
                    <ul className="list-disc list-inside text-gray-200 text-sm sm:text-base md:text-lg space-y-1">
                        {currentQuestion.attributes.map((attr, index) => (
                            <li key={index}>{attr}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* PFP Grid for Selection */}
            <div className="pfp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 justify-items-center mb-8">
                {shuffledMembers.map(member => {
                    const isSelectedForThisQuestion = selectedMemberForCurrentQuestion === member.id;
                    const isAlreadySelectedElsewhere = playerSelections.some(
                        s => s.selectedMemberId === member.id && s.questionId !== currentQuestion.id
                    );

                    return (
                        <div
                            key={member.id}
                            className={`pfp-card relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out
                                        flex items-center justify-center p-1.5
                                        ${isSelectedForThisQuestion ? 'transform scale-105 ring-4 ring-offset-2 ring-blue-500 ring-offset-blue-200' : 'hover:scale-105 hover:shadow-xl'}
                                        ${isAlreadySelectedElsewhere || isSelectionDisabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                        `}
                            style={{
                                backgroundImage: `linear-gradient(45deg, ${succinctColors.purple}, ${succinctColors.pink})`,
                                boxShadow: `0 8px 20px -5px ${succinctColors.pink}50`
                            }}
                            onClick={() => handleMemberSelect(member.id)}
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

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    disabled={!isPreviousEnabled || isSelectionDisabled}
                    className="px-4 py-2 text-base sm:px-6 sm:py-3 text-lg font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                        backgroundColor: succinctColors.blue,
                        color: 'white',
                        boxShadow: `0 8px 20px -5px ${succinctColors.blue}80`
                    }}
                >
                    Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        disabled={!isNextEnabled || isSelectionDisabled}
                        className="px-4 py-2 text-base sm:px-6 sm:py-3 text-lg font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: succinctColors.orange,
                            color: 'white',
                            boxShadow: `0 8px 20px -5px ${succinctColors.orange}80`
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={onGameComplete}
                        disabled={!isNextEnabled || isSelectionDisabled}
                        className="px-4 py-2 text-base sm:px-6 sm:py-3 text-lg font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: succinctColors.green,
                            color: 'white',
                            boxShadow: `0 8px 20px -5px ${succinctColors.green}80`
                        }}
                    >
                        Finish Challenge
                    </button>
                )}
            </div>
        </div>
    );
}

export default GamePage;

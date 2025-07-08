import React, { useState, useEffect } from 'react';
import ChessPieceSVG from './ChessPieceSVG'; // Component for rotating SVG chess pieces

// Succinct color palette for consistent styling
const succinctColors = {
    purple: '#B753FF',
    orange: '#FF955E',
    green: '#B0FF6F',
    blue: '#61C3FF',
    pink: '#FF54D7',
};

// GamePage component manages the quiz questions and user interactions
function GamePage({ questions, members, playerSelections, onSelection, currentQuestionIndex, setCurrentQuestionIndex, onGameComplete }) {
    // Get the current question based on the index
    const currentQuestion = questions[currentQuestionIndex];

    // State to store the shuffled members for the current question's display
    const [shuffledMembers, setShuffledMembers] = useState([]);

    // Effect to shuffle members for each new question or when members list changes
    useEffect(() => {
        if (members && members.length > 0) {
            setShuffledMembers(shuffleArray([...members]));
        }
    }, [members, currentQuestionIndex]); // Re-shuffle when members list changes or question changes

    // Set the selected PFP based on playerSelections prop when currentQuestionIndex changes
    useEffect(() => {
        const currentSelection = playerSelections.find(s => s.questionId === currentQuestion.id);
        // No local state for selectedPfpId needed anymore, it comes from playerSelections prop
        // We will directly check playerSelections for styling and logic
    }, [currentQuestionIndex, currentQuestion, playerSelections]);

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
     * Handles the click event on a PFP card.
     * @param {string} memberId - The ID of the selected member.
     */
    const handlePfpClick = (memberId) => {
        // Prevent selection if this member is already selected for another question
        const isAlreadySelected = playerSelections.some(
            s => s.selectedMemberId === memberId && s.questionId !== currentQuestion.id
        );
        if (isAlreadySelected) {
            return; // Do not allow selection
        }

        // Call the onSelection prop to update the parent's state
        onSelection(currentQuestion.id, memberId);
    };

    // Determine if the "Next" button should be enabled
    const isNextEnabled = playerSelections.some(s => s.questionId === currentQuestion.id && s.selectedMemberId !== null);
    const isPreviousEnabled = currentQuestionIndex > 0;

    // Get the currently selected member for this question from playerSelections
    const currentSelectedMemberId = playerSelections.find(s => s.questionId === currentQuestion.id)?.selectedMemberId;

    if (!currentQuestion) {
        return <div className="text-gray-200">Loading question...</div>; // Should not happen often
    }

    return (
        <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full text-center border-4"
             style={{ borderColor: succinctColors.blue }}>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4" style={{ color: succinctColors.blue }}>
                Challenge {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                {currentQuestion.question}
            </p>

            {/* Chess Piece and Attributes Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10">
                {/* Chess Piece SVG with rotation */}
                <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center p-2 rounded-full shadow-lg"
                     style={{ backgroundColor: succinctColors.purple + '20', border: `2px solid ${succinctColors.purple}` }}>
                    <ChessPieceSVG
                        piece={currentQuestion.piece}
                        className={`w-full h-full text-gray-200 chess-piece-svg ${currentQuestion.rotationClass}`}
                        style={{ color: succinctColors.purple }} // Apply color to SVG
                    />
                </div>

                {/* Attributes List */}
                <div className="text-left max-w-md">
                    <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: succinctColors.pink }}>
                        Key Attributes:
                    </h3>
                    <ul className="list-disc list-inside text-gray-200 text-base md:text-lg space-y-2">
                        {currentQuestion.attributes.map((attr, index) => (
                            <li key={index}>{attr}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* PFP Grid for Selection */}
            <div className="pfp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center mb-8">
                {shuffledMembers.map(member => {
                    const isSelectedForThisQuestion = currentSelectedMemberId === member.id;
                    const isAlreadySelectedElsewhere = playerSelections.some(
                        s => s.selectedMemberId === member.id && s.questionId !== currentQuestion.id
                    );

                    return (
                        <div
                            key={member.id}
                            className={`pfp-card relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out
                                        flex items-center justify-center p-1.5
                                        ${isSelectedForThisQuestion ? 'transform scale-105 ring-4 ring-offset-2 ring-blue-500 ring-offset-blue-200' : 'hover:scale-105 hover:shadow-xl'}
                                        ${isAlreadySelectedElsewhere ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                                        `}
                            style={{
                                backgroundImage: `linear-gradient(45deg, ${succinctColors.purple}, ${succinctColors.pink})`, // Gradient border effect
                                boxShadow: `0 8px 20px -5px ${succinctColors.pink}50`
                            }}
                            onClick={() => handlePfpClick(member.id)}
                        >
                            <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center"> {/* Darker inner background */}
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-full object-cover rounded-xl"
                                    // Fallback for image loading errors
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/90x90/CCCCCC/000000?text=${member.name.charAt(0)}`; }}
                                />
                            </div>
                            <p className="absolute bottom-2 text-white text-xs md:text-sm font-semibold bg-gray-900 bg-opacity-70 px-2 py-1 rounded-md">
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
                    disabled={!isPreviousEnabled}
                    className="px-6 py-3 text-lg font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={!isNextEnabled}
                        className="px-6 py-3 text-lg font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={!isNextEnabled} // Ensure a selection is made before finishing
                        className="px-6 py-3 text-lg font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

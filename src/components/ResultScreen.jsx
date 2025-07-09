import React from 'react';
import { baseGameQuestions, allMembers } from './gameData';

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
    return null; // Return null if no question is found
};

// Function to get SVG icon for a chess piece
const getPieceIcon = (pieceName, color = 'currentColor', size = '1em') => {
    let pathData = '';
    switch (pieceName) {
        case 'King':
            // Crown icon
            pathData = 'M12 2C10.8954 2 10 2.89543 10 4V6H14V4C14 2.89543 13.1046 2 12 2ZM8 6V10H16V6H8ZM6 10V22H18V10H6Z M7 10L6 12L7 14L6 16L7 18L6 20L7 22 M17 10L18 12L17 14L18 16L17 18L18 20L17 22 M10 22L12 20L14 22';
            break;
        case 'Queen':
            // Queen's crown icon (more ornate)
            pathData = 'M12 2L10 6L14 6L12 2ZM8 6V10H16V6H8ZM6 10V22H18V10H6Z M7 10L6 12L7 14L6 16L7 18L6 20L7 22 M17 10L18 12L17 14L18 16L17 18L18 20L17 22 M10 22L12 20L14 22 M12 6C11 6 10 7 10 8C10 9 11 10 12 10C13 10 14 9 14 8C14 7 13 6 12 6Z';
            break;
        case 'Rook':
            // Castle turret icon
            pathData = 'M4 4H20V6H18V20H6V6H4V4ZM6 6V4H8V6H6ZM10 6V4H14V6H10ZM16 6V4H18V6H16Z';
            break;
        case 'Bishop':
            // Bishop's miter/hat icon
            pathData = 'M12 2C10 2 8 4 8 6V18H16V6C16 4 14 2 12 2ZM12 2V10M6 18V22H18V18H6Z';
            break;
        case 'Knight':
            // Horse head icon (simplified)
            pathData = 'M10 2C8 2 6 4 6 6V10H8V6C8 5 9 4 10 4H14V6H16V10H18V6C18 4 16 2 14 2H10ZM6 10V22H18V10H6Z M10 10L12 12L10 14L12 16L10 18L12 20L10 22';
            break;
        case 'Pawn':
            // Simple circle on a base
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


// ResultScreen component displays the player's selections
function ResultScreen({ playerSelections, onPlayAgain, onStartStrategyTest }) { // Added onStartStrategyTest prop
    // Define the desired display order for chess pieces
    const pieceDisplayOrder = ['King', 'Queen', 'Rook', 'Bishop', 'Knight', 'Pawn'];

    // Sort playerSelections based on the defined pieceDisplayOrder
    const sortedPlayerSelections = [...playerSelections].sort((a, b) => {
        const pieceA = findQuestionById(a.questionId)?.piece;
        const pieceB = findQuestionById(b.questionId)?.piece;

        const indexA = pieceDisplayOrder.indexOf(pieceA);
        const indexB = pieceDisplayOrder.indexOf(pieceB);

        // Handle cases where a piece might not be found (shouldn't happen with valid data)
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1; // Put unknown pieces at the end
        if (indexB === -1) return -1; // Put unknown pieces at the end

        return indexA - indexB;
    });

    return (
        <> {/* Use a React Fragment to return multiple top-level elements */}
            <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-4xl w-full text-center sm:border-4 mb-8"
                 style={{ borderColor: succinctColors.green }}> {/* Apply border only on sm and above */}
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6" style={{ color: succinctColors.green }}>
                    Challenge Complete!
                </h2>
                <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-8">
                    You've completed the Succinct Chess Challenge!
                </p>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4" style={{ color: succinctColors.blue }}>
                    MY BEST CHESSGAME CHARACTERS:
                </h3>
                {/* Updated grid to display 4 items in a row on medium and large screens */}
                <div className="pfp-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-6 justify-items-center mb-8">
                    {sortedPlayerSelections.map((selection, index) => {
                        // Use the helper function to find the question details
                        const question = findQuestionById(selection.questionId);
                        const selectedMember = allMembers.find(m => m.id === selection.selectedMemberId);

                        // Only render if a member was selected for this question
                        if (!selectedMember) return null;

                        return (
                            <div
                                key={index}
                                className="pfp-card relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden
                                           flex flex-col items-center justify-center p-1.5 shadow-lg"
                                style={{
                                    backgroundImage: `linear-gradient(45deg, ${succinctColors.purple}, ${succinctColors.pink})`, // Gradient border effect
                                    boxShadow: `0 8px 20px -5px ${succinctColors.pink}50`
                                }}
                            >
                                <div className="w-full h-full rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                                    <img
                                        src={selectedMember?.img}
                                        alt={selectedMember?.name}
                                        className="w-full h-full object-cover rounded-xl"
                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/90x90/CCCCCC/000000?text=${selectedMember?.name.charAt(0)}`; }}
                                    />
                                </div>
                                {/* Chess piece name displayed at the top with icon */}
                                <p className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-sm sm:text-base md:text-lg font-semibold bg-gray-900 bg-opacity-70 px-2 py-0.5 rounded-md uppercase flex items-center whitespace-nowrap">
                                    {getPieceIcon(question?.piece, 'white', '1em')} {/* Icon with white color and adjusted size */}
                                    {question?.piece || 'Role'}
                                </p>
                                <p className="absolute bottom-1 text-white text-xs sm:text-sm md:text-base font-semibold bg-gray-900 bg-opacity-70 px-2 py-0.5 rounded-md">
                                    {selectedMember?.name || 'N/A'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Button to start strategy test */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md justify-center">
                <button
                    onClick={onStartStrategyTest}
                    className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    style={{
                        backgroundColor: succinctColors.orange,
                        color: 'white',
                        boxShadow: `0 8px 20px -5px ${succinctColors.orange}80`
                    }}
                >
                    Test Your Strategy
                </button>
            </div>
        </>
    );
}

export default ResultScreen;

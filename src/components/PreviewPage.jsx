import React, { useState } from 'react';

// Succinct color palette for consistent styling
const succinctColors = {
    purple: '#B753FF',
    orange: '#FF955E',
    green: '#B0FF6F',
    blue: '#61C3FF',
    pink: '#FF54D7',
};

// PreviewPage component allows players to select the number of each chess piece
function PreviewPage({ onStartGame }) {
    // State to manage the count of each chess piece
    const [pieceCounts, setPieceCounts] = useState({
        Rook: 2,
        Bishop: 2,
        Knight: 2,
        Pawn: 8,
    });

    /**
     * Handles the change in count for a specific piece type.
     * @param {string} pieceType - The type of chess piece (e.g., 'Rook', 'Pawn').
     * @param {number} value - The new count value.
     */
    const handleCountChange = (pieceType, value) => {
        setPieceCounts(prevCounts => ({
            ...prevCounts,
            [pieceType]: Math.max(0, Math.min(pieceLimits[pieceType], value)), // Ensure value is within limits
        }));
    };

    // Define limits for each piece type
    const pieceLimits = {
        Rook: 2,
        Bishop: 2,
        Knight: 2,
        Pawn: 8,
    };

    return (
        <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full text-center sm:border-4"
             style={{ borderColor: succinctColors.orange }}> {/* Apply border only on sm and above */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4" style={{ color: succinctColors.orange }}>
                Succinct Chess Challenge
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8">
                Select the number of each chess piece to form your team. Each piece represents a unique role within the Succinct community!
            </p>

            {/* Piece selection controls */}
            <div className="space-y-4 mb-8">
                {Object.entries(pieceCounts).map(([pieceType, count]) => (
                    <div key={pieceType} className="flex items-center justify-between bg-gray-800 p-3 rounded-xl">
                        <span className="text-lg sm:text-xl font-semibold" style={{ color: succinctColors.blue }}>
                            {pieceType}s:
                        </span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleCountChange(pieceType, count - 1)}
                                className="px-3 py-1 text-base sm:text-lg font-bold rounded-md"
                                style={{ backgroundColor: succinctColors.pink, color: 'white' }}
                            >
                                -
                            </button>
                            <span className="text-lg sm:text-xl text-white w-8 text-center">{count}</span>
                            <button
                                onClick={() => handleCountChange(pieceType, count + 1)}
                                className="px-3 py-1 text-base sm:text-lg font-bold rounded-md"
                                style={{ backgroundColor: succinctColors.green, color: 'white' }}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Start Game Button */}
            <button
                onClick={() => onStartGame(pieceCounts)}
                className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                style={{
                    backgroundColor: succinctColors.purple,
                    color: 'white',
                    boxShadow: `0 8px 20px -5px ${succinctColors.purple}80`
                }}
            >
                Start Challenge
            </button>
        </div>
    );
}

export default PreviewPage;

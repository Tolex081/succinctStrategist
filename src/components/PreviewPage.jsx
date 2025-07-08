import React, { useState } from 'react';

// Succinct color palette for consistent styling
const succinctColors = {
    purple: '#B753FF',
    orange: '#FF955E',
    green: '#B0FF6F',
    blue: '#61C3FF',
    pink: '#FF54D7',
};

// PreviewPage component displays game instructions and a start button
function PreviewPage({ onStartGame }) {
    // State to hold the player's selections for each piece type
    const [pieceCounts, setPieceCounts] = useState({
        King: 1,    // King is always 1
        Queen: 1,   // Queen is always 1
        Rook: 2,    // Default 2 Rooks
        Bishop: 2,  // Default 2 Bishops
        Knight: 2,  // Default 2 Knights
        Pawn: 5,    // Default 5 Pawns
    });

    /**
     * Handles changes in the number input fields for piece counts.
     * @param {Event} e - The change event from the input.
     */
    const handleCountChange = (e) => {
        const { name, value } = e.target;
        // Ensure the value is a number and within a reasonable range (e.g., 0-5 for Rooks/Bishops/Knights, 0-8 for Pawns)
        const numValue = Math.max(0, parseInt(value, 10) || 0); // Ensure non-negative integer
        setPieceCounts(prevCounts => ({
            ...prevCounts,
            [name]: numValue,
        }));
    };

    /**
     * Starts the game with the selected piece counts.
     */
    const startGameWithCounts = () => {
        onStartGame(pieceCounts);
    };

    return (
        <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full text-center border-4"
             style={{ borderColor: succinctColors.purple }}>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6" style={{ color: succinctColors.blue }}>
                Succinct Chess Strategist
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-6 leading-relaxed">
               Welcome Strategist! In this challenge, you’ll match chess pieces to key members of the Succinct community based on their roles and traits. Make sure to test your Strategy
            </p>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
                To begin, choose how many Rooks, Bishops, Knights, and Pawns you want to play with. The King and Queen are always included in your challenge.
            </p>

            {/* Piece Selection Inputs */}
            <div className="mb-8 grid grid-cols-2 gap-4 text-gray-200">
                {['Rook', 'Bishop', 'Knight', 'Pawn'].map(piece => (
                    <div key={piece} className="flex items-center justify-between bg-gray-800 p-3 rounded-xl shadow-md">
                        <label htmlFor={`num${piece}`} className="text-lg font-semibold">{piece}s:</label>
                        <input
                            type="number"
                            id={`num${piece}`}
                            name={piece}
                            min="0"
                            // Max based on available questions in gameData.js
                            max={piece === 'Pawn' ? 5 : 2} // Max 5 pawns, max 2 for others (based on current gameData)
                            value={pieceCounts[piece]}
                            onChange={handleCountChange}
                            className="w-20 p-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2"
                            style={{ borderColor: succinctColors.orange, focusRingColor: succinctColors.orange }}
                        />
                    </div>
                ))}
            </div>

            <button
                onClick={startGameWithCounts}
                className="px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                style={{
                    backgroundColor: succinctColors.orange,
                    color: 'white',
                    boxShadow: `0 8px 20px -5px ${succinctColors.orange}80` // Subtle shadow for button
                }}
            >
                Start Challenge
            </button>
        </div>
    );
}

export default PreviewPage;

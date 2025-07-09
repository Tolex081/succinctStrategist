import React, { useState, useEffect } from 'react';
import PreviewPage from './components/PreviewPage';
import GamePage from './components/GamePage';
import ResultScreen from './components/ResultScreen';
import StrategyTestPage from './components/StrategyTestPage';
import { baseGameQuestions, allMembers } from './components/gameData';

// Succinct color palette for consistent styling
const succinctColors = {
    purple: '#B753FF',
    orange: '#FF955E',
    green: '#B0FF6F',
    blue: '#61C3FF',
    pink: '#FF54D7',
    redNeon: '#FF073A', // Red neon for failure
    greenNeon: '#39FF14', // Green neon for success
    yellowBadge: '#FFD700', // Gold color for badge
};

// Main App component responsible for managing game flow and background
function App() {
    // State to manage which screen is currently visible: 'preview', 'game', 'results', or 'strategyTest'
    const [currentPage, setCurrentPage] = useState('preview');
    // State to store the dynamically generated questions for the current game session
    const [gameQuestionsForSession, setGameQuestionsForSession] = useState([]);
    // State to store the player's selections for each chess piece
    // Each item: { questionId: string, selectedMemberId: string | null }
    const [playerSelections, setPlayerSelections] = useState([]);
    // State to track the current question being displayed in GamePage
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // State to store the final score of the strategy test
    const [strategyTestScore, setStrategyTestScore] = useState(0);
    // State to store the total number of strategy test questions
    const [totalStrategyQuestions, setTotalStrategyQuestions] = useState(0);

    // Removed useEffect for loading saved selections from local storage on initial mount
    // Removed useEffect for saving selections to local storage

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
     * Generates the list of questions for the game session based on player's piece count selections.
     * @param {object} pieceCounts - An object containing the desired count for each piece type.
     * @returns {Array} An array of question objects for the current game.
     */
    const generateGameQuestions = (pieceCounts) => {
        let generatedQuestions = [];

        // Always include King and Queen
        if (baseGameQuestions.King && baseGameQuestions.King.length > 0) {
            generatedQuestions.push(baseGameQuestions.King[0]);
        }
        if (baseGameQuestions.Queen && baseGameQuestions.Queen.length > 0) {
            generatedQuestions.push(baseGameQuestions.Queen[0]);
        }

        // Add selected number of Rooks, Bishops, Knights, and Pawns
        ['Rook', 'Bishop', 'Knight', 'Pawn'].forEach(pieceType => {
            const count = pieceCounts[pieceType] || 0;
            const availableQuestions = baseGameQuestions[pieceType] || [];
            // Take a slice of available questions up to the requested count, and shuffle them
            const selectedPieceQuestions = shuffleArray(availableQuestions).slice(0, count);
            generatedQuestions = generatedQuestions.concat(selectedPieceQuestions);
        });

        // Shuffle the entire set of generated questions to randomize order
        return shuffleArray(generatedQuestions);
    };

    /**
     * Handles the start of the game from the PreviewPage.
     * @param {object} pieceCounts - The counts of each chess piece selected by the player.
     */
    const handleStartGame = (pieceCounts) => {
        // Removed localStorage.removeItem('succinctChessSelections');
        const questions = generateGameQuestions(pieceCounts);
        setGameQuestionsForSession(questions);

        // Initialize player selections with null for each question
        const initialSelections = questions.map(q => ({
            questionId: q.id,
            selectedMemberId: null,
        }));
        setPlayerSelections(initialSelections);
        setCurrentQuestionIndex(0); // Start from the first question
        setCurrentPage('game'); // Navigate to the game page
    };

    /**
     * Handles a player's selection for a specific question.
     * @param {string} questionId - The ID of the question being answered.
     * @param {string} memberId - The ID of the member selected by the player.
     */
    const handleSelection = (questionId, memberId) => {
        setPlayerSelections(prevSelections =>
            prevSelections.map(selection =>
                selection.questionId === questionId
                    ? { ...selection, selectedMemberId: memberId }
                    : selection
            )
        );
    };

    /**
     * Handles the completion of the main game (chess character selection).
     * Transitions to the results page where the "Test Your Strategy" button will be.
     */
    const handleGameComplete = () => {
        setCurrentPage('results');
    };

    /**
     * Handles the start of the strategy test.
     */
    const handleStartStrategyTest = () => {
        setCurrentPage('strategyTest');
    };

    /**
     * Handles the completion of the strategy test.
     * @param {number} score - The final score from the strategy test.
     * @param {number} totalQuestions - The total number of questions in the strategy test.
     */
    const handleStrategyTestComplete = (score, totalQuestions) => {
        setStrategyTestScore(score);
        setTotalStrategyQuestions(totalQuestions);
        setCurrentPage('strategyTestResults'); // A new state to display test outcome
    };

    /**
     * Renders the appropriate page based on the currentPage state.
     */
    const renderPage = () => {
        switch (currentPage) {
            case 'preview':
                return <PreviewPage onStartGame={handleStartGame} />;
            case 'game':
                return (
                    <GamePage
                        questions={gameQuestionsForSession}
                        members={allMembers}
                        playerSelections={playerSelections}
                        onSelection={handleSelection}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        onGameComplete={handleGameComplete} // Changed to handleGameComplete
                    />
                );
            case 'results':
                return (
                    <ResultScreen
                        playerSelections={playerSelections}
                        onPlayAgain={() => setCurrentPage('preview')}
                        onStartStrategyTest={handleStartStrategyTest} // New prop
                    />
                );
            case 'strategyTest':
                return (
                    <StrategyTestPage
                        playerSelections={playerSelections}
                        onTestComplete={handleStrategyTestComplete}
                    />
                );
            case 'strategyTestResults':
                let message = '';
                let messageColor = '';
                let icon = null;
                let borderColor = '';

                if (strategyTestScore === totalStrategyQuestions) {
                    message = 'Community Banger! Congratulations, you are a good strategist!';
                    messageColor = succinctColors.greenNeon;
                    icon = <CrownIcon color={messageColor} size="1.5em" />;
                    borderColor = succinctColors.greenNeon;
                } else if (strategyTestScore >= totalStrategyQuestions * 0.6) { // 3/5 to 4/5 (60% to 80%)
                    message = 'Solid effort! You\'re on your way to becoming a strategic master.';
                    messageColor = succinctColors.yellowBadge;
                    icon = <BadgeIcon color={messageColor} size="1.5em" />;
                    borderColor = succinctColors.yellowBadge;
                } else { // 2/5 down
                    message = 'Bruhh, you need to restrategize!';
                    messageColor = succinctColors.redNeon;
                    icon = null; // No icon for low score
                    borderColor = succinctColors.redNeon;
                }

                return (
                    <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full text-center sm:border-4"
                         style={{ borderColor: borderColor }}> {/* Apply border only on sm and above */}
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6" style={{ color: messageColor }}>
                            {icon}
                            {message}
                        </h2>
                        <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-8">
                            You scored {strategyTestScore} out of {totalStrategyQuestions} in the Strategy Test.
                        </p>
                        <button
                            onClick={() => setCurrentPage('preview')}
                            className="px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            style={{
                                backgroundColor: succinctColors.blue,
                                color: 'white',
                                boxShadow: `0 8px 20px -5px ${succinctColors.blue}80`
                            }}
                        >
                            Play Again
                        </button>
                    </div>
                );
            default:
                return <PreviewPage onStartGame={handleStartGame} />;
        }
    };

    return (
        // Main container for the application, centered on the screen
        <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-4 md:p-8">
            {/* Game content rendered here */}
            {renderPage()}
        </div>
    );
}

// SVG Crown Icon component (moved here for App.js to use it)
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

// SVG Badge Icon component
const BadgeIcon = ({ color = 'currentColor', size = '1em' }) => (
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
        <path d="M12 2L9 4L6 2L3 4L6 6L3 8L6 10L9 8L12 10L15 8L18 10L21 8L18 6L21 4L18 2L15 4L12 2Z M12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12Z M12 16V22 M9 19H15" />
    </svg>
);

export default App;

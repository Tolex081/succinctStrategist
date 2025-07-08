import React, { useState, useEffect } from 'react';
import PreviewPage from './components/PreviewPage';
import GamePage from './components/GamePage';
import ResultScreen from './components/ResultScreen';
import StrategyTestPage from './components/StrategyTestPage'; // New import
import { baseGameQuestions, allMembers } from './components/gameData';

// Succinct color palette for consistent styling (added to App.js)
const succinctColors = {
    purple: '#B753FF',
    orange: '#FF955E',
    green: '#B0FF6F',
    blue: '#61C3FF',
    pink: '#FF54D7',
    redNeon: '#FF073A', // Red neon for failure
    greenNeon: '#39FF14', // Green neon for success
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


    // Effect to load saved selections from local storage on initial mount
    useEffect(() => {
        const savedSelections = localStorage.getItem('succinctChessSelections');
        if (savedSelections) {
            try {
                const parsedSelections = JSON.parse(savedSelections);
                if (Array.isArray(parsedSelections) && parsedSelections.length > 0) {
                    setPlayerSelections(parsedSelections);
                    setCurrentPage('results'); // Go directly to results if saved data exists
                }
            } catch (e) {
                console.error("Failed to parse saved selections from local storage:", e);
                localStorage.removeItem('succinctChessSelections'); // Clear corrupted data
            }
        }
    }, []); // Empty dependency array means this runs once on mount

    // Effect to save selections to local storage when playerSelections changes and on results screen
    useEffect(() => {
        // Only save if we are on the results page (after the main game, before strategy test)
        // or if the strategy test has just completed.
        if (currentPage === 'results' && playerSelections.length > 0) {
            localStorage.setItem('succinctChessSelections', JSON.stringify(playerSelections));
        }
    }, [currentPage, playerSelections]);

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
        localStorage.removeItem('succinctChessSelections'); // Clear previous selections for a new game
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
                const isSuccess = strategyTestScore >= totalStrategyQuestions / 2; // Example success condition
                const message = isSuccess
                    ? ' Banger! Congratulations, you are a good strategist!'
                    : 'Bruhh, you need to restrategize!';
                const messageColor = isSuccess ? succinctColors.greenNeon : succinctColors.redNeon; // Use succinctColors here

                return (
                    <div className="bg-gray-900 bg-opacity-80 rounded-3xl shadow-2xl p-6 md:p-10 max-w-2xl w-full text-center border-4"
                         style={{ borderColor: messageColor }}>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-6" style={{ color: messageColor }}>
                            {message}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8">
                            You scored {strategyTestScore} out of {totalStrategyQuestions} in the Strategy Test.
                        </p>
                        <button
                            onClick={() => setCurrentPage('preview')}
                            className="px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
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

export default App;

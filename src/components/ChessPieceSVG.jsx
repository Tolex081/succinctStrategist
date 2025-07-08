import React from 'react';

// ChessPieceSVG component renders an SVG chess piece based on the 'piece' prop.
// It also applies a rotation animation class.
function ChessPieceSVG({ piece, className, style }) {
    // Function to render the SVG path data for each chess piece.
    // These are simplified SVG paths for visual representation.
    const renderPiecePath = () => {
        switch (piece) {
            case 'King':
                return (
                    <path d="M10 30 L10 10 C10 5 20 5 20 10 L20 30 L25 30 L25 35 L5 35 L5 30 Z M15 5 L15 25 M5 15 L25 15" stroke="currentColor" strokeWidth="2" fill="none" />
                );
            case 'Queen':
                return (
                    <path d="M15 5 L10 15 L20 15 L15 5 Z M10 15 L10 30 C10 35 20 35 20 30 L20 15 M5 30 L25 30 L25 35 L5 35 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                );
            case 'Rook':
                return (
                    <path d="M5 5 L25 5 L25 10 L20 10 L20 35 L10 35 L10 10 L5 10 Z M5 5 L5 10 M10 5 L10 10 M15 5 L15 10 M20 5 L20 10 M25 5 L25 10" stroke="currentColor" strokeWidth="2" fill="none" />
                );
            case 'Bishop':
                return (
                    <path d="M15 5 C10 10 10 20 15 25 C20 20 20 10 15 5 Z M15 25 L15 35 L10 35 L20 35 Z M15 5 L15 10" stroke="currentColor" strokeWidth="2" fill="none" />
                );
            case 'Knight':
                return (
                    <path d="M10 10 C10 5 15 5 15 10 C15 15 10 15 10 10 Z M15 10 L20 15 L20 25 L15 30 L10 30 L10 20 L5 20 L5 25 L10 30 L10 35 L20 35 L20 30 L15 30 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                );
            case 'Pawn':
                return (
                    <path d="M15 5 C10 10 10 15 15 20 C20 15 20 10 15 5 Z M15 20 L15 35 L10 35 L20 35 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                );
            default:
                return null;
        }
    };

    return (
        <svg
            viewBox="0 0 30 40" // Adjusted viewBox for better scaling
            className={className}
            style={style}
            xmlns="http://www.w3.org/2000/svg"
        >
            {renderPiecePath()}
        </svg>
    );
}

export default ChessPieceSVG;

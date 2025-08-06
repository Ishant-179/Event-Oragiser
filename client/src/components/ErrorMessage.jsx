import React from 'react';
import { Frown } from 'lucide-react';

const ErrorMessage = ({ title, message, buttonText, onButtonClick }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-white text-center w-full max-w-sm">
                <div className="flex justify-center mb-4">
                    <Frown className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-xl font-bold mb-4">{title}</p>
                <p className="text-gray-400 mb-6">{message}</p>
                <button
                    onClick={onButtonClick}
                    className="mt-4 px-6 py-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default ErrorMessage;
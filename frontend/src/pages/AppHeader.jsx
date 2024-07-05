import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';

function AppHeader() {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 shadow-md rounded-lg mt-1 mb-4 ml-2 mr-8 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-4">
                        <span className="text-white text-xl font-bold">QuizAI</span>
                        <nav className="hidden md:flex space-x-1">
                            <button onClick={() => handleNavigation("/MyQuizzes")} className="px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition duration-300">My Quizzes</button>
                            <button onClick={() => handleNavigation("/take-a-quiz")} className="px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition duration-300">Take a Quiz</button>
                            <button onClick={() => handleNavigation("/take-a-quiz")} className="px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition duration-300">Practice Quiz</button>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button
                                onClick={handleProfileClick}
                                className="flex items-center space-x-2 text-white hover:text-gray-300 transition duration-300"
                            >
                                <User size={18} />
                                <span className="hidden md:inline">Profile</span>
                            </button>
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 overflow-hidden">
                                    <ProfileOption onClick={() => navigate("/profile")}>
                                        <User size={16} />
                                        <span>My Profile</span>
                                    </ProfileOption>
                                    <ProfileOption onClick={handleLogout}>
                                        <LogOut size={16} />
                                        <span>Logout</span>
                                    </ProfileOption>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white hover:text-gray-300 transition duration-300"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-900">
                    <nav className="flex flex-col p-2 space-y-1">
                        <button onClick={() => handleNavigation("/MyQuizzes")} className="text-left px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition duration-300">My Quizzes</button>
                        <button onClick={() => handleNavigation("/take-a-quiz")} className="text-left px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition duration-300">Take a Quiz</button>
                        <button onClick={() => handleNavigation("/take-a-quiz")} className="text-left px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition duration-300">Practice Quiz</button>
                    </nav>
                </div>
            )}
        </header>
    );
}

const ProfileOption = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
    >
        {children}
    </button>
);

export default AppHeader;
import React, { useState, useEffect } from 'react';
import { accounts } from './accountData';
import { translations } from './translations';
import BankLogo from './components/BankLogo';

const SuccessPopup = ({ show, number, t }) => (
  <div className={`
    fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2
    bg-white text-green-600 px-4 sm:px-6 py-2 sm:py-3
    rounded-md shadow-md text-center
    transition-all duration-300
    ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
    max-w-xs sm:max-w-sm md:max-w-md mx-auto
  `}>
    <div className="flex items-center justify-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${show ? 'rotate-0' : '-rotate-90'}`}
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span className="text-sm sm:text-base">
        {t.copied} <span className="font-semibold text-gray-700 break-all">{number}</span>
      </span>
    </div>
    <div className="absolute -inset-0.5 bg-green-100 rounded-md -z-10 animate-pulse"></div>
  </div>
);

const ColorModeIcon = ({ isDark }) => (
  isDark ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  )
);

function App() {
  const [copiedNumber, setCopiedNumber] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [language, setLanguage] = useState('id');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const t = translations[language];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedNumber(text);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    });
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      const order = ['id', 'en', 'zh', 'ja'];
      const currentIndex = order.indexOf(prev);
      return order[(currentIndex + 1) % order.length];
    });
  };

  const toggleColorMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const getLanguageDisplay = (lang) => {
    const displayMap = {
      'id': 'ID',
      'en': 'EN',
      'zh': 'ZH',
      'ja': 'JA'
    };
    return displayMap[lang] || lang.toUpperCase();
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-blue-200'} flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-figtree`}>
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto`}>
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{t.title}</h1>
        <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 sm:mb-8 text-sm`}>{t.subtitle}</p>
       
        <div className="space-y-3 sm:space-y-4">
          {accounts.map((account, index) => (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} p-3 sm:p-4 rounded-md flex items-center justify-between cursor-pointer transition duration-300`}
              onClick={() => copyToClipboard(account.number)}
            >
              <div className="flex items-center flex-grow">
                <BankLogo svg={account.svg} />
                <div className="ml-3 sm:ml-4 flex-grow">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} text-sm sm:text-base`}>{account.bank}</p>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm no-underline`}>{account.number}</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 sm:h-6 sm:w-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          ))}
        </div>
        <footer className={`mt-8 mb-2 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
            {t.footer}
          </p>
        </footer>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        <button 
          onClick={toggleColorMode} 
          className={`w-10 h-10 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} hover:bg-opacity-80 transition-colors shadow-md flex items-center justify-center`}
          aria-label="Toggle color mode"
        >
          <ColorModeIcon isDark={isDarkMode} />
        </button>
        <button 
          onClick={toggleLanguage} 
          className={`w-10 h-10 rounded-md ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} hover:bg-opacity-80 transition-colors shadow-md flex items-center justify-center font-semibold`}
          aria-label="Toggle language"
        >
          {getLanguageDisplay(language)}
        </button>
      </div>
      <SuccessPopup show={showPopup} number={copiedNumber} t={t} />
    </div>
  );
}

export default App;
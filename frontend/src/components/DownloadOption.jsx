import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';

const DownloadButton = ({ questions, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = (format = 'json') => {
    const filteredQuestions = questions.map(q => ({
      questionText: q.questionText,
      options: q.options,
      correctAnswerIndex: q.correctAnswerIndex,
      explanation: q.explanation
    }));
  
    let content, fileExtension, mimeType;
  
    switch (format) {
      case 'json':
        content = JSON.stringify(filteredQuestions, null, 2);
        fileExtension = 'json';
        mimeType = 'application/json';
        break;
      case 'txt':
        content = filteredQuestions.map(q => 
          `Question: ${q.questionText}\nOptions: ${q.options.join(', ')}\nCorrect Answer: ${q.options[q.correctAnswerIndex]}\nExplanation: ${q.explanation}\n\n`
        ).join('');
        fileExtension = 'txt';
        mimeType = 'text/plain';
        break;
      case 'pdf':
        alert('PDF generation requires additional setup. Please implement PDF generation separately.');
        return;
      default:
        console.error('Unsupported format');
        return;
    }
  
    const dataUri = `data:${mimeType};charset=utf-8,${encodeURIComponent(content)}`;
    const exportFileDefaultName = `${title || 'quiz'}_questions.${fileExtension}`;
  
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
      >
        <Download className="w-4 h-4 mr-2" />
        Download
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            {['json', 'txt'].map((format) => (
              <button
                key={format}
                onClick={() => handleDownload(format)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Download as {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
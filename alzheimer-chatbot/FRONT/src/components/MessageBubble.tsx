import React, { useState } from 'react';
import { Message, AIResponse, Evaluation } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/contexts/ChatContext';
import ConfirmationModal from './ConfirmationModal';
import EvaluationModal from './EvaluationModal';
import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { selectResponse, evaluateResponse } = useChat();
  const [selectedResponseForConfirmation, setSelectedResponseForConfirmation] = useState<AIResponse | null>(null);
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleResponseSelect = (response: AIResponse) => {
    setSelectedResponseForConfirmation(response);
    setCurrentMessageId(message.id);
  };

  const handleConfirmSelection = () => {
    if (selectedResponseForConfirmation) {
      selectResponse(currentMessageId, selectedResponseForConfirmation);
      setSelectedResponseForConfirmation(null);
      setShowEvaluationModal(true);
    }
  };

  const handleCancelSelection = () => {
    setSelectedResponseForConfirmation(null);
    setCurrentMessageId('');
  };

  const handleEvaluationSubmit = (evaluation: Evaluation) => {
    evaluateResponse(currentMessageId, evaluation);
    setShowEvaluationModal(false);
    setCurrentMessageId('');

    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 10000);
  };

  const handleEvaluationClose = () => {
    setShowEvaluationModal(false);
    setCurrentMessageId('');
  };

  if (message.sender === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-alois-blue text-white p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg">
          <p className="text-sm">{message.text}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start mb-4">
        <div className="bg-muted p-4 rounded-lg max-w-4xl w-full space-y-4">
          {message.evaluation ? (
            <div>
              <div className="text-sm mb-2 prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
              <div className="text-xs text-muted-foreground italic">
                Resposta registrada
              </div>
              {showSuccessMessage && (
                <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded text-xs">
                  Sua avaliação foi enviada. Obrigado!
                </div>
              )}
            </div>
          ) : message.selectedResponse ? (
            <div>
              <div className="text-sm mb-2 prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{message.selectedResponse.text}</ReactMarkdown>
              </div>
              <Badge variant="outline" className="text-xs">
                {message.selectedResponse.model}
              </Badge>
            </div>
          ) : message.responses ? (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground mb-3">
                Escolha a melhor resposta:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {message.responses.map((response) => (
                  <div key={response.id} className="border border-border rounded-lg p-3 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {response.model}
                      </Badge>
                    </div>
                    <div className="text-sm mb-3 flex-1 prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{response.text}</ReactMarkdown>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleResponseSelect(response)}
                      className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white text-xs mt-auto"
                    >
                      Selecionar esta resposta
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={!!selectedResponseForConfirmation}
        onConfirm={handleConfirmSelection}
        onCancel={handleCancelSelection}
      />

      <EvaluationModal
        isOpen={showEvaluationModal}
        onSubmit={handleEvaluationSubmit}
        onClose={handleEvaluationClose}
      />
    </>
  );
};

export default MessageBubble;

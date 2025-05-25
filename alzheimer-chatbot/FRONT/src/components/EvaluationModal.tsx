
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (evaluation: EvaluationData) => void;
}

interface EvaluationData {
  coherence: number;
  clarity: number;
  relevance: number;
  usefulness: number;
  trustworthiness: number;
  justification: string;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState({
    coherence: 0,
    clarity: 0,
    relevance: 0,
    usefulness: 0,
    trustworthiness: 0
  });
  const [justification, setJustification] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const criteria = [
    { key: 'coherence', label: 'Coerência' },
    { key: 'clarity', label: 'Clareza' },
    { key: 'relevance', label: 'Relevância' },
    { key: 'usefulness', label: 'Utilidade' },
    { key: 'trustworthiness', label: 'Confiabilidade' }
  ];

  const renderStars = (criteriaKey: keyof typeof ratings) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors ${
              Number(ratings[criteriaKey]) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRatings(prev => ({ ...prev, [criteriaKey]: star }))}
          />
        ))}
      </div>
    );
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    // Verificar se todos os critérios foram avaliados
    Object.entries(ratings).forEach(([key, value]) => {
      if (Number(value) === 0) {
        const criteriaLabel = criteria.find(c => c.key === key)?.label || key;
        newErrors.push(`Por favor, avalie o critério "${criteriaLabel}"`);
      }
    });
    
    // Verificar se a justificativa foi preenchida
    if (justification.trim().length === 0) {
      newErrors.push('A justificativa é obrigatória');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...ratings,
      justification: justification.trim()
    });

    // Reset form
    setRatings({
      coherence: 0,
      clarity: 0,
      relevance: 0,
      usefulness: 0,
      trustworthiness: 0
    });
    setJustification('');
    setErrors([]);
  };

  const handleClose = () => {
    // Reset form on close
    setRatings({
      coherence: 0,
      clarity: 0,
      relevance: 0,
      usefulness: 0,
      trustworthiness: 0
    });
    setJustification('');
    setErrors([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-[#9b87f5]">
            Avaliação da Resposta
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Mostrar erros se houver */}
          {errors.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <ul className="text-sm text-red-800 dark:text-red-400 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {criteria.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {label} <span className="text-red-500">*</span>
              </label>
              {renderStars(key as keyof typeof ratings)}
            </div>
          ))}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Justificativa <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Por favor, forneça uma justificativa para sua avaliação..."
              className="min-h-[80px]"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              Enviar Avaliação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluationModal;

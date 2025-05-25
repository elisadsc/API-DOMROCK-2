
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Confirmação
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-4">
          <p className="text-lg mb-6">
            Tem certeza de que esta é a melhor resposta para você?
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={onCancel}
              variant="outline"
              className="px-6"
            >
              Cancelar
            </Button>
            <Button 
              onClick={onConfirm}
              className="bg-alois-blue hover:bg-alois-blue-dark text-white px-6"
            >
              Sim, avaliar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;

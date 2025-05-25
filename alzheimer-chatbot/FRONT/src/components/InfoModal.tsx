
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-alois-blue">
            Como usar o ALOIS CHAT
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">🔹 Como fazer perguntas:</h3>
            <p>Digite sua pergunta no campo de entrada na parte inferior e clique em "Enviar" ou pressione Enter.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">🔹 Escolhendo respostas:</h3>
            <p>O ALOIS gerará duas respostas diferentes usando modelos de IA distintos. Selecione a resposta que considera melhor para sua pergunta.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">🔹 Avaliação:</h3>
            <p>Após selecionar uma resposta, você poderá avaliá-la usando critérios como coerência, clareza, relevância, utilidade e confiabilidade. Suas avaliações ajudam a melhorar o sistema.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">🔹 Funcionalidades:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Modo claro/escuro: Use o ícone de lua/sol no cabeçalho</li>
              <li>Histórico: Acesse conversas anteriores pelo ícone de relógio</li>
              <li>Informações: Este modal com instruções</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button onClick={onClose} className="bg-alois-blue hover:bg-alois-blue-dark text-white">
            Entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;

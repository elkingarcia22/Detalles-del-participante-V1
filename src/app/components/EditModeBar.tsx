import React from 'react';
import { Save, X } from 'lucide-react';
import { Button } from './ui/button';

interface EditModeBarProps {
  onSave: () => void;
  onCancel: () => void;
}

export function EditModeBar({ onSave, onCancel }: EditModeBarProps) {
  return (
    <div className="pointer-events-auto max-w-full">
      <div className="bg-blue-600 border border-blue-500 shadow-2xl rounded-2xl backdrop-blur-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Modo de edición activo</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                className="bg-white hover:bg-gray-100 text-gray-700 border-gray-200"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                className="bg-white hover:bg-gray-50 text-blue-600 font-semibold"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar cambios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

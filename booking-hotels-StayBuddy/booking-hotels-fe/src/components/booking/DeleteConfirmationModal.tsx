"use client";
import { useClientTranslation } from '@/i18n/client';
import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { t } = useClientTranslation('Common');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{t("dashboard.confirmDelete.title01")}</h3>
        <p className="text-gray-600 mb-6">{t("dashboard.confirmDelete.title02")}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={onClose}
          >
            {t("dashboard.confirmDelete.title03")}
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            {t("dashboard.confirmDelete.title04")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

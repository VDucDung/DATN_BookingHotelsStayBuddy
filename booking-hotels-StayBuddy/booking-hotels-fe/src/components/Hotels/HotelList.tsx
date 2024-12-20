/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import HotelCreateModal from "./HotelCreateModal";
import HotelEditModal from "./HotelEditModal";
import { createHotel, updateHotel, findHotelByPartnerId, deleteHotel } from "@/api/dashboarService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Hotel, HotelDto } from "@/interfaces";
import HotelCard from "./HotelCard";
import { toast } from "react-toastify";
import HotelDeleteModal from "./HotelDeleteModal";
import { useClientTranslation } from "@/i18n/client";

const HotelList: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const { t } = useClientTranslation('Common');

  const queryClient = useQueryClient();

  const { data: hotels, error } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => findHotelByPartnerId(),
  });

  const createHotelMutation = useMutation({
    mutationFn: ({ hotelData }: { hotelData: HotelDto }) => createHotel(hotelData),
    onSuccess: () => {
      toast.success('Created hotel successfully!');
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error) => {
      console.error('Create failed:', error);
      toast.error('Failed to create hotel.');
    },
  });

  const updateHotelMutation = useMutation({
    mutationFn: ({ hotelId, hotelData }: { hotelId: number, hotelData: HotelDto }) => updateHotel(hotelId, hotelData),
    onSuccess: (response) => {
      if(response){
        toast.success('Hotel updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['hotels'] });
      }
    },
    onError: (error) => {
      console.error('Update failed:', error);
      toast.error('Failed to update hotel.');
    },
  });

  const deleteHotelMutation = useMutation({
    mutationFn: ({ hotelId }: { hotelId: number }) => deleteHotel(hotelId),
    onSuccess: (response) => {
      if(response){
        toast.success('Hotel updated successfully!');
        queryClient.invalidateQueries({ queryKey: ['hotels'] });
      }
    },
    onError: (error) => {
      console.error('Update failed:', error);
      toast.error('Failed to update hotel.');
    },
  });

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowEditModal(true);
  };

  const handleCreateHotel = (hotelData: HotelDto) => {
    createHotelMutation.mutate({ hotelData });
    setShowCreateModal(false);
  };

  const handleUpdateHotel = (hotelId: number, updatedHotel: HotelDto) => {
    updateHotelMutation.mutate({ hotelId, hotelData: updatedHotel });
    setShowEditModal(false);
  };

  const handleDeleteHotel = (hotelId: number) => {
    setSelectedHotel(hotels?.find((hotel) => hotel.id === hotelId) || null);
    setShowDeleteModal(true);
  };

  const confirmDeleteHotel = () => {
    if (selectedHotel) {
      deleteHotelMutation.mutate({ hotelId: selectedHotel.id });
      setShowDeleteModal(false);
    }
  };

  if (error) {
    return (
      <div className="text-center py-10 text-gray-500">
        No hotel data.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t("dashboard.hotel.title01")}</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          <span>{t("dashboard.hotel.title02")}</span>
        </button>
      </div>

      {hotels && hotels.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel: any, idx: number) => (
            <HotelCard
              key={idx}
              hotel={hotel}
              onEdit={() => handleEditHotel(hotel)}
              onDelete={() => handleDeleteHotel(hotel.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No other hotels have been added
        </div>
      )}

      {showCreateModal && (
        <HotelCreateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateHotel}
        />
      )}

      {showEditModal && selectedHotel && (
        <HotelEditModal
          hotel={selectedHotel}
          onClose={() => setShowEditModal(false)}
          onEdit={handleUpdateHotel}
        />
      )}

      {showDeleteModal && (
        <HotelDeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteHotel}
        />
      )}
    </div>
  );
};

export default HotelList;

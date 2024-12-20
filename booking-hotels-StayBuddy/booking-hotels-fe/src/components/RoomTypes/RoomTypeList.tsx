// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from 'react';
// import { Bed, Plus, Edit, Trash2, Tag } from 'lucide-react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import RoomTypeCreateModal from './RoomTypeCreateModal';
// import { createTypeRoomByPartnerId, deleteTypeRoomByPartnerId, findTypeRoomByPartnerId, updateTypeRoomByPartnerId } from '@/api/dashboarService';
// import { HotelData, RoomTypesData, TypeRoom, TypeRoomDto } from '@/interfaces/typeRoom';
// import { toast } from 'react-toastify';
// import queryClient from '@/reactQuery/reactQueryClient';
// import RoomTypeEditModal from './RoomTypeEditModal';
// import RoomTypeDeleteModal from './RoomTypeDeleteModal';

// const RoomTypeList: React.FC = () => {
//   const [activeCreateModal, setActiveCreateModal] = useState<number | null>(null);
//   const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false);
//   const [activeUpdateModal, setActiveUpdateModal] = useState<boolean>(false);
//   const [selectedRoomType, setSelectedRoomType] = useState<TypeRoomDto | null>(null);
//   const [confirmRoomType, setConfirmRoomType] = useState<TypeRoomDto>();

//   const {
//     data: roomTypesData,
//     error,
//     isLoading
//   } = useQuery({
//     queryKey: ["typeRooms"],
//     queryFn: () => findTypeRoomByPartnerId(),
//   });

//   const createTypeRoomMutation = useMutation({
//     mutationFn: ({ typeRoomData }: { typeRoomData: TypeRoomDto }) => createTypeRoomByPartnerId(typeRoomData),
//     onSuccess: () => {
//       toast.success('Created room type successfully!');
//       queryClient.invalidateQueries({ queryKey: ['typeRooms'] });
//     },
//     onError: () => {
//       toast.error('Failed to create hotel.');
//     },
//   });

//   const updateTypeRoomMutation = useMutation({
//     mutationFn: ({ typeRoomId, typeRoomData }: { typeRoomId: number, typeRoomData: TypeRoomDto }) => updateTypeRoomByPartnerId(typeRoomId, typeRoomData),
//     onSuccess: () => {
//       toast.success('Update room type successfully!');
//       setActiveUpdateModal(false);
//       queryClient.invalidateQueries({ queryKey: ['typeRooms'] });
//     },
//     onError: () => {
//       setActiveUpdateModal(false);
//       toast.error('Failed to create hotel.');
//     },
//   });

//   const deleteTypeRoomMutation = useMutation({
//     mutationFn: ({ typeRoomId }: { typeRoomId: number }) => deleteTypeRoomByPartnerId(typeRoomId),
//     onSuccess: () => {
//       toast.success('Delete room type successfully!');
//       queryClient.invalidateQueries({ queryKey: ['typeRooms'] });
//       setActiveDeleteModal(false);
//     },
//     onError: (error) => {
//       toast.error('Failed to delete room type.');
//       setActiveDeleteModal(false);
//     },
//   });

//   const groupedRoomTypes = React.useMemo(() => {
//     if (!roomTypesData) return [];
//     return Object.entries(roomTypesData);
//   }, [roomTypesData]);

//   const handleCreateRoomType = (typeRoomData: TypeRoomDto) => {
//     setActiveCreateModal(null);
//     createTypeRoomMutation.mutate({ typeRoomData });
//   };

//   const handleEditRoomType = (roomType: TypeRoom) => {
//     setActiveUpdateModal(true);
//     setSelectedRoomType({
//       id: roomType.id,
//       name: roomType.name,
//       description: roomType.description,
//       hotelId: roomType.hotelId
//     });
//   };

//   const handleUpdateRoomType = (updatedRoomType: TypeRoomDto) => {
//     if (updatedRoomType.id) {
//       const { id, ...restData } = updatedRoomType
//       updateTypeRoomMutation.mutate({
//         typeRoomId: updatedRoomType.id,
//         typeRoomData: restData
//       });
//     }
//   };
//   const handleDeleteRoomType = (typeRoomId: number) => {
//     const allTypeRooms = Object.values(roomTypesData)
//       .flatMap((hotel: any) => (hotel as HotelData).typeRooms);

//     const roomTypeToDelete = allTypeRooms.find((room: TypeRoomDto) => room.id === typeRoomId);

//     if (roomTypeToDelete) {
//       setConfirmRoomType(roomTypeToDelete);
//       setActiveDeleteModal(true);
//     }
//   };


//   const confirmDeleteRoomType = () => {
//     if (confirmRoomType?.id) {
//       deleteTypeRoomMutation.mutate({ typeRoomId: confirmRoomType.id });
//     }
//   };


//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6 text-center text-gray-500">
//         Loading room types...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6 text-center text-red-500">
//         Unable to load room type information.
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <Bed className="text-white" size={28} />
//               <h2 className="text-2xl font-bold text-white mb-0">Room Types</h2>
//             </div>
//             <button
//               onClick={() => setActiveCreateModal(null)}
//               className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
//             >
//               <Plus size={20} />
//               <span>Add Room Type</span>
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           {groupedRoomTypes.length === 0 && (
//             <div className="text-center text-gray-500 py-8">
//               No room types available. Add a new room type to get started.
//             </div>
//           )}

//           {groupedRoomTypes.map(([hotelId, hotelGroup]: [string, any]) => (
//             <div key={hotelId} className="mb-8">
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">
//                 {hotelGroup.hotelName}
//               </h3>

//               {hotelGroup.typeRooms.length === 0 && (
//                 <div className="text-center text-gray-500 py-4">
//                   {` No room types for this hotel. Click "Add Room Type" to create one.`}
//                 </div>
//               )}

//               {hotelGroup.typeRooms.map((roomType: TypeRoom) => (
//                 <div
//                   key={roomType.id}
//                   className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 mb-4"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-grow pr-4">
//                       <div className="flex items-center mb-2">
//                         <Tag className="mr-2 text-indigo-500" size={20} />
//                         <h3 className="text-xl font-semibold text-gray-800 mb-0">
//                           {roomType.name}
//                         </h3>
//                       </div>

//                       <p className="text-gray-600 mb-3">{roomType.description}</p>

//                       <div className="flex items-center space-x-4 mt-3">
//                         <div className="flex items-center">
//                           <span className="text-sm text-gray-500 mr-2">Created:</span>
//                           <span className="text-blue-600 font-bold">
//                             {new Date(roomType.createdAt).toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex flex-col space-y-2">
//                       <button
//                         onClick={() => handleEditRoomType(roomType)}
//                         className="flex items-center space-x-2 text-blue-600 hover:bg-blue-100 transition-colors px-3 py-2 rounded-lg"
//                       >
//                         <Edit size={16} />
//                         <span>Edit</span>
//                       </button>

//                       <button
//                         onClick={() => handleDeleteRoomType(roomType.id)}
//                         className="flex items-center space-x-2 text-red-600 hover:bg-red-100 transition-colors px-3 py-2 rounded-lg"
//                       >
//                         <Trash2 size={16} />
//                         <span>Delete</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       {activeCreateModal !== null && (
//         <RoomTypeCreateModal
//           onClose={() => setActiveCreateModal(null)}
//           onCreate={handleCreateRoomType}
//         />
//       )}

//       {selectedRoomType && activeUpdateModal && (
//         <RoomTypeEditModal
//           hotelId={Number(selectedRoomType?.hotelId)}
//           initialRoomType={selectedRoomType}
//           onClose={() => setActiveUpdateModal(false)}
//           onUpdate={handleUpdateRoomType}
//         />
//       )}

//       {activeDeleteModal && confirmRoomType && (
//         <RoomTypeDeleteModal
//           isOpen={activeDeleteModal}
//           onClose={() => setActiveDeleteModal(false)}
//           onConfirm={confirmDeleteRoomType}
//         />
//       )}
//     </div>
//   );
// };

// export default RoomTypeList;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Bed, Plus, Edit, Trash2, Tag } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import RoomTypeCreateModal from './RoomTypeCreateModal';
import { createTypeRoomByPartnerId, deleteTypeRoomByPartnerId, findTypeRoomByPartnerId, updateTypeRoomByPartnerId } from '@/api/dashboarService';
import { HotelData, RoomTypesData, TypeRoom, TypeRoomDto } from '@/interfaces/typeRoom';
import { toast } from 'react-toastify';
import queryClient from '@/reactQuery/reactQueryClient';
import RoomTypeEditModal from './RoomTypeEditModal';
import RoomTypeDeleteModal from './RoomTypeDeleteModal';

const RoomTypeList: React.FC = () => {
  const [activeCreateModal, setActiveCreateModal] = useState<boolean>(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState<boolean>(false);
  const [activeUpdateModal, setActiveUpdateModal] = useState<boolean>(false);
  const [selectedRoomType, setSelectedRoomType] = useState<TypeRoomDto | null>(null);
  const [confirmRoomType, setConfirmRoomType] = useState<TypeRoomDto>();

  const {
    data: roomTypesData,
    error,
    isLoading
  } = useQuery({
    queryKey: ["typeRooms"],
    queryFn: () => findTypeRoomByPartnerId(),
  });

  const createTypeRoomMutation = useMutation({
    mutationFn: ({ typeRoomData }: { typeRoomData: TypeRoomDto }) => createTypeRoomByPartnerId(typeRoomData),
    onSuccess: () => {
      toast.success('Created room type successfully!');
      queryClient.invalidateQueries({ queryKey: ['typeRooms'] });
    },
    onError: () => {
      toast.error('Failed to create hotel.');
    },
  });

  const updateTypeRoomMutation = useMutation({
    mutationFn: ({ typeRoomId, typeRoomData }: { typeRoomId: number, typeRoomData: TypeRoomDto }) => updateTypeRoomByPartnerId(typeRoomId, typeRoomData),
    onSuccess: () => {
      toast.success('Update room type successfully!');
      setActiveUpdateModal(false);
      queryClient.invalidateQueries({ queryKey: ['typeRooms'] });
    },
    onError: () => {
      setActiveUpdateModal(false);
      toast.error('Failed to create hotel.');
    },
  });

  const deleteTypeRoomMutation = useMutation({
    mutationFn: ({ typeRoomId }: { typeRoomId: number }) => deleteTypeRoomByPartnerId(typeRoomId),
    onSuccess: () => {
      toast.success('Delete room type successfully!');
      queryClient.invalidateQueries({ queryKey: ['typeRooms'] });
      setActiveDeleteModal(false);
    },
    onError: (error) => {
      toast.error('Failed to delete room type.');
      setActiveDeleteModal(false);
    },
  });

  const groupedRoomTypes = React.useMemo(() => {
    if (!roomTypesData) return [];
    return Object.entries(roomTypesData);
  }, [roomTypesData]);

  const handleCreateRoomType = (typeRoomData: TypeRoomDto) => {
    setActiveCreateModal(false);
    createTypeRoomMutation.mutate({ typeRoomData });
  };

  const handleEditRoomType = (roomType: TypeRoom) => {
    setActiveUpdateModal(true);
    setSelectedRoomType({
      id: roomType.id,
      name: roomType.name,
      description: roomType.description,
      hotelId: roomType.hotelId
    });
  };

  const handleUpdateRoomType = (updatedRoomType: TypeRoomDto) => {
    if (updatedRoomType.id) {
      const { id, ...restData } = updatedRoomType
      updateTypeRoomMutation.mutate({
        typeRoomId: updatedRoomType.id,
        typeRoomData: restData
      });
    }
  };
  const handleDeleteRoomType = (typeRoomId: number) => {
    const allTypeRooms = Object.values(roomTypesData)
      .flatMap((hotel: any) => (hotel as HotelData).typeRooms);

    const roomTypeToDelete = allTypeRooms.find((room: TypeRoomDto) => room.id === typeRoomId);

    if (roomTypeToDelete) {
      setConfirmRoomType(roomTypeToDelete);
      setActiveDeleteModal(true);
    }
  };


  const confirmDeleteRoomType = () => {
    if (confirmRoomType?.id) {
      deleteTypeRoomMutation.mutate({ typeRoomId: confirmRoomType.id });
    }
  };


  if (isLoading) {
    return (
      <div className="container mx-auto p-6 text-center text-gray-500">
        Loading room types...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center text-red-500">
        Unable to load room type information.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bed className="text-white" size={28} />
              <h2 className="text-2xl font-bold text-white mb-0">Room Types</h2>
            </div>
            <button
              onClick={() => setActiveCreateModal(true)}
              className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            >
              <Plus size={20} />
              <span>Add Room Type</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {groupedRoomTypes.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No room types available. Add a new room type to get started.
            </div>
          )}

          {groupedRoomTypes.map(([hotelId, hotelGroup]: [string, any]) => (
            <div key={hotelId} className="mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {hotelGroup.hotelName}
              </h3>

              {hotelGroup.typeRooms.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  {` No room types for this hotel. Click "Add Room Type" to create one.`}
                </div>
              )}

              {hotelGroup.typeRooms.map((roomType: TypeRoom) => (
                <div
                  key={roomType.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 mb-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-grow pr-4">
                      <div className="flex items-center mb-2">
                        <Tag className="mr-2 text-indigo-500" size={20} />
                        <h3 className="text-xl font-semibold text-gray-800 mb-0">
                          {roomType.name}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-3">{roomType.description}</p>

                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">Created:</span>
                          <span className="text-blue-600 font-bold">
                            {new Date(roomType.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => handleEditRoomType(roomType)}
                        className="flex items-center space-x-2 text-blue-600 hover:bg-blue-100 transition-colors px-3 py-2 rounded-lg"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteRoomType(roomType.id)}
                        className="flex items-center space-x-2 text-red-600 hover:bg-red-100 transition-colors px-3 py-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>

                    {activeUpdateModal && selectedRoomType && (
                      <RoomTypeEditModal
                        onClose={() => setActiveUpdateModal(false)}
                        onUpdate={handleUpdateRoomType}
                        hotelId={Number(hotelId)}
                        initialRoomType={selectedRoomType}
                      />
                    )}

                    {activeDeleteModal && confirmRoomType && (
                      <RoomTypeDeleteModal
                        isOpen={activeDeleteModal}
                        onClose={() => setActiveDeleteModal(false)}
                        onConfirm={confirmDeleteRoomType}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {activeCreateModal && (
        <RoomTypeCreateModal
          onClose={() => setActiveCreateModal(false)}
          onCreate={handleCreateRoomType}
        />
      )}


    </div>
  );
};

export default RoomTypeList;

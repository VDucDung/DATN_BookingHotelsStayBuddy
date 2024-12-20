/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import getCoordinates from '@/api/getCoordinates';
import Loading from '@/components/loading';
import Map from '@/components/map';
import React, { useEffect, useState } from 'react';

const Location: React.FC<{ address: string }> = ({ address }) => {
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCoordinates = async () => {
      const addressParts = address.split(", ");
      setLoading(true);
      if (addressParts.length > 2) {
        const addressFromThirdElement = addressParts.slice(2).join(", ");

        const coords: any = await getCoordinates(addressFromThirdElement);
        setCoords({ latitude: coords.latitude, longitude: coords.longitude });
      } else {
        const coords: any = await getCoordinates('Viet Nam');
        setCoords({ latitude: coords.latitude, longitude: coords.longitude });

      }
      setLoading(false);
    };

    fetchCoordinates();
  }, [address]);

  return (
    <div className="container mx-auto mt-5">
    <h1 className="text-2xl font-bold mb-4 pl-5">Map Locator</h1>
    {loading ? ( 
      <Loading />
    ) : (
      <Map latitude={coords.latitude} longitude={coords.longitude} />
    )}
  </div>
  );
};

export default Location;

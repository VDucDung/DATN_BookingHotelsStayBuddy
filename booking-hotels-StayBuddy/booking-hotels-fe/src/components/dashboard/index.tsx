/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Calendar,
  Users,
  CreditCard,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyStats, getNewBooking, getToatlBookings, getToatlRevenue } from '@/api/dashboarService';
import { useState } from 'react';
import { formatDate } from '@/utils/formatDate';


const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { data: totalBookings } = useQuery({
    queryKey: ["totalBookings"],
    queryFn: () => getToatlBookings(),
  });

  const { data: toatlRevenue } = useQuery({
    queryKey: ["totalRevenue"],
    queryFn: () => getToatlRevenue(),
  });

  const { data: monthlyStats } = useQuery({
    queryKey: ["monthlyStats"],
    queryFn: () => getMonthlyStats(),
  });

  const { data: newBooking } = useQuery({
    queryKey: ["newBooking"],
    queryFn: () => getNewBooking(),
  });

  const defaultMonthlyStats = [
    { month: 'Jan', bookings: 0, revenue: 0 },
    { month: 'Feb', bookings: 0, revenue: 0 },
    { month: 'Mar', bookings: 0, revenue: 0 },
    { month: 'Apr', bookings: 0, revenue: 0 },
    { month: 'May', bookings: 0, revenue: 0 },
    { month: 'Jun', bookings: 0, revenue: 0 },
    { month: 'Jul', bookings: 0, revenue: 0 },
    { month: 'Aug', bookings: 0, revenue: 0 },
    { month: 'Sep', bookings: 0, revenue: 0 },
    { month: 'Oct', bookings: 0, revenue: 0 },
    { month: 'Nov', bookings: 0, revenue: 0 },
    { month: 'Dec', bookings: 0, revenue: 0 },
  ];

  const mergedData = defaultMonthlyStats.map((defaultStat, index) => {
    const apiStat = monthlyStats?.find((stat: any) => stat.month === index + 1);
    return {
      ...defaultStat,
      bookings: apiStat ? apiStat.totalBookings : defaultStat.bookings,
      revenue: apiStat ? apiStat.totalRevenue : defaultStat.revenue,
    };
  });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 p-10">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-white shadow-sm rounded-full p-2">
              <Users size={20} />
            </div>
            <div className="bg-white shadow-sm rounded-full p-2">
              <CreditCard size={20} />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 mb-2">Total Bookings</h3>
                <p className="text-2xl font-bold">{totalBookings ?? 0}</p>
              </div>
              <Calendar className="text-blue-500" size={36} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 mb-2">Total Revenue</h3>
                <p className="text-2xl font-bold">{new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(toatlRevenue || 0) ?? 0} </p>
              </div>
              <CreditCard className="text-green-500" size={36} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="p-2 border rounded mb-4"
            >
              <option value={monthlyStats && monthlyStats.length > 0 && monthlyStats[0]?.year}>
                {monthlyStats && monthlyStats.length > 0 && monthlyStats[0]?.year}
              </option>
            </select>
            <h3 className="text-lg font-semibold mb-4">Monthly Bookings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mergedData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#3B82F6" />
                <Bar dataKey="revenue" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Bookings</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Booking ID</th>
                  <th className="p-2 text-left">Guest</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {newBooking && newBooking.length > 0 && newBooking.map((booking: any) => (
                  <tr key={booking.id} className="border-b">
                    <td className="p-2">{booking.id}</td>
                    <td className="p-2">{booking.contactName}</td>
                    <td className="p-2">{formatDate(booking.createdAt)}</td>
                    <td className="p-2">
                      <span className={`
                        px-2 py-1 rounded-full text-xs
                        ${booking.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'}
                      `}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

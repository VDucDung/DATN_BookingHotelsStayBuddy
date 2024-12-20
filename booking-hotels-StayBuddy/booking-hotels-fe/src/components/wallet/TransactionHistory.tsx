import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Table, Pagination } from 'antd';
import { walletApi } from '@/api/walletService';

export default function TransactionHistory() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', page],
    queryFn: () => walletApi.getTransactions(page, limit),
  });

  if (isLoading) {
    return <div className='container mx-auto'>Loading...</div>;
  }

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) =>
        new Date(text).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Loại',
      dataIndex: 'typeText',
      key: 'typeText',
    },
    {
      title: 'Số tiền',
      dataIndex: 'formattedAmount',
      key: 'formattedAmount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'statusText',
      key: 'statusText',
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Lịch sử giao dịch</h2>
      <Table
        columns={columns}
        dataSource={transactions?.data}
        rowKey="id"
        pagination={false}
        loading={isLoading}
      />
      <div className="mt-4">
        <Pagination
          total={transactions?.data.length || 0}
          current={page}
          pageSize={limit}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
    </Card>
  );
}

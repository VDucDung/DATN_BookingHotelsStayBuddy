import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Modal, Input, Button, message } from 'antd';
import { walletApi } from '@/api/walletService';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DepositModal({ open, onClose }: DepositModalProps) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    try {
      setLoading(true);
      const numAmount = parseInt(amount.replace(/\D/g, ''));

      if (numAmount < 12000) {
        message.error('Số tiền tối thiểu là 12,000đ');
        return;
      }

      const response = await walletApi.createCheckoutSession(numAmount);
      const { sessionId } = response.data;

      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({
        sessionId,
      });

      if (result?.error) {
        message.error('Không thể tạo phiên thanh toán');
      }
    } catch{
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Nạp tiền vào ví"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium">Số tiền</label>
          <Input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setAmount(new Intl.NumberFormat('vi-VN').format(Number(value)));
            }}
            placeholder="Nhập số tiền"
          />
        </div>
        <Button 
          type="primary" 
          onClick={handleDeposit} 
          loading={loading}
          block
        >
          {loading ? 'Đang xử lý...' : 'Nạp tiền'}
        </Button>
      </div>
    </Modal>
  );
}

import { currencyApi } from '@/services';
import { CurrencyData } from '@/services/types';
import { Select, Spin, message } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

const CurrencySelect = ({ value, onChange }) => {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setLoading(true);
      try {
        const response = await currencyApi.getCurrencyOptions();
        if (response.code === 200) {
          setCurrencies(response.data);
        } else {
          message.error('获取货币列表失败');
        }
      } catch (error) {
        message.error('获取货币列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder="请选择货币"
      style={{ width: '100%' }}
      loading={loading}
      showSearch
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      notFoundContent={loading ? <Spin size="small" /> : '没有找到选项'}
    >
      {currencies.map((currency) => (
        <Option key={currency.code} value={currency.code}>
          {`${currency.name} (${currency.code})`}
        </Option>
      ))}
    </Select>
  );
};

export default CurrencySelect;

import React, { useState, useEffect } from 'react';
import {
  totalMoneyForEveryMonthService,
  totalMoneyForEverydayService,
} from '../../service/statisticsAndAnalysis/statisticsAndAnalysis.js';

import { Column, Line } from '@ant-design/plots';

const StatisticsAndAnalysisPage: React.FC<any> = () => {
  const [totalMoneyForEveryMonthDataList , setTotalMoneyForEveryMonthDataList] = useState<any[]>([]);

  const getTotalMoneyForEveryMonthDataList = async (request: any) => {
    const data = await totalMoneyForEveryMonthService({...request});
    if (data?.success) {
      return;
    }

    setTotalMoneyForEveryMonthDataList(data);
  }

  const monthColumnConfig = {
    data: totalMoneyForEveryMonthDataList,
    xField: 'month',
    yField: 'money',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: '月',
      },
      money: {
        alias: '金钱',
      },
    },
  };

  const monthLineConfig = {
    data: totalMoneyForEveryMonthDataList,
    xField: 'month',
    yField: 'money',
    xAxis: {
      tickCount: 5,
    },
  };

  const [totalMoneyForEverydayDataList , setTotalMoneyForEverydayDataList] = useState<any[]>([]);

  const getTotalMoneyForEverydaytDataList = async (request: any) => {
    const data = await totalMoneyForEverydayService({...request});
    if (data?.success) {
      return;
    }

    setTotalMoneyForEverydayDataList(data);
  }

  const dayColumnConfig = {
    data: totalMoneyForEverydayDataList,
    xField: 'day',
    yField: 'money',
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: '月',
      },
      money: {
        alias: '金钱',
      },
    },
  };

  const dayLineConfig = {
    data: totalMoneyForEverydayDataList,
    xField: 'day',
    yField: 'money',
    xAxis: {
      tickCount: 5,
    },
  };

  useEffect(() => {
    getTotalMoneyForEveryMonthDataList({});
    getTotalMoneyForEverydaytDataList({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Column {...monthColumnConfig} />
      <Line {...monthLineConfig} />
      <Column {...dayColumnConfig} />
      <Line {...dayLineConfig} />
    </div>
  );
};

export default StatisticsAndAnalysisPage;

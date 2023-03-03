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
  };

  const monthLineConfig = {
    data: totalMoneyForEveryMonthDataList,
    xField: 'month',
    yField: 'money',
  };

  const [totalMoneyForEverydayDataList , setTotalMoneyForEverydayDataList] = useState<any[]>([]);

  const getTotalMoneyForEverydayDataList = async (request: any) => {
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
  };

  const dayLineConfig = {
    data: totalMoneyForEverydayDataList,
    xField: 'day',
    yField: 'money',
  };

  const [totalMoneyForEverydayCompareDataList , setTotalMoneyForEverydayCompareDataList] = useState<any[]>([]);

  const getTotalMoneyForEverydayCompareDataList = async (request: any) => {
    const dataAll = await totalMoneyForEverydayService({...request});
    const dataAllNew : any[] = [];
    dataAll.forEach((item) => {
      dataAllNew.push({ ...item, category: 'all' });
    });

    const dataValuable = await totalMoneyForEverydayService({...request, valuable: true});
    const dataValuableNew : any[] = [];
    dataValuable.forEach((item) => {
      dataValuableNew.push({ ...item, category: 'valuable' });
    });

    const dataValueless = await totalMoneyForEverydayService({...request, valuable: false});
    const dataValuelessNew : any[] = [];
    dataValueless.forEach((item) => {
      dataValuelessNew.push({ ...item, category: 'valueless' });
    });

    setTotalMoneyForEverydayCompareDataList([
      ...dataAllNew,
      ...dataValuableNew,
      ...dataValuelessNew,
    ]);
  }

  const dayColumnCompareConfig = {
    data: totalMoneyForEverydayCompareDataList,
    xField: 'day',
    yField: 'money',
    seriesField: 'category',
    isGroup: true,
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  };

  const dayLineCompareConfig = {
    data: totalMoneyForEverydayCompareDataList,
    xField: 'day',
    yField: 'money',
    seriesField: 'category',
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  };

  useEffect(() => {
    getTotalMoneyForEveryMonthDataList({});
    getTotalMoneyForEverydayDataList({});
    getTotalMoneyForEverydayCompareDataList({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Column {...monthColumnConfig} />
      <Line {...monthLineConfig} />

      <Column {...dayColumnConfig} />
      <Line {...dayLineConfig} />
      <Column {...dayColumnCompareConfig} />
      <Line {...dayLineCompareConfig} />
    </div>
  );
};

export default StatisticsAndAnalysisPage;

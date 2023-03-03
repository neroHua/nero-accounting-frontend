import React, { useState, useEffect } from 'react';
import {
  totalMoneyForEveryMonthService,
  totalMoneyForEverydayService,
} from '../../service/statisticsAndAnalysis/statisticsAndAnalysis.js';

import { Column, Line, Pie } from '@ant-design/plots';

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

  const [totalMoneyForEveryMonthCompareDataList , setTotalMoneyForEveryMonthCompareDataList] = useState<any[]>([]);

  const getTotalMoneyForEveryMonthCompareDataList = async (request: any) => {
    const dataAll = await totalMoneyForEveryMonthService({...request});
    const dataAllNew : any[] = [];
    dataAll.forEach((item) => {
      dataAllNew.push({ ...item, category: 'all' });
    });

    const dataValuable = await totalMoneyForEveryMonthService({...request, valuable: true});
    const dataValuableNew : any[] = [];
    dataValuable.forEach((item) => {
      dataValuableNew.push({ ...item, category: 'valuable' });
    });

    const dataValueless = await totalMoneyForEveryMonthService({...request, valuable: false});
    const dataValuelessNew : any[] = [];
    dataValueless.forEach((item) => {
      dataValuelessNew.push({ ...item, category: 'valueless' });
    });

    setTotalMoneyForEveryMonthCompareDataList([
      ...dataAllNew,
      ...dataValuableNew,
      ...dataValuelessNew,
    ]);
  }

  const monthColumnCompareConfig = {
    data: totalMoneyForEveryMonthCompareDataList,
    xField: 'month',
    yField: 'money',
    seriesField: 'category',
    isGroup: true,
    color: ['#1979C9', '#D62A0D', '#FAA219'],
  };

  const monthLineCompareConfig = {
    data: totalMoneyForEveryMonthCompareDataList,
    xField: 'month',
    yField: 'money',
    seriesField: 'category',
    color: ['#1979C9', '#D62A0D', '#FAA219'],
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
 
  const [totalMoneyForEveryMonthPie0DataList , setTotalMoneyForEveryMonthPie0DataList] = useState<any[]>([]);
  const [totalMoneyForEveryMonthPie1DataList , setTotalMoneyForEveryMonthPie1DataList] = useState<any[]>([]);

  const getTotalMoneyForEveryMonthPieDataList = async (request: any) => {
    const dataAll = await totalMoneyForEveryMonthService({...request});
    const dataValuable = await totalMoneyForEveryMonthService({...request, valuable: true});
    const dataValueless = await totalMoneyForEveryMonthService({...request, valuable: false});

    const data0 : any[] = [];
    data0.push({...dataAll[0], category: 'all'});
    data0.push({...dataValuable[0], category: 'valuable'});
    data0.push({...dataValueless[0], category: 'valueless'});

    const data1 : any[] = [];
    data1.push({...dataAll[1], category: 'all'});
    data1.push({...dataValuable[1], category: 'valuable'});
    data1.push({...dataValueless[1], category: 'valueless'});

    setTotalMoneyForEveryMonthPie0DataList(data0);
    setTotalMoneyForEveryMonthPie1DataList(data1);
  }
  
  const monthPie0Config = {
    data: totalMoneyForEveryMonthPie0DataList,
    angleField: 'money',
    colorField: 'category',
  };

  const monthPie1Config = {
    data: totalMoneyForEveryMonthPie1DataList,
    angleField: 'money',
    colorField: 'category',
  };

  useEffect(() => {
    getTotalMoneyForEveryMonthDataList({});
    getTotalMoneyForEveryMonthCompareDataList({});

    getTotalMoneyForEverydayDataList({});
    getTotalMoneyForEverydayCompareDataList({});

    getTotalMoneyForEveryMonthPieDataList({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Column {...monthColumnConfig} />
      <Line {...monthLineConfig} />
      <Column {...monthColumnCompareConfig} />
      <Line {...monthLineCompareConfig} />

      <Column {...dayColumnConfig} />
      <Line {...dayLineConfig} />
      <Column {...dayColumnCompareConfig} />
      <Line {...dayLineCompareConfig} />

      <Pie {...monthPie0Config} />
      <Pie {...monthPie1Config} />
    </div>
  );
};

export default StatisticsAndAnalysisPage;

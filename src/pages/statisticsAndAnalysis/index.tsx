import React, { useState, useEffect } from 'react';
import {
  totalMoneyForEveryMonthService,
} from '../../service/statisticsAndAnalysis/statisticsAndAnalysis.js';

const StatisticsAndAnalysisPage: React.FC<any> = () => {
  const [totalMoneyForEveryMonthDataList , setTotalMoneyForEveryMonthDataList] = useState<any[]>([]);

  const getTotalMoneyForEveryMonthDataList = async (request: any) => {
    const data = await totalMoneyForEveryMonthService({...request});
    if (data?.success) {
      return;
    }

    setTotalMoneyForEveryMonthDataList(data);
  }
  useEffect(() => {
    getTotalMoneyForEveryMonthDataList({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      统计与分析
    </div>
  );
};

export default StatisticsAndAnalysisPage;

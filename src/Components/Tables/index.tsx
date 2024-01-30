import React from 'react';
import '../../Css/Table.css';

interface TableProps {
  title: string;
  data: Record<string, Record<number, number>>;
}

const Table: React.FC<TableProps> = ({ title, data }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const calculatePercentage = (lastRow: Record<number, number>, secondLastRow: Record<number, number>, hourIndex: number) => {
    const lastRowValue = lastRow[hourIndex + 1] || 0;
    const secondLastRowValue = secondLastRow[hourIndex + 1] || 0;

    return secondLastRowValue !== 0 ? (((lastRowValue - secondLastRowValue) / secondLastRowValue) * 100).toFixed(2) : '0.00';
  };

  const getLastTwoRows = () => {
    const rows = Object.values(data);
    const lastRow = rows[rows.length - 1] || {};
    const secondLastRow = rows[rows.length - 2] || {};
    return { lastRow, secondLastRow };
  };

  const totalRow = (
    <tr>
      <td>Total Percentage</td>
      {Array.from({ length: 24 }, (_, hourIndex) => (
        <td key={hourIndex}>
          {calculatePercentage(getLastTwoRows().lastRow, getLastTwoRows().secondLastRow, hourIndex)}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="table-container">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            {Array.from({ length: 24 }, (_, index) => (
              <th key={index}>{index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([date, hourData]) => (
            <tr key={date}>
              <td>{formatDate(date)}</td>
              {Array.from({ length: 24 }, (_, hourIndex) => (
                <td key={hourIndex}>{hourData[hourIndex + 1] || 0}</td>
              ))}
            </tr>
          ))}
          {totalRow}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

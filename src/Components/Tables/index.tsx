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
        </tbody>
      </table>
    </div>
  );
};

export default Table;

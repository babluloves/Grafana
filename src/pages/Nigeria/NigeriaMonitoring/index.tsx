import React, {useEffect, useState} from "react";
import Table from "../../../Components/Tables";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomSpinner from "../../Spinner";

const NigeriaMonitoring: React.FC = () => {
  const [data1, setData1] = useState<Record<string, Record<number, number>>>({});
  const [data2, setData2] = useState<Record<string, Record<number, number>>>({});
  const [data3, setData3] = useState<Record<string, Record<number, number>>>({});
  const [data4, setData4] = useState<Record<string, Record<number, number>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const convertUnixTimeToHumanReadable = (timestamp: number): string => {
      const date = new Date(timestamp);
      return date.toLocaleString();
    };

    const organizeDataForDisplay = (response: any): Record<string, Record<number, number>> => {
      const organizedData: Record<string, Record<number, number>> = {};

      response.results.forEach((result: any) => {
        result.series.forEach((series: any) => {
          series.values.forEach(([timestamp, label, value]: [number, string, number]) => {
            const timestampWithoutNanos = Math.floor(timestamp / 1000000);
            const date = convertUnixTimeToHumanReadable(timestampWithoutNanos).split(',')[0];

            if (!organizedData[date]) {
              organizedData[date] = {};
            }

            const hour = new Date(timestampWithoutNanos).getHours() + 1;
            organizedData[date][hour] = value;
          });
        });
      });

      return organizedData;
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        const url = 'http://192.168.0.206:3001/proxy/nigeria/activations';

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();

        const organizedData1 = organizeDataForDisplay(responseData.data1);
        const organizedData2 = organizeDataForDisplay(responseData.data2);
        const organizedData3 = organizeDataForDisplay(responseData.data3);
        const organizedData4 = organizeDataForDisplay(responseData.data4);

        setData1(organizedData1);
        setData2(organizedData2);
        setData3(organizedData3);
        setData4(organizedData4);
        toast.success('Operation succeeded!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Duration in milliseconds
        });
      } catch (error:any) {
        console.error('Error fetching data:', error);
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Duration in milliseconds
        });
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <CustomSpinner /> // Show the spinner while loading
      ) : (
        <>
          <Table title="Activation's" data={data1} />
          <Table title='Renewals' data={data2} />
          <Table title="On demand" data={data3} />
          <Table title="On demand failed" data={data4} />
        </>
      )}
      <ToastContainer />
    </div>
  );
};
  
export default NigeriaMonitoring;
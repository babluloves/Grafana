import React, {useEffect, useState} from "react";
import Table from "../../../Components/Tables";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomSpinner from "../../Spinner";
import backendUrl from "../../../config";

const ZambiaMonitoring: React.FC = () => {
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

    const organizeDataForDisplay = (response: any, types: string): Record<string, Record<number, number>> => {
      const organizedData: Record<string, Record<number, number>> = {};
    
      response.data4.results.forEach((result: any) => {
        result.series.forEach((series: any) => {
          series.values.forEach((record: any) => {
            const [timestamp, label, value] = record;
    
            if (label === types) {
              const timestampWithoutNanos = Math.floor(timestamp / 1000000);
              const date = convertUnixTimeToHumanReadable(timestampWithoutNanos).split(',')[0];
              
              if (!organizedData[date]) {
                organizedData[date] = {};
              }
    
              const hour = new Date(timestampWithoutNanos).getHours()+1;
              organizedData[date][hour] = value; // You can change this to the desired value (e.g., attempted, expected, fail, etc.)
            }
          });
        });
      });
    
      return organizedData;
  };

    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${backendUrl}/proxy/zambia/activations`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseData = await response.json();

        const organizedData1 = organizeDataForDisplay(responseData, "\"new_sub\"");
        const organizedData2 = organizeDataForDisplay(responseData, "\"Renewal_Attempted\"");
        const organizedData3 = organizeDataForDisplay(responseData, "\"renewal_ondemand\"");
        const organizedData4 = organizeDataForDisplay(responseData, "\"renewal_ondemand_fail\"");

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
          <h2>Zambia Monitoring Sheet</h2>
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
  
export default ZambiaMonitoring;
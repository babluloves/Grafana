import React,{useState, useEffect} from 'react';
import './Eswatini.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment-timezone';
import CustomSpinner from '../Spinner';

function Eswatini() {
  const [data, setData] = useState<any[]>([]);
  const [firstFromDate, setFirstFromDate] = useState<Date | null>(new Date());
  const [firstToDate, setFirstToDate] = useState<Date | null>(new Date());
  const [secondFromDate, setSecondFromDate] = useState<Date | null>(new Date());
  const [secondToDate, setSecondToDate] = useState<Date | null>(new Date());
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [firstprocessedData, setFirstProcessedData] = useState<any[]>([]);
  const [secondprocessedData, setSecondProcessedData] = useState<any[]>([]);
  const [processedDataFirst, setProcessedDataFirst] = useState<any[]>([]);
  const [processedDataSecond, setProcessedDataSecond] = useState<any[]>([]);
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const url = 'http://192.168.0.206:3001/proxy/Eswatini';
  let callCount = 0;

  useEffect(() => {
    compareData();
  }, [firstprocessedData, secondprocessedData]);

  const performRequest = async (fromUnixTime: number, toUnixTime: number) => {
    const postData = {
      queries: [
          {
            datasource: {
              type: 'prometheus',
              uid: 'xIOXmXd4k',
            },
            editorMode: 'code',
            expr: 'sum(com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~"(ACTIVATION|DEACTIVATION|EVENT)",app=~"request-mediator-service"}-com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~"(ACTIVATION|DEACTIVATION|EVENT)",app=~"request-mediator-service"} offset $__interval) by(key) >=0 or sum(com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~"(ACTIVATION|DEACTIVATION|EVENT)",app=~"request-mediator-service"}) by(key)',
            format: 'table',
            legendFormat: '__auto',
            range: true,
            refId: 'A',
            queryType: 'timeSeriesQuery',
            exemplar: false,
            requestId: '623A',
            utcOffsetSec: 19800,
            interval: '',
            datasourceId: 5,
            intervalMs: 15000,
            maxDataPoints: 1191
          },
          {
            datasource: {
              type: 'prometheus',
              uid: 'xIOXmXd4k',
            },
            editorMode: 'code',
            expr: "sum(com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~\"(ACTIVATION|DEACTIVATION|EVENT)\",code=~\"3021|3028|3027|0|6000|6002\",app=~\"request-mediator-service\"}-com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~\"(ACTIVATION|DEACTIVATION|EVENT)\",code=~\"3021|3028|3027|0|6000|6002\",app=~\"request-mediator-service\"} offset $__interval) by(key) >=0 or sum(com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~\"(ACTIVATION|DEACTIVATION|EVENT)\",code=~\"3021|3028|3027|0|6000|6002\",app=~\"request-mediator-service\"}) by(key)",
            format: 'table',
            range: true,
            refId: 'B',
            queryType: 'timeSeriesQuery',
            exemplar: false,
            requestId: '623B',
            utcOffsetSec: 19800,
            interval: '',
            datasourceId: 5,
            intervalMs: 15000,
            maxDataPoints: 1191
            // Add other necessary properties for the second query
          },
          {
            datasource: {
              type: 'prometheus',
              uid: 'xIOXmXd4k',
            },
            editorMode: 'code',
            expr: "sum(com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~\"(ACTIVATION|DEACTIVATION|EVENT)\",code!~\"3021|3028|3027|0|6000|6002\",app=~\"request-mediator-service\"}-com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~\"(ACTIVATION|DEACTIVATION|EVENT)\",code!~\"3021|3028|3027|0|6000|6002\",app=~\"request-mediator-service\"} offset $__interval) by(key) >=0 or sum(com_comviva_kpi_Custom_PartnerApiErrorCnt_cnt{key_=~\"(ACTIVATION|DEACTIVATION|EVENT)\",code!~\"3021|3028|3027|0|6000|6002\",app=~\"request-mediator-service\"}) by(key)",
            format: 'table',
            range: true,
            refId: 'C',
            queryType: 'timeSeriesQuery',
            exemplar: false,
            requestId: '623C',
            utcOffsetSec: 19800,
            interval: '',
            datasourceId: 5,
            intervalMs: 15000,
            maxDataPoints: 1191
            
          }
        ],
      range: {
        from: '2023-12-17T22:00:00.000Z',
        to: '2023-12-17T23:00:00.000Z',
        raw: {
          from: '2023-12-17T22:00:00.000Z',
          to: '2023-12-17T23:00:00.000Z'
        }
      },
      from: '1702850400000',
      to: '1702854000000'
    };
    console.log(fromUnixTime);
    console.log(toUnixTime);
    const fromUnixString = (moment.tz(fromUnixTime, 'Africa/Mbabane').unix() * 1000).toString();
    const toUnixString = (moment.tz(toUnixTime, 'Africa/Mbabane').unix() * 1000).toString();

    const updatedPostData = {
      ...postData,
      range: {
        from: new Date(fromUnixTime).toISOString(),
        to: new Date(toUnixTime).toISOString(),
        raw: {
          from: new Date(fromUnixTime).toISOString(),
          to: new Date(toUnixTime).toISOString(),
        },
      },
      from: fromUnixString,
      to: toUnixString,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'grafana_session=605010e369155f04aaeaaf9c60e1b8b7'
      },
      body: JSON.stringify(updatedPostData),
    };

    try {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        throw new Error('Request failed with status: ${response.status}');
      }
    } catch (error) {
      console.error('Error occurred during the request:', error);
      throw error;
    }
  };

  const fetchData = async () => {
    setLoading(true)
    const formatDateToISOString = (date: Date | null) => {
      if (!date) return '';
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
    
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };
    const firstFromUnixTime1 = formatDateToISOString(firstFromDate);
    const firstToUnixTime1 = formatDateToISOString(firstToDate);
    const secondFromUnixTime1 = formatDateToISOString(secondFromDate);
    const secondToUnixTime1 = formatDateToISOString(secondToDate);

    try {
      const firstFromUnixTime:any = moment.tz(firstFromUnixTime1, 'Africa/Mbabane').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const firstToUnixTime:any = moment.tz(firstToUnixTime1, 'Africa/Mbabane').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const secondFromUnixTime:any = moment.tz(secondFromUnixTime1, 'Africa/Mbabane').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const secondToUnixTime:any = moment.tz(secondToUnixTime1, 'Africa/Mbabane').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      const firstRequestData = await performRequest(firstFromUnixTime, firstToUnixTime);
      const secondRequestData = await performRequest(secondFromUnixTime, secondToUnixTime);

      setData([
        { date: firstFromUnixTime, form: firstToUnixTime, data: firstRequestData },
        { date: secondFromUnixTime, form: secondToUnixTime, data: secondRequestData },
      ]);

      const processedFirstRequestData:any = processDataAndShowInTable(firstRequestData);
      const processedSecondRequestData:any = processDataAndShowInTable(secondRequestData);
      toast.success('Operation succeeded!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration in milliseconds
      });

    // Store processed data in state
    setProcessedDataFirst(processedFirstRequestData);
    setProcessedDataSecond(processedSecondRequestData);
    } catch (error:any) {
      console.error(error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Duration in milliseconds
      });
    }
    finally {
      setLoading(false);
    }
  }

  const compareData = () => {
    if (!firstprocessedData || !secondprocessedData) return;

    const comparedData:any = [];

    firstprocessedData.forEach((firstItem) => {
      const matchingSecondItem = secondprocessedData.find(
        (secondItem) => secondItem.Key === firstItem.Key
      );

      if (matchingSecondItem) {
        const percentage =
          ((firstItem.Value - matchingSecondItem.Value) / matchingSecondItem.Value) * 100;
        comparedData.push({
          Key: firstItem.Key,
          PercentageDifference: percentage.toFixed(2) + '%',
        });
      }
    });

    setComparisonData(comparedData);
  };
 
  const processDataAndShowInTable = (responseData: any) => {
    
    if (!responseData || !responseData.results) {
      return <div>No data available</div>;
    }
  
    const processedData: any = [];
  
    // Iterate through each key in responseData.results
    Object.keys(responseData.results).forEach((key) => {
      // Check if the key is 'A' (Section A)
      if (key === 'A') {
        const frames = responseData.results[key].frames || [];
  
        // Iterate through frames array within Section A
        frames.forEach((frame: any) => {
          const keyLabel = frame.schema.fields.find((field: any) => field.name === 'Value')?.labels?.key;
          const valuesArray = frame.data.values || [];
  
          let sumOfNextArray = 0;
          const arrayToSum = valuesArray[1] || [];
  
          for (let i = 0; i < arrayToSum.length; i++) {
            sumOfNextArray += arrayToSum[i];
          }
          processedData.push({ Key: keyLabel, Value: sumOfNextArray });
        });
      }
    });
      if (callCount === 0) {
        setFirstProcessedData(processedData);
        console.log(firstprocessedData);
      } else if (callCount === 1) {
        setSecondProcessedData(processedData);
        console.log(secondprocessedData);
      }
      callCount++;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>CP Name</th>
              <th>Total Request</th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((item: any, index: any) => (
              <tr key={index}>
                <td>{item.Key}</td>
                <td>{item.Value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="DatePickers">
        <div className="DatePickerSection">
          <h3>From</h3>
          <DatePicker
            selected={firstFromDate}
            onChange={(date: Date) => setFirstFromDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="From"
          />
          <DatePicker
            selected={firstToDate}
            onChange={(date: Date) => setFirstToDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="To"
          />
        </div>
        <div className="DatePickerSection">
          <h3>To</h3>
          <DatePicker
            selected={secondFromDate}
            onChange={(date: Date) => setSecondFromDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="From"
          />
          <DatePicker
            selected={secondToDate}
            onChange={(date: Date) => setSecondToDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="To"
          />
        </div>
      </div>
      <button onClick={fetchData}>Send Requests</button>
  
      <div className="DataDisplay">
        <h2>Received Data</h2>
        <div className="DataContainer">
        {loading ? (
            <CustomSpinner />
          ) : (
            <>
            <div className="ProcessedData">{processedDataFirst}</div>
          <div className="ProcessedData">{processedDataSecond}</div>
          <div className='ProcessedData'>
        {comparisonData ? (
          <table>
            <thead>
              <tr>
                <th>CP Name</th>
                <th>Percentage Difference</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Key}</td>
                  <td>{item.PercentageDifference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No comparison data available</div>
        )}
        </div>
            </>
           )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );    
}

export default Eswatini;

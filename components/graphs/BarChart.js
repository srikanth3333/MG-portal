import React from 'react';

import { Chart, Series,ZoomAndPan, CommonSeriesSettings, Title, Tooltip,Legend,ValueAxis} from 'devextreme-react/chart';
import { Skeleton, Popover} from 'antd';
import { useRouter } from 'next/router'


const BarChart = ({link,items,customText,loading,key}) => {


    const router = useRouter()
    const onPointClick = ({ target: point }) => {
        point.select();
        // console.log(point)
        // return;
        let itemText;
        if (point.data.analysisRemark == 'Incorrect Parameter' ) {
            itemText = "IP"
        } 
        if (point.data.analysisRemark == 'Incorrect Reading' ) {
            itemText = "IR"
        } if (point.data.analysisRemark == 'Invalid Image' ) {
            itemText = "II"
        } if (point.data.analysisRemark == 'Meter Mismatch' ) {
            itemText = "MM"
        } if (point.data.analysisRemark == 'Parameter is unclear' ) {
            itemText = "PU"
        } if (point.data.analysisRemark == 'Spoof' ) {
            itemText = "SP"
        } if (point.data.analysisRemark == 'Unclear Image' ) {
            itemText = "UI"
        }
        if (point.data.analysisRemark == "OK") {
            itemText = "OK"
          }
        router.push(`${link}/${!customText ? point.data._id : itemText}`);        
      }


    if(loading) {
        return (
            <Skeleton active 
                paragraph={{
                    rows: 10,
                }}
                size="small"
            />
        )
    }
  
    return (
        <div className="row">
            {
                items.map((item,index) => (
                    <div className="col-lg-12" key={index}>
                        <h5 className=' text-center'><b>{item.title}</b></h5>
                        <Chart
                            id="chart"
                            palette="Soft"
                            onPointClick={onPointClick}
                            rotated={true}
                            dataSource={item.data}>
                            <CommonSeriesSettings
                                argumentField={item.argumentField}
                                valueField={item.valueField}
                                type="bar"
                                ignoreEmptyPoints={true}
                            />
                            {/* <SeriesTemplate nameField={item.valueField} /> */}
                            <Series argumentField={item.argumentField} valueField={item.valueField} horizontal={false}  />
                            <ValueAxis inverted={false} />
                            {/* <Title
                                text={item.title}
                            /> */}
                            <Legend
                                  visible={false}
                                  margin={0}
                                  horizontalAlignment="right"
                                  verticalAlignment="bottom"
                                />
                            <Tooltip
                                enabled={true}
                                location="edge"
                                
                                />
                                {/* <Export enabled={true} /> */}
                            <ZoomAndPan
                                argumentAxis="both"
                                valueAxis="both"
                            /> 
                        </Chart>
                    </div>
                ))
            }
        </div>
    );
}

export default BarChart;

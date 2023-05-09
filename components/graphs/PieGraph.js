import React from 'react';

import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Legend,
} from 'devextreme-react/pie-chart';
import { useRouter } from 'next/router'

const resolveModes = ['shift', 'hide', 'none'];

const PieGraph = ({link,items,customText}) => {

  
    const router = useRouter()
    
    function customizeText(arg) {
      
        return `${arg.argument} (${arg.percentText})`;
        // return `${arg.argument}`;
    }

    const onPointClick = ({ target: point }) => {
        point.select();
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
        router.push(`${link}/${!customText ? point.data.analysisRemark : itemText}`);        
      }
  
    return (
      <div className="row">
        {
                items.map((item,index) => (
                    <div className="col-lg-12" key={index}>
                        <h5 className='text-center'><b>{item.title}</b></h5>
                            <PieChart
                              id="pie"
                              dataSource={item.data}
                              palette="Bright"
                              title=""
                              type="doughnut"
                              innerRadius={0.8}
                              // onPointClick={pointClickHandler}
                              // onLegendClick={legendClickHandler}
                              onPointClick={onPointClick}
                              resolveLabelOverlapping={resolveModes[0]}
                            >
                              <Series
                                argumentField={item.argumentField}
                                valueField={item.valueField}
                              >
                                <Label visible={true} customizeText={customizeText}>
                                  <Connector visible={false} width={1} />
                                </Label>
                              </Series>
                              <Legend
                                  visible={false}
                                  margin={0}
                                  horizontalAlignment="right"
                                  verticalAlignment="bottom"
                                />
                              <Size width={'100%'} height={400} />
                              {/* <Export enabled={true} /> */}
                            </PieChart>
                    </div>
                ))
          }
      </div>
      
    );
}

export default PieGraph;

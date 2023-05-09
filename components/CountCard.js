import Icon, { PieChartOutlined,ProjectFilled,ThunderboltFilled,
    SignalFilled,ReconciliationFilled,CloudFilled,
    ContainerFilled,ControlFilled,CompassFilled,
    DashboardFilled,BookFilled } from '@ant-design/icons';
import { Skeleton, Popover} from 'antd';
var humanize = require('humanize-number');

let icons = [
    "ProjectFilled",
    "ThunderboltFilled",
    "SignalFilled",
    "ReconciliationFilled",
    "CloudFilled",
    "ContainerFilled",
    "ControlFilled",
    "CompassFilled",
    "DashboardFilled",
    "BookFilled",
    "PieChartOutline"
]


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: 'IND',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function CountCard({data,loading}) {
    
  return (
    <>
        <div className="row mt-4 count-card-main">
            {
                loading ?
                    data.map((list,index) => (
                        <div className="col-lg-3" key={index}>
                            <div className={index >= 3 ? "card mt-1 shadow" : "card shadow"}>
                                <div className="card-body">
                                    <Skeleton active 
                                        paragraph={{
                                            rows: 1,
                                        }}
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                :
                data.map((list,i) => (
                    <div className="col-lg-3" key={i}>
                        <div className={i >= 3 ? "card mt-1 shadow" : "card shadow"}>
                            <div className="card-body">
                                <div className="d-flex count-card-icon align-items-center justify-content-between">
                                    <div>
                                        <Popover content={list.name} title="Name">
                                            <p className="count-name">{list.name}</p>
                                        </Popover>
                                        <Popover content={!list.count ? null : humanize(Math.round(list.count))} title="Count">
                                            <p className="count-count">{!list.count ? 0 : humanize(Math.round(list.count))}</p>
                                            {/* <p>{formatter.format(Math.round(list.count))}</p> */}
                                            {
                                                list.percentage
                                                ?
                                                    <p className="mb-0 count-count-percent">{list.percentage}%</p>
                                                :  <p className="mb-0 count-count-percent">&nbsp;</p>
                                            }
                                            
                                        </Popover>
                                    </div>
                                    <PieChartOutlined className="count-icon" twoToneColor="#F7C514" />
                                    {/* <Icon component={<ProjectFilled />}  /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        
    </>
  )
}

export default CountCard
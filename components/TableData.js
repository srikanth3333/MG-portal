
import {Table} from "antd";
import {useSelector,useDispatch} from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import React from "react";
import {addFilters} from "../redux/auth/userSlice";
import Link from 'next/link';
import Zoom from 'react-img-zoom'
import { Modal, Button } from 'react-bootstrap';
import {updateData} from '../redux/auth/userSlice';
import CompoundedSpace from "antd/lib/space";
import axios from "axios";

var humanize = require('humanize-number');


function TableData({orgData,data,paginateApi,filters,paginate,year,arrayData,apiObject}) {

  let finalData = orgData == true ? data : data.data;
  let filtersData = useSelector((state) => state.users)
  let user = useSelector((state) => state.users);
  let dispatch = useDispatch()
  const [page,setPage] = React.useState(1);
  const [show, setShow] = React.useState(false);
  const [zoomImage, setZoomImage] = React.useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    dispatch(addFilters({data:apiObject}))
  },[dispatch])


  

  if(!data || !finalData) {
    return (
      <>
        <div className="text-center mt-4">
          <h6>Loading...</h6>
        </div>
      </>
    )
  }

  
  let pageCount = Math.ceil(parseInt(data.totalCount) / 20);
  let objectData = finalData.find((item,index) => index == 0)
  let mapData = objectData ? Object.keys(objectData) : [];

  let lp = !arrayData ? mapData && mapData.map((item,i) => {
      return {
          title: `${item}`,
          dataIndex: `${item}`,
          key: i,
          // width: 150,
          // textWrap: 'word-break',

          // ellipsis: true,
          // fixed: i < 1 ? 'left' : null,
          sorter: true,
          render: (val) => (
            <>
              {
                  moment(val, moment.ISO_8601, true).isValid() && val != null && typeof val !== 'number'
                  ?
                      <>
                        {year == true ?
                            <Moment format="YYYY">{val}</Moment>
                         :
                          <>
                            <Moment format="DD/MM/YYYY">{val}</Moment> <br />
                            <Moment format="hh:mm:ss A">{val}</Moment>
                          </>
                        }
                      </>
                  :
                      val
              }
            </>
          )
      }
  }) : arrayData.map((item,i) => {
      
      if(item.name == 'readings') {
        return {
          title: `${item.label}`,
          dataIndex: `${item.name}`,
          key: i,
          width: 150,
          textWrap: 'break-word',
          ellipsis: true,
          fixed: 'right',
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record,index) => {
            const getImg = finalData[index].photoUrl
            return (
              <>
               <div className="d-flex flex-wrap justify-content-between">
               {val != null ?
                  Object.entries(val).map(([key, value]) => {
                      return (
                          <>
                             <div>
                                  <img style={{cursor: 'pointer'}}
                                      onClick={() => {
                                          setZoomImage(value.bigImg)
                                          handleShow()
                                      }}
                                  src={value.smallImg} height="70px"></img>
                                  <p className="mt-2"><b>{value.actualValue ? value.actualValue : value.scanValue} {key}</b></p>
                                  <p><b>{value.analysisRemark}</b></p>
                              </div>
                          </>
                      )
                  })
              :
                  <img src={getImg}
                  style={{cursor: 'pointer'}}
                  onClick={() => {
                      setZoomImage(getImg)
                      handleShow()
                  }}

                  height="70px" />
              }
              </div>
              
                  
              </>
            )
          }
        }
      }

      if(item.name == 'timestampIds') {
        return {
          title: `${item.label}`,
          dataIndex: `${item.name}`,
          key: i,
          width: 150,
          textWrap: 'break-word',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record,index) => {
            
            return (
              <>
                  {
                      val !== undefined
                      ?
                          val.map((item, i) => {
                              if(item in data.mapData)
                              {
                                  return (
                                      <div key={i}>
                                          <img onClick={() => {
                                              setZoomImage(data.mapData[item].bigImg)
                                              handleShow()
                                          }} src={data.mapData[item].smallImg} style={{height:'70px',objectFit:'contain'}} className="img-responsive" />
                                          <p>{data.mapData[item].valueType + " - " + data.mapData[item].finalValue}</p>
                                          <p>{data.mapData[item].readingType}</p>
                                          <p>{data.mapData[item].analysisRemark}</p>
                                      </div>
                                  )
                              }
                              
                          })
                      : 
                      <img 
                          onClick={() => {
                              setZoomImage(finalData[index].photoUrl)
                              handleShow()
                          }}
                          src={finalData[index].photoUrl} heihgt="70px" width="70px" />
                  }
              </>
            )
          }
        }
      }


      if(item.agency == true) {
        return {
          title: `${!item.label ? item.name : item.label}`,
          dataIndex: `${item.name}`,
          key: i,
          width: 150,
          textWrap: 'break-word',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record) => {
            
            return(
              <>
                <Link href={!item.multiPath ? `${item.link}/${val}` : `${item.link}/${record.id.slice(0,item.index)}/${val}`}
                  onClick={() => dispatch(updateData({boardCode:user.boardCode,agency:val,role:user.role}))}
                >
                    {val} 
                </Link>
              </>
            )
          }
      }
    }

    if(item.type == 'name' && item.dataVal == 'div') {
      return {
        title: `${!item.label ? item.name : item.label}`,
        dataIndex: `${item.name}`,
        key: i,
        width: 150,
        textWrap: 'break-word',
        ellipsis: true,
        sorter: (a, b) => {
          return a[item.name] - b[item.name]
        },
        render: (val,record) => {
          let result =  user.divisionNames;
          const foundObject = result.find((obj) => obj.id === val);
          return(
            <>
              {
                foundObject?.area_name
              }
            </>
          )
        }
      }
    }

    if(item.type == 'name' && item.dataVal == 'subDiv') {
      return {
        title: `${!item.label ? item.name : item.label}`,
        dataIndex: `${item.name}`,
        key: i,
        width: 150,
        textWrap: 'break-word',
        ellipsis: true,
        sorter: (a, b) => {
          return a[item.name] - b[item.name]
        },
        render: (val,record) => {
          let result =  user.subDivisionNames;
          const foundObject = result.find((obj) => obj.id === val);
          return(
            <>
              {
                foundObject?.area_name
              }
            </>
          )
        }
      }
    }

    if(item.type == 'name' && item.dataVal == 'sec') {
      return {
        title: `${!item.label ? item.name : item.label}`,
        dataIndex: `${item.name}`,
        key: i,
        width: 150,
        textWrap: 'break-word',
        ellipsis: true,
        sorter: (a, b) => {
          return a[item.name] - b[item.name]
        },
        render: (val,record) => {
          let result =  user.sectionNames;
          const foundObject = result.find((obj) => obj.id === val);
          return(
            <>
              {
                foundObject?.area_name
              }
            </>
          )
        }
      }
    }


    if(item.type == "array") {
      return {
        title: `${!item.label ? item.name : item.label}`,
        dataIndex: `${item.name}`,
        key: i,
        width: 150,
        textWrap: 'break-word',
        ellipsis: true,
        sorter: (a, b) => {
          return a[item.name] - b[item.name]
        },
        render: (val,record) => {
          return(
            <>
              {val && val?.map((item,i) => <p key={i}>{i + 1}. {item}</p>)}
              {/* {val} */}
            </>
          )
        }
    }
  }

    

    if(item.changeText == true) {
      return {
        title: `${!item.label ? item.name : item.label}`,
        dataIndex: `${item.name}`,
        key: i,
        width: 150,
        textWrap: 'break-word',
        ellipsis: true,
        sorter: (a, b) => {
          return a[item.name] - b[item.name]
        },
        render: (val,record) => {
          let itemText;
          if (val == 'Incorrect Parameter' ) {
              itemText = "IP"
          } 
          if (val == 'Incorrect Reading' ) {
              itemText = "IR"
          } if (val == 'Invalid Image' ) {
              itemText = "II"
          } if (val == 'Meter Mismatch' ) {
              itemText = "MM"
          } if (val == 'Parameter is unclear' ) {
              itemText = "PU"
          } if (val == 'Spoof' ) {
              itemText = "SP"
          } if (val == 'Unclear Image' ) {
              itemText = "UI"
          }
          if (val == "OK") {
              itemText = "OK"
          }

          
          return(
            <>
              <Link href={!item.multiPath ? `${item.link}/${itemText}` : `${item.link}/${record?.analysisRemark?.slice(0,item.index)}/${itemText}`}>
                  {val} 
              </Link>
            </>
          )
        }
      }
    }

      return {
          title: `${!item.label ? item.name : item.label}`,
          dataIndex: `${item.name}`,
          key: i,
          width: 150,
          textWrap: 'break-word',
          ellipsis: true,
          sorter: (a, b) => {
            return a[item.name] - b[item.name]
          },
          render: (val,record) => {
            
            return(
              <>
                {item.year == true ?
                  <Moment format="YYYY">{val}</Moment>
                  : item.amount == true ? humanize(Math.round(val)) :
                    item.date == true ?
                  <>
                    <Moment format="DD/MM/YYYY">{val}</Moment> <br />
                    <Moment format="hh:mm:ss A">{val}</Moment>
                  </> :
                   item.image == true ?
                    <img src={val} 
                        onClick={() => {
                            setZoomImage(val)
                            handleShow()
                        }}
                        height="70px" style={{objectFit:'contain'}} />
                  : item.link && !item.query ?
                    <Link href={!item.multiPath ? `${item.link}/${val}` : `${item.link}/${record?.id?.slice(0,item.index)}/${val}`}>
                      {val}
                    </Link>
                  : item.query == true  ? 
                      <Link href={!item.multiPath ? `${item.link}/${val}` : `${item.link}${item.queryPath}${record[item.multiPath]}`}>
                          {val}
                      </Link>
                  : val
                }
              </>
            )
          }
      }
  })

  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-12">
          <Table
              style={{ whiteSpace: 'break-spaces'}}
              loading={data.loading}
              columns={lp}
              dataSource={finalData}
              bordered
              scroll={{
                x: 300,
                y: 400,
              }}
              pagination={paginate == true ? {
                pageSize:20,
                total: finalData.length == 20 ? page * 20 + 1 : page * 20,
                current: page,
                onChange: (page) => {
                  setPage(page)
                  dispatch(paginateApi({...filtersData.filterObject,page:page}))
                },
              } : {showSizeChanger:true,pageSize:20}}
            />
        </div>
      </div>
      <Modal
          show={show} onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="mt-4"
          >
          <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Image View
              </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-1">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="text-center">
                    <Zoom
                      img={zoomImage}
                      zoomScale={2}
                      width={400}
                      height={400}
                      className="mx-auto d-block"
                    />
                </div>  
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
      </Modal>
    </>
    
  )
}

export default TableData
import React from 'react';
import MainCard from "../components/MainCard";
import PieGraph from '../components/graphs/PieGraph';
import BarChart from '../components/graphs/BarChart';

function index() {
  return (
    <MainCard>
          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow">
                <div className="card-body">
                  <PieGraph 
                    items={[
                      {title:"Payment Category Mode",data:[{
                        region: 'Asia',
                        val: 4119626293,
                      }, {
                        region: 'Africa',
                        val: 1012956064,
                      }, {
                        region: 'Northern America',
                        val: 344124520,
                      }, {
                        region: 'Latin America and the Caribbean',
                        val: 590946440,
                      }, {
                        region: 'Europe',
                        val: 727082222,
                      }, {
                        region: 'Oceania',
                        val: 35104756,
                      }],valueField:"val",argumentField:"region"},
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow">
                <div className="card-body px-4">
                  <BarChart 
                        items={[
                          {title:"Customer Facing",
                          data:[{
                            region: 'Married',
                            val: 1012956064,
                          }, {
                            region: 'Single',
                            val: 344124520,
                          }, {
                            region: 'Null',
                            val: 590946440,
                          }],valueField:"val",argumentField:"region"},
                        ]}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-3">
              <div className="card shadow">
                <div className="card-body">
                  <PieGraph 
                    items={[
                      {title:"Customer Facing",data:[{
                        region: 'Asia',
                        val: 4119626293,
                      }, {
                        region: 'Africa',
                        val: 1012956064,
                      }, {
                        region: 'Northern America',
                        val: 344124520,
                      }, {
                        region: 'Latin America and the Caribbean',
                        val: 590946440,
                      }, {
                        region: 'Europe',
                        val: 727082222,
                      }, {
                        region: 'Oceania',
                        val: 35104756,
                      }],valueField:"val",argumentField:"region"},
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-3">
              <div className="card shadow">
                <div className="card-body">
                  <PieGraph 
                    items={[
                      {title:"Home Region",data:[{
                        region: 'Asia',
                        val: 4119626293,
                      }, {
                        region: 'Africa',
                        val: 1012956064,
                      }, {
                        region: 'Northern America',
                        val: 344124520,
                      }, {
                        region: 'Latin America and the Caribbean',
                        val: 590946440,
                      }, {
                        region: 'Europe',
                        val: 727082222,
                      }, {
                        region: 'Oceania',
                        val: 35104756,
                      }],valueField:"val",argumentField:"region"},
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
    </MainCard>
  )
}

export default index
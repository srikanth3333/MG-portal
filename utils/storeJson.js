import userReducer from '../redux/auth/userSlice';
import divisionReducer from '../redux/divsionWise/divisionSlice';
import subDivisionReducer from '../redux/divsionWise/subDivSlice';
import sectionReducer from '../redux/divsionWise/sectionSlice';
import areaReducer from '../redux/divsionWise/areaSlice';
import summaryReducer from '../redux/divsionWise/summarySlice';
import mdSummaryReducer from '../redux/mdCases/summarySlice';
import consumerReducer from '../redux/divsionWise/consumerSlice';
import reportsMRReducer from '../redux/meterReaderReport/reportsMRSlice';
import reportMRDetailReducer from '../redux/meterReaderReport/reportMRDetailSlice';
import exceptionReducer from '../redux/exceptionReports/exceptionSlice';
import exceptionDetailReducer from '../redux/exceptionReports/exceptionDetailSlice';
import reportsAgySliceReducer from '../redux/reports/reportSlice';
import graphReducer from '../redux/graphs/graphSlice';
import graphDetailReducer from '../redux/graphs/graphDetailSlice';
import sectionSummaryReducer from '../redux/sectionRemarks/sectionSlice';
import ltisSummaryReducer from '../redux/ltisSummary/ltisSummarySlice';
import readingsSummaryReducer from '../redux/readingsSummary/readingsSummarySlice';
import readingsReducer from '../redux/readingsData/readingsSlice';
import chartReportReducer from '../redux/chartReports/chartReportsSlice';
import chartReportDetailReducer from '../redux/chartReports/chartReportDetail';
import sectionDetailReducer from '../redux/sectionRemarks/sectionDetailSlice';
import chartReportSummaryReducer from '../redux/chartReports/chartReportSummarySlice';
import invalidReadingsReducer from '../redux/invalidReadings/invalidSlice';
import mrReportReducer from '../redux/mrReport/mrReportSlice';
import mapsReducer from '../redux/maps/mapSlice';
import supervisorListReducer from '../redux/supervisorList/supervisorSlice';
import dataDownloadReducer from '../redux/dataDownload/dataDownloadSlice';
import consumerCountsReducer from "../redux/consumerCounts/consumerSlice";
import skippedDataReducer from "../redux/skippedData/skippedDataSlice";
import mrReducer from "../redux/mr/mrSlice";
import mrIndiReducer from "../redux/individualMr/individualMrSlice"
import usersListReducer from "../redux/usersList/userSlice";
import agencyReducer from "../redux/agencyCounts/agencySlice";
import eSubdivReducer from "../redux/exceptionRemarksSubdiv/eSubdivSlice";
import eSectionReducer from "../redux/exceptionRemarksSection/eSectionSlice";
import eAreaReducer from "../redux/exceptionRemarksArea/eAreaSlice";
import mridReducer from "../redux/divsionWise/mridSlice";
import mrAnalysisReadingsReducer from "../redux/mrAnalysisReadings/mrAnalysisReadingsSlice";
import mrMDCasesReducer from "../redux/mrMDCases/mrMDCasesSlice";

export let data = {
    users: userReducer,
    maps: mapsReducer,
    mrMDCases:mrMDCasesReducer,
    mrAnalysisReadingsData:mrAnalysisReadingsReducer,
    mrid:mridReducer,
    expSubdiv: eSubdivReducer,
    expSection: eSectionReducer,
    expArea: eAreaReducer,
    mrReports: mrReportReducer,
    dataDownload: dataDownloadReducer,
    supervisorList: supervisorListReducer,
    subDivision:subDivisionReducer,
    invalidReadings:invalidReadingsReducer,
    division: divisionReducer,
    section: sectionReducer,
    area: areaReducer,
    summary: summaryReducer,
    mdSummary:mdSummaryReducer,
    consumer: consumerReducer,
    reports: reportsMRReducer,
    reportsDetail: reportMRDetailReducer,
    exceptions: exceptionReducer,
    exceptionDetail: exceptionDetailReducer,
    reportAgy: reportsAgySliceReducer,
    graph: graphReducer,
    graphDetail: graphDetailReducer,
    readings:readingsReducer,
    readingsSummary: readingsSummaryReducer,
    chartReport:chartReportReducer,
    chartReportDetail:chartReportDetailReducer,
    chartReportSummary:chartReportSummaryReducer,
    ltisSummary:ltisSummaryReducer,
    sectionSummary:sectionSummaryReducer,
    sectionDetail:sectionDetailReducer,
    consumerCounts:consumerCountsReducer,
    skippedData:skippedDataReducer,
    mr:mrReducer,
    mrIndi: mrIndiReducer,
    usersList:usersListReducer,
    agencyCounts:agencyReducer,
}
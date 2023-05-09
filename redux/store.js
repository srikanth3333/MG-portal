import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/userSlice';
import divisionReducer from './divsionWise/divisionSlice';
import subDivisionReducer from './divsionWise/subDivSlice';
import sectionReducer from './divsionWise/sectionSlice';
import areaReducer from './divsionWise/areaSlice';
import summaryReducer from './divsionWise/summarySlice';
import mdSummaryReducer from './mdCases/summarySlice';
import consumerReducer from './divsionWise/consumerSlice';
import reportsMRReducer from './meterReaderReport/reportsMRSlice';
import reportMRDetailReducer from './meterReaderReport/reportMRDetailSlice';
import exceptionReducer from './exceptionReports/exceptionSlice';
import exceptionDetailReducer from './exceptionReports/exceptionDetailSlice';
import reportsAgySliceReducer from './reports/reportSlice';
import graphReducer from './graphs/graphSlice';
import graphDetailReducer from './graphs/graphDetailSlice';
import sectionSummaryReducer from './sectionRemarks/sectionSlice';
import ltisSummaryReducer from './ltisSummary/ltisSummarySlice';
import readingsSummaryReducer from './readingsSummary/readingsSummarySlice';
import readingsReducer from './readingsData/readingsSlice';
import chartReportReducer from './chartReports/chartReportsSlice';
import chartReportDetailReducer from './chartReports/chartReportDetail';
import sectionDetailReducer from './sectionRemarks/sectionDetailSlice';
import chartReportSummaryReducer from './chartReports/chartReportSummarySlice';
import invalidReadingsReducer from './invalidReadings/invalidSlice';
import mrReportReducer from './mrReport/mrReportSlice';
import mapsReducer from './maps/mapSlice';
import supervisorListReducer from './supervisorList/supervisorSlice';
import dataDownloadReducer from './dataDownload/dataDownloadSlice';
import consumerCountsReducer from "./consumerCounts/consumerSlice";
import skippedDataReducer from "./skippedData/skippedDataSlice";
import mrReducer from "./mr/mrSlice";
import mrIndiReducer from "./individualMr/individualMrSlice"
import usersListReducer from "./usersList/userSlice";
import agencyReducer from "./agencyCounts/agencySlice";
import eSubdivReducer from "./exceptionRemarksSubdiv/eSubdivSlice";
import eSectionReducer from "./exceptionRemarksSection/eSectionSlice";
import eAreaReducer from "./exceptionRemarksArea/eAreaSlice";
import mridReducer from "./divsionWise/mridSlice";
import mrAnalysisReadingsReducer from "./mrAnalysisReadings/mrAnalysisReadingsSlice";
import mrMDCasesReducer from "./mrMDCases/mrMDCasesSlice";
import meterReadingReducer from "./meterReadingStatus/index";
import mapReducer from "./map/index";
import countsReducer from "./home/index";

export default configureStore({
	reducer: {
		users: userReducer,
		counts:countsReducer,
		map:mapReducer,
		meterReading:meterReadingReducer,
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
	},
});
import { NextResponse } from "next/server";




export function middleware(req, res, next) {

    // let listItems = [
    //     '/agency',
    //     '/mrMdCases',
    //     '/drive',
    //     '/subDivision',
    //     '/consumerSearch',
    //     '/skippedData',
    //     '/meterReaderReports',
    //     '/exceptionReports',
    //     '/reports',
    //     '/readingsData',
    //     '/readingsSummary',
    //     '/testData',
    //     '/ltisSummary',
    //     '/sectionRemarks',
    //     '/invalidReadings',
    //     '/supervisorList'
    // ]

    
    let verify = req.cookies.get('loggedIn')

    // if(!verify) {
    //     return NextResponse.redirect("/")
    // }
}
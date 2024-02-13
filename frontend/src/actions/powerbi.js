// import powerbi from 'powerbi-client'

// const MINUTES_BEFORE_EXPIRATION = 10;

// // Set the refresh interval time to 30 seconds
// const INTERVAL_TIME = 30000;

// // Get the token expiration from the access token
// var tokenExpiration;

// // Set an interval to check the access token expiration, and update if needed
// setInterval(() => checkTokenAndUpdate(reportId, groupId), INTERVAL_TIME);

// function checkTokenAndUpdate(reportId, groupId) {
//     // Get the current time
//     const currentTime = Date.now();
//     const expiration = Date.parse(tokenExpiration);

//     // Time until token expiration in milliseconds
//     const timeUntilExpiration = expiration - currentTime;
//     const timeToUpdate = MINUTES_BEFORE_EXPIRATION * 60 * 1000;

//     // Update the token if it is about to expired
//     if (timeUntilExpiration <= timeToUpdate)
//     {
//         console.log("Updating report access token");
//         updateToken(reportId, groupId);
//     }
// }

// async function updateToken(reportId, groupId) {
//     // Generate a new embed token or refresh the user Azure AD access token
//     let newAccessToken = await getNewUserAccessToken(reportId, groupId);

//     // Update the new token expiration time
//     tokenExpiration = newAccessToken.expiration;

//     // Get a reference to the embedded report HTML element
//     let embedContainer = $('#embedContainer')[0];

//     // Get a reference to the embedded report.
//     let report = powerbi.get(embedContainer);

//     // Set the new access token
//     await report.setAccessToken(newAccessToken.token);
// }

// // // Add a listener to make sure token is updated after tab was inactive
// // document.addEventListener("visibilitychange", function() {​​​​
// //     // Check the access token when the tab is visible
// //     if (!document.hidden) {​​​​
// //         checkTokenAndUpdate(reportId, groupId)
// //     }​​​​
// // }​​​​);
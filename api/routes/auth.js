import Express from 'express';
import {
    google
} from 'googleapis';
import Dotenv from 'dotenv';


Dotenv.config();

const Router = Express.Router();

// login
Router.get('/auth', async (req, res) => {
    try {
        // init Oauth2
        const {
            OAuth2
        } = google.auth;

        //set credentials 
        const oAuth2Client = new OAuth2(process.env.CALENDAR_CLIENT_ID, process.env.CALENDAR_SECRET);

        console.log(oAuth2Client);
        //init refresh token
        oAuth2Client.setCredentials({
            refresh_token: process.env.CALENDAR_REFRESH
        });

        // Create a new calender instance.
        const calendar = google.calendar({
            version: 'v3',
            auth: oAuth2Client
        })

        // Create a new event start date instance for temp uses in our calendar.
        const eventStartTime = new Date()
        eventStartTime.setDate(eventStartTime.getDay() + 2)

        // Create a new event end date instance for temp uses in our calendar.
        const eventEndTime = new Date()
        eventEndTime.setDate(eventEndTime.getDay() + 4)
        eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

        // Create a dummy event for temp uses in our calendar
        const event = {
            summary: `Meeting with David`,
            location: `3595 California St, San Francisco, CA 94118`,
            description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
            colorId: 1,
            start: {
                dateTime: eventStartTime,
                timeZone: 'America/Denver',
            },
            end: {
                dateTime: eventEndTime,
                timeZone: 'America/Denver',
            },
        }

        calendar.events.insert(
            { calendarId: 'primary', resource: event },
            err => {
              // Check for errors and log them if they exist.
              if (err) return console.error('Error Creating Calender Event:', err)
              // Else log that the event was created.
              return console.log('Calendar event successfully created.')
            }
          )
          
        res.status(200).json({
            message: 'token created',
            response: 'success'
        });
    } catch (e) {
        res.status(500).json({
            message: 'google auth failed',
            error: e
        });
    };

});




export default Router;